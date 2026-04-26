import { useRef, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useMachine, type PlacedPart } from '../state/machine';
import { getAsset } from '../assets/catalog';
import { AssetSvg } from '../assets/AssetSvg';
import { sounds } from '../sound/sounds';

function PartOnCanvas({
  part,
  machineEl,
}: {
  part: PlacedPart;
  machineEl: React.RefObject<HTMLDivElement | null>;
}) {
  const asset = getAsset(part.assetId);
  const { selectedId, selectPart, movePart, removePart, updatePart, isAssembling } = useMachine();
  const [dragging, setDragging] = useState(false);
  const startRef = useRef({ px: 0, py: 0, x: 0, y: 0 });

  if (!asset) return null;
  const selected = selectedId === part.instanceId;

  const onPointerDown = (e: React.PointerEvent) => {
    if (isAssembling) return;
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    selectPart(part.instanceId);
    sounds.pickup();
    startRef.current = { px: e.clientX, py: e.clientY, x: part.x, y: part.y };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const rect = machineEl.current?.getBoundingClientRect();
    const w = rect?.width ?? 520;
    const h = rect?.height ?? 520;
    const dx = (e.clientX - startRef.current.px) / w;
    const dy = (e.clientY - startRef.current.py) / h;
    movePart(part.instanceId, clamp01(startRef.current.x + dx), clamp01(startRef.current.y + dy));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setDragging(false);
    sounds.bloop();
  };

  // Outer div: position + (-50%,-50%) centering. Stays untouched by Framer.
  // Inner motion.div: only animates scale/rotate, so the centering translate
  // is preserved on the wrapper.
  return (
    <div
      style={{
        position: 'absolute',
        left: `${part.x * 100}%`,
        top: `${part.y * 100}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: part.z,
        cursor: dragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: part.scale, rotate: part.rotation }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        style={{ transformOrigin: 'center center' }}
      >
        <div className={selected ? 'ring-4 ring-candy-pink/70 rounded-xl p-1' : 'p-1'}>
          <AssetSvg asset={asset} />
        </div>
      </motion.div>

      {selected && !isAssembling && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 bg-white rounded-full shadow-pop border-2 border-candy-pink px-2 py-1 whitespace-nowrap z-50">
          <IconBtn label="◀" onClick={() => updatePart(part.instanceId, { rotation: part.rotation - 15 })} />
          <IconBtn label="▶" onClick={() => updatePart(part.instanceId, { rotation: part.rotation + 15 })} />
          <IconBtn label="−" onClick={() => updatePart(part.instanceId, { scale: Math.max(0.4, part.scale - 0.1) })} />
          <IconBtn label="+" onClick={() => updatePart(part.instanceId, { scale: Math.min(2.5, part.scale + 0.1) })} />
          <IconBtn
            label="🗑"
            onClick={() => {
              removePart(part.instanceId);
              sounds.delete();
            }}
          />
        </div>
      )}
    </div>
  );
}

function IconBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        sounds.click();
        onClick();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      className="w-7 h-7 rounded-full bg-candy-pink/10 hover:bg-candy-pink/30 text-candy-pink font-bold text-sm flex items-center justify-center"
    >
      {label}
    </button>
  );
}

const clamp01 = (n: number) => Math.max(0.04, Math.min(0.96, n));

export function Machine() {
  const machineRef = useRef<HTMLDivElement | null>(null);
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: 'machine-drop' });
  const parts = useMachine((s) => s.parts);
  const isAssembling = useMachine((s) => s.isAssembling);
  const selectPart = useMachine((s) => s.selectPart);
  const clear = useMachine((s) => s.clear);
  const armedAssetId = useMachine((s) => s.armedAssetId);
  const armAsset = useMachine((s) => s.armAsset);
  const addPart = useMachine((s) => s.addPart);

  const setRefs = (el: HTMLDivElement | null) => {
    machineRef.current = el;
    setDropRef(el);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAssembling) return;
    const rect = machineRef.current?.getBoundingClientRect();
    if (armedAssetId && rect) {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      addPart(armedAssetId, clamp01(x), clamp01(y));
      armAsset(null);
      sounds.boing();
      return;
    }
    selectPart(null);
  };

  return (
    <div className="h-full flex flex-col bg-white/70 backdrop-blur-md rounded-3xl border-4 border-candy-blue shadow-toy p-3 min-h-0">
      <h2 className="font-display text-xl md:text-2xl text-candy-blue text-center mb-2">
        🛠️ Toy Maker Machine
      </h2>

      {armedAssetId && (
        <div className="mb-2 flex items-center justify-center gap-2 bg-candy-pink/10 border-2 border-candy-pink/40 rounded-full px-3 py-1.5 text-xs md:text-sm font-display text-candy-pink animate-wiggle">
          <span>👆 Tap inside the machine to drop the part!</span>
          <button
            onClick={() => {
              armAsset(null);
              sounds.bloop();
            }}
            className="underline"
          >
            cancel
          </button>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center min-h-0">
        <div
          className="relative w-full"
          style={{ maxWidth: 540, aspectRatio: '1 / 1' }}
        >
          <Gear className="absolute -top-3 -left-3 w-12 h-12 md:w-14 md:h-14 text-candy-pink animate-spinSlow" />
          <Gear className="absolute -top-2 -right-4 w-9 h-9 md:w-10 md:h-10 text-candy-yellow animate-spinSlow [animation-direction:reverse]" />
          <Gear className="absolute -bottom-3 -left-4 w-9 h-9 md:w-10 md:h-10 text-candy-green animate-spinSlow [animation-direction:reverse]" />
          <Gear className="absolute -bottom-3 -right-3 w-12 h-12 md:w-14 md:h-14 text-candy-purple animate-spinSlow" />

          <div
            ref={setRefs}
            onClick={handleCanvasClick}
            className={`relative w-full h-full rounded-[36px] border-[6px] bg-gradient-to-br from-candy-cream to-white overflow-hidden ${
              isOver || armedAssetId ? 'border-candy-pink drop-pulse' : 'border-candy-blue/40'
            } ${isAssembling ? 'animate-wiggle' : ''}`}
            style={{ cursor: armedAssetId ? 'crosshair' : 'default' }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle, #4dc6ff22 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            <AnimatePresence>
              {parts.map((p) => (
                <PartOnCanvas key={p.instanceId} part={p} machineEl={machineRef} />
              ))}
            </AnimatePresence>

            {parts.length === 0 && !isAssembling && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-candy-blue/50 pointer-events-none px-4 text-center">
                <div className="text-5xl md:text-6xl mb-2">👇</div>
                <p className="font-display text-base md:text-xl">Tap or drop parts here!</p>
              </div>
            )}

            {isAssembling && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 14 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, x: (i - 7) * 18 + 260, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], y: -120, scale: 1.5 }}
                    transition={{ duration: 1.6, delay: i * 0.08, repeat: Infinity }}
                    className="absolute bottom-4 w-8 h-8 rounded-full bg-white"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        <button
          onClick={() => {
            clear();
            sounds.delete();
          }}
          className="px-4 py-2 rounded-full font-display text-sm bg-white border-2 border-candy-blue/40 text-candy-blue/80 hover:bg-candy-blue/10"
        >
          🧹 Clear
        </button>
      </div>
    </div>
  );
}

function Gear({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <path
        fill="currentColor"
        d="M32 4l3 7 8-3 1 8 8 1-3 8 7 3-7 3 3 8-8 1-1 8-8-3-3 7-3-7-8 3-1-8-8-1 3-8-7-3 7-3-3-8 8-1 1-8 8 3z"
      />
      <circle cx="32" cy="32" r="8" fill="#fff" />
    </svg>
  );
}
