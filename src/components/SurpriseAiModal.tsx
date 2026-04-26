import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../sound/sounds';
import { db } from '../state/db';
import { buildAiImageUrl } from '../utils/ai';
import { checkToyName } from '../utils/safety';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Stage = 'input' | 'loading' | 'reveal' | 'error';

export function SurpriseAiModal({ open, onClose }: Props) {
  const [name, setName] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedName, setSavedName] = useState('');
  const [attempt, setAttempt] = useState(0);
  const MAX_ATTEMPTS = 3;

  useEffect(() => {
    if (!open) {
      setName('');
      setStage('input');
      setImage(null);
      setError(null);
      setSavedName('');
      setAttempt(0);
    }
  }, [open]);

  const startGeneration = (toyName: string, attemptNum: number) => {
    const seed = Math.floor(Math.random() * 1_000_000);
    const url = buildAiImageUrl({ toyName, seed });
    setImage(url);
    setSavedName(toyName);
    setAttempt(attemptNum);
    setStage('loading');
  };

  const generate = () => {
    const safety = checkToyName(name);
    if (!safety.ok) {
      setError(safety.reason ?? 'Please pick a different name.');
      sounds.delete();
      return;
    }
    setError(null);
    sounds.whirr();
    startGeneration(safety.cleaned, 1);
  };

  const onImageLoaded = () => {
    if (stage !== 'loading') return;
    setStage('reveal');
    sounds.tada();
  };

  const onImageFailed = () => {
    if (stage !== 'loading') return;
    if (attempt < MAX_ATTEMPTS) {
      // Retry with a new seed — Pollinations 500s on certain prompt+seed combos.
      startGeneration(savedName, attempt + 1);
      return;
    }
    setError(
      "Couldn't reach the toy magic after a few tries. Check your internet or try a different name!",
    );
    setStage('error');
    sounds.delete();
  };

  const save = async () => {
    if (!image) return;
    sounds.sparkle();
    sounds.wee();
    await db.toys.add({
      name: savedName,
      parts: [],
      thumbnail: image,
      createdAt: Date.now(),
    });
    onClose();
  };

  const tryAgain = () => {
    setStage('input');
    setError(null);
    setImage(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md bg-white rounded-3xl border-4 border-candy-yellow shadow-toy p-5 relative"
            initial={{ scale: 0.85, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.85, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-candy-pink text-white text-lg font-bold shadow-pop hover:scale-110 active:scale-95 transition"
            >
              ✕
            </button>

            <h2 className="font-display text-2xl text-candy-pink text-center mb-1">
              🎲 Surprise Toy Maker
            </h2>
            <p className="text-center text-sm text-amber-900/70 font-display mb-4">
              Type a toy name and AI will draw it for you!
            </p>

            {stage === 'input' && (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && generate()}
                  placeholder="e.g. Sparkly Dragon Bunny"
                  maxLength={40}
                  autoFocus
                  className="w-full rounded-2xl border-4 border-candy-pink/40 px-4 py-3 font-display text-lg focus:outline-none focus:border-candy-pink"
                />
                {error && (
                  <p className="text-sm text-red-600 font-display text-center">{error}</p>
                )}
                <button
                  onClick={generate}
                  disabled={name.trim().length < 2}
                  className="w-full py-3 rounded-2xl bg-candy-yellow text-amber-900 border-4 border-amber-700/40 font-display text-lg shadow-pop hover:scale-[1.02] active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ✨ Make my toy!
                </button>
                <p className="text-[11px] text-amber-900/60 text-center">
                  Uses image.pollinations.ai. Names are filtered for kid-safety.
                </p>
              </div>
            )}

            {stage === 'loading' && (
              <div className="flex flex-col items-center justify-center py-8 gap-3">
                <div className="text-6xl animate-spinSlow">🎨</div>
                <p className="font-display text-candy-pink text-lg">
                  Cooking up your toy...
                </p>
                <p className="text-xs text-amber-900/60 text-center px-4">
                  This can take up to a minute the first time. Hang tight! ✨
                </p>
                {image && (
                  <img
                    key={image}
                    src={image}
                    alt=""
                    onLoad={onImageLoaded}
                    onError={onImageFailed}
                    style={{ display: 'none' }}
                  />
                )}
              </div>
            )}

            {stage === 'reveal' && image && (
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl overflow-hidden border-4 border-candy-green/40 aspect-square bg-candy-cream">
                  <img
                    src={image}
                    alt={savedName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center font-display text-xl text-candy-green">
                  {savedName}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={tryAgain}
                    className="py-3 rounded-2xl bg-white border-4 border-candy-pink/40 text-candy-pink font-display shadow-pop hover:scale-[1.02] active:scale-95 transition"
                  >
                    🔄 Try again
                  </button>
                  <button
                    onClick={save}
                    className="py-3 rounded-2xl bg-candy-green text-white border-4 border-green-800/40 font-display shadow-pop hover:scale-[1.02] active:scale-95 transition"
                  >
                    💾 Save it!
                  </button>
                </div>
              </div>
            )}

            {stage === 'error' && (
              <div className="flex flex-col gap-3 items-center py-4">
                <div className="text-5xl">😢</div>
                <p className="text-center text-red-600 font-display">{error}</p>
                <button
                  onClick={tryAgain}
                  className="px-5 py-2 rounded-2xl bg-candy-yellow text-amber-900 border-4 border-amber-700/40 font-display shadow-pop hover:scale-105 active:scale-95 transition"
                >
                  Try again
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
