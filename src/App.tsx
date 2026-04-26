import { useEffect, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import { AssetsPanel } from './components/AssetsPanel';
import { Machine } from './components/Machine';
import { Output } from './components/Output';
import { useMachine } from './state/machine';
import { sounds } from './sound/sounds';
import { getAsset } from './assets/catalog';
import { AssetSvg } from './assets/AssetSvg';
import { SurpriseAiModal } from './components/SurpriseAiModal';

export default function App() {
  const addPart = useMachine((s) => s.addPart);
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);
  const [muted, setMutedState] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  // Browsers block autoplay until first user gesture. Start music on first interaction.
  useEffect(() => {
    const start = () => {
      if (!musicStarted) {
        sounds.startMusic();
        setMusicStarted(true);
      }
    };
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, [musicStarted]);

  const onDragStart = (e: DragStartEvent) => {
    const data = e.active.data.current as { kind?: string; assetId?: string } | undefined;
    if (data?.kind === 'asset' && data.assetId) {
      setActiveAssetId(data.assetId);
      sounds.pickup();
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActiveAssetId(null);
    const data = e.active.data.current as { kind?: string; assetId?: string } | undefined;
    if (data?.kind !== 'asset' || !data.assetId) return;
    if (e.over?.id !== 'machine-drop') {
      sounds.delete();
      return;
    }

    const overRect = e.over.rect;
    const activeRect = e.active.rect.current.translated;
    if (!overRect || !activeRect) {
      addPart(data.assetId, 0.5, 0.5);
    } else {
      const cx = activeRect.left + activeRect.width / 2;
      const cy = activeRect.top + activeRect.height / 2;
      const x = (cx - overRect.left) / overRect.width;
      const y = (cy - overRect.top) / overRect.height;
      addPart(data.assetId, clamp(x), clamp(y));
    }
    sounds.boing();
  };

  const onDragCancel = () => {
    setActiveAssetId(null);
  };

  const toggleMute = () => {
    const next = !muted;
    setMutedState(next);
    sounds.setMuted(next);
    if (!next && !musicStarted) {
      sounds.startMusic();
      setMusicStarted(true);
    }
  };

  const overlayAsset = activeAssetId ? getAsset(activeAssetId) : null;

  return (
    <DndContext
      sensors={sensors}
      modifiers={[snapCenterToCursor]}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div className="min-h-[100dvh] w-full flex flex-col p-2 md:p-3 gap-2 md:gap-3 md:h-[100dvh]">
        {/* Header */}
        <header className="flex items-center justify-between gap-2 px-1 md:px-2">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="text-3xl md:text-4xl animate-bob shrink-0">🧸</div>
            <div className="min-w-0">
              <h1 className="font-display text-xl md:text-3xl text-candy-pink leading-none truncate">
                The Super Toy Maker
              </h1>
              <p className="hidden md:block text-xs text-candy-pink/70 font-display">
                Pick parts, build, name & make magic ✨
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <div className="hidden lg:flex gap-1 text-2xl mr-2">
              <span className="animate-sparkle">✨</span>
              <span className="animate-sparkle [animation-delay:0.4s]">⭐</span>
              <span className="animate-sparkle [animation-delay:0.8s]">💫</span>
            </div>
            <button
              onClick={() => {
                sounds.giggle();
                setAiOpen(true);
              }}
              title="Type a name and AI will draw your toy!"
              className="hidden md:inline-flex px-4 py-2 rounded-full bg-candy-yellow text-amber-900 border-4 border-amber-700/40 font-display shadow-pop hover:scale-105 active:scale-95 transition animate-wiggle"
            >
              🎲 Surprise Me!
            </button>
            <button
              onClick={toggleMute}
              title={muted ? 'Unmute' : 'Mute'}
              className="px-3 py-2 rounded-full bg-white border-2 border-candy-pink/40 text-candy-pink font-display shadow-pop hover:scale-105 active:scale-95 transition"
            >
              {muted ? '🔇' : '🔊'}
            </button>
          </div>
        </header>

        {/* Mobile-only big Surprise Me CTA */}
        <button
          onClick={() => {
            sounds.giggle();
            setAiOpen(true);
          }}
          className="md:hidden w-full py-3 rounded-2xl bg-candy-yellow text-amber-900 border-4 border-amber-700/40 font-display text-lg shadow-pop active:scale-95 transition animate-wiggle"
        >
          🎲 Surprise Me with AI!
        </button>

        {/* Layout: stacked on mobile (natural page scroll), 3-col grid on md+ */}
        <main className="flex flex-col gap-2 md:gap-3 md:flex-1 md:grid md:grid-cols-[280px_1fr_320px] md:min-h-0 md:overflow-hidden">
          {/* Machine first on mobile (most important), middle column on desktop */}
          <section className="order-1 md:order-2 md:min-h-0">
            <Machine />
          </section>
          {/* Parts shelf */}
          <section className="order-2 md:order-1 md:min-h-0 max-h-[60dvh] md:max-h-none">
            <AssetsPanel />
          </section>
          {/* Output / library */}
          <section className="order-3 md:order-3 md:min-h-0">
            <Output />
          </section>
        </main>
      </div>

      {/* Smooth drag preview that follows the cursor */}
      <DragOverlay dropAnimation={null}>
        {overlayAsset ? (
          <div
            style={{
              filter: 'drop-shadow(0 8px 14px rgba(255, 95, 162, 0.45))',
              pointerEvents: 'none',
            }}
            className="animate-wiggle"
          >
            <AssetSvg
              asset={overlayAsset}
              size={Math.min(110, overlayAsset.width)}
            />
          </div>
        ) : null}
      </DragOverlay>

      <SurpriseAiModal open={aiOpen} onClose={() => setAiOpen(false)} />
    </DndContext>
  );
}

const clamp = (n: number) => Math.max(0.05, Math.min(0.95, n));
