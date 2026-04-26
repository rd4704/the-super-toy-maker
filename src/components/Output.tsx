import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMachine } from '../state/machine';
import { db, type SavedToy } from '../state/db';
import { sounds } from '../sound/sounds';
import { renderToyToDataUrl } from '../utils/render';

type Stage = 'idle' | 'assembling' | 'reveal';

export function Output() {
  const parts = useMachine((s) => s.parts);
  const toyName = useMachine((s) => s.toyName);
  const setToyName = useMachine((s) => s.setToyName);
  const setAssembling = useMachine((s) => s.setAssembling);

  const [stage, setStage] = useState<Stage>('idle');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);

  const savedToys = useLiveQuery(
    () => db.toys.orderBy('createdAt').reverse().limit(20).toArray(),
    [],
  );

  const canMake = parts.length > 0 && toyName.trim().length > 0 && stage === 'idle';

  const make = async () => {
    if (!canMake) return;
    setStage('assembling');
    setAssembling(true);
    sounds.giggle();
    sounds.whirr();

    // Wait for the assembly animation
    await sleep(1700);

    sounds.tada();
    setConfetti(true);
    setTimeout(() => setConfetti(false), 1600);

    const dataUrl = await renderToyToDataUrl(parts, toyName);
    setThumbnail(dataUrl);
    setStage('reveal');
    setAssembling(false);
  };

  const save = async () => {
    if (!thumbnail) return;
    sounds.sparkle();
    sounds.wee();
    await db.toys.add({
      name: toyName,
      parts,
      thumbnail,
      createdAt: Date.now(),
    });
  };

  const reset = () => {
    sounds.boing();
    setStage('idle');
    setThumbnail(null);
  };

  return (
    <div className="h-full flex flex-col bg-white/70 backdrop-blur-md rounded-3xl border-4 border-candy-green shadow-toy p-3 overflow-hidden">
      <h2 className="font-display text-2xl text-candy-green text-center mb-2">
        🌟 Your Toy
      </h2>

      <div className="rounded-2xl bg-gradient-to-br from-candy-cream to-white border-4 border-candy-green/40 aspect-square relative overflow-hidden mb-3">
        <AnimatePresence mode="wait">
          {stage === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-candy-green/60 p-4 text-center"
            >
              <div className="text-6xl mb-2 animate-bob">🎀</div>
              <p className="font-display text-lg">Build a toy and press Make!</p>
            </motion.div>
          )}

          {stage === 'assembling' && (
            <motion.div
              key="assembling"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <motion.div
                className="text-7xl"
                animate={{ rotate: [0, 20, -20, 15, -10, 0], scale: [1, 1.1, 0.95, 1.05, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              >
                ⚙️
              </motion.div>
              <p className="font-display text-candy-pink mt-3">Building {toyName || 'your toy'}…</p>
            </motion.div>
          )}

          {stage === 'reveal' && thumbnail && (
            <motion.div
              key="reveal"
              initial={{ scale: 0.2, rotate: -25, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 14 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-3"
            >
              <img
                src={thumbnail}
                alt={toyName}
                className="max-w-full max-h-[78%] object-contain animate-bob drop-shadow-xl"
              />
              <p className="font-display text-2xl text-candy-pink mt-2 text-center">
                {toyName}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {confetti && <Confetti />}
      </div>

      {/* Name + actions */}
      <div className="flex flex-col gap-2">
        <input
          value={toyName}
          onChange={(e) => setToyName(e.target.value.slice(0, 24))}
          placeholder="Name your toy ✨"
          className="w-full px-4 py-2 rounded-full border-4 border-candy-pink/40 bg-white font-display text-candy-pink placeholder:text-candy-pink/40 focus:outline-none focus:border-candy-pink"
        />

        {stage !== 'reveal' ? (
          <button
            onClick={make}
            disabled={!canMake}
            className={`w-full py-3 rounded-full font-display text-xl shadow-toy border-4 transition-all ${
              canMake
                ? 'bg-candy-pink text-white border-candy-pink hover:scale-105 active:scale-95'
                : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
            }`}
          >
            {stage === 'assembling' ? '✨ Making… ✨' : '🎉 Make my toy!'}
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={save}
              className="flex-1 py-3 rounded-full font-display text-lg bg-candy-green text-white border-4 border-candy-green shadow-toy hover:scale-105 active:scale-95"
            >
              💾 Save
            </button>
            <button
              onClick={reset}
              className="flex-1 py-3 rounded-full font-display text-lg bg-white text-candy-pink border-4 border-candy-pink shadow-toy hover:scale-105 active:scale-95"
            >
              🔁 Again
            </button>
          </div>
        )}
      </div>

      {/* Library */}
      <div className="mt-3 flex-1 min-h-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display text-candy-green">📚 My Toys</h3>
          <span className="text-xs text-candy-green/60 font-display">
            {savedToys?.length ?? 0} saved
          </span>
        </div>
        <div className="shelf-scroll overflow-y-auto h-full pr-1">
          {savedToys && savedToys.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {savedToys.map((t) => (
                <LibraryCard key={t.id} toy={t} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-candy-green/60 font-display text-center pt-3">
              Your saved toys will live here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function LibraryCard({ toy }: { toy: SavedToy }) {
  return (
    <div className="relative group bg-white rounded-xl border-2 border-candy-green/30 p-1 shadow-pop">
      <img src={toy.thumbnail} alt={toy.name} className="w-full aspect-square object-contain" />
      <p className="text-[10px] font-display text-center text-candy-green/80 truncate">
        {toy.name}
      </p>
      <button
        onClick={() => toy.id != null && db.toys.delete(toy.id)}
        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-candy-pink text-white text-[10px] opacity-0 group-hover:opacity-100 transition"
        title="Delete"
      >
        ✕
      </button>
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 30 });
  const colors = ['#ff5fa2', '#ffd84d', '#4dc6ff', '#7ee36b', '#b06bff'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: `${Math.random() * 100}%`, rotate: 0, opacity: 1 }}
          animate={{ y: '110%', rotate: 720 }}
          transition={{ duration: 1.4 + Math.random(), ease: 'easeIn' }}
          className="absolute w-2 h-3 rounded-sm"
          style={{ background: colors[i % colors.length] }}
        />
      ))}
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
