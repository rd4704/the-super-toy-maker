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

export default function App() {
  const addPart = useMachine((s) => s.addPart);
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null);
  const [muted, setMutedState] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

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
      <div className="h-screen w-screen flex flex-col p-3 gap-3">
        {/* Header */}
        <header className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="text-4xl animate-bob">🧸</div>
            <div>
              <h1 className="font-display text-3xl text-candy-pink leading-none">
                The Super Toy Maker
              </h1>
              <p className="text-xs text-candy-pink/70 font-display">
                Pick parts, build, name & make magic ✨
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex gap-1 text-2xl mr-2">
              <span className="animate-sparkle">✨</span>
              <span className="animate-sparkle [animation-delay:0.4s]">⭐</span>
              <span className="animate-sparkle [animation-delay:0.8s]">💫</span>
            </div>
            <button
              onClick={toggleMute}
              title={muted ? 'Unmute' : 'Mute'}
              className="px-3 py-2 rounded-full bg-white border-2 border-candy-pink/40 text-candy-pink font-display shadow-pop hover:scale-105 active:scale-95 transition"
            >
              {muted ? '🔇' : '🔊'}
            </button>
          </div>
        </header>

        {/* 3-panel layout */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-[280px_1fr_320px] gap-3 min-h-0 overflow-auto md:overflow-hidden">
          <section className="min-h-0 hidden md:block">
            <AssetsPanel />
          </section>
          <section className="min-h-[420px] md:min-h-0">
            <Machine />
          </section>
          <section className="min-h-0 hidden md:block">
            <Output />
          </section>

          {/* Mobile fallbacks */}
          <section className="md:hidden h-72">
            <AssetsPanel />
          </section>
          <section className="md:hidden h-[28rem]">
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
    </DndContext>
  );
}

const clamp = (n: number) => Math.max(0.05, Math.min(0.95, n));
