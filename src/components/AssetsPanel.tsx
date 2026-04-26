import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ASSETS, CATEGORIES, type AssetCategory, type AssetDef } from '../assets/catalog';
import { AssetSvg } from '../assets/AssetSvg';
import { sounds } from '../sound/sounds';
import { useMachine } from '../state/machine';

function DraggableAsset({ asset }: { asset: AssetDef }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `asset:${asset.id}`,
    data: { kind: 'asset', assetId: asset.id },
  });
  const armedAssetId = useMachine((s) => s.armedAssetId);
  const armAsset = useMachine((s) => s.armAsset);
  const armed = armedAssetId === asset.id;

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      type="button"
      onMouseDown={() => sounds.pickup()}
      onClick={(e) => {
        if (isDragging) return;
        e.preventDefault();
        sounds.click();
        armAsset(armed ? null : asset.id);
      }}
      onDragStart={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      title={armed ? `Tap the machine to place ${asset.name}` : asset.name}
      style={{ touchAction: 'none' }}
      className={`group relative aspect-square rounded-2xl bg-white border-4 shadow-pop p-2 flex items-center justify-center transition-transform ${
        isDragging
          ? 'opacity-30 border-candy-pink/40'
          : armed
            ? 'border-candy-pink scale-105 ring-4 ring-candy-pink/40 animate-wiggle'
            : 'border-candy-pink/40 hover:-translate-y-1 hover:rotate-2'
      }`}
    >
      <div className="absolute inset-2 flex items-center justify-center pointer-events-none">
        <AssetSvg asset={asset} size={Math.min(72, asset.width)} />
      </div>
      <span className="absolute bottom-0 left-0 right-0 text-[10px] font-display text-candy-pink/80 pb-0.5 pointer-events-none">
        {asset.name}
      </span>
      {armed && (
        <span className="absolute -top-2 -right-2 bg-candy-pink text-white text-[10px] font-display rounded-full px-1.5 py-0.5 shadow-pop pointer-events-none">
          Tap machine!
        </span>
      )}
    </button>
  );
}

export function AssetsPanel() {
  const [cat, setCat] = useState<AssetCategory>('head');
  const filtered = ASSETS.filter((a) => a.category === cat);

  return (
    <div className="h-full flex flex-col bg-white/70 backdrop-blur-md rounded-3xl border-4 border-candy-yellow shadow-toy p-3 min-h-0">
      <h2 className="font-display text-xl md:text-2xl text-candy-pink text-center mb-2">
        🎁 Toy Parts
      </h2>

      <div className="flex flex-wrap gap-1.5 justify-center mb-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setCat(c.id);
              sounds.bloop();
            }}
            className={`px-3 py-1.5 rounded-full font-display text-sm border-2 transition-all ${
              cat === c.id
                ? 'bg-candy-pink text-white border-candy-pink scale-105 shadow-pop'
                : 'bg-white text-candy-pink/80 border-candy-pink/30 hover:bg-candy-pink/10'
            }`}
          >
            <span className="mr-1">{c.emoji}</span>
            {c.label}
          </button>
        ))}
      </div>

      <div className="shelf-scroll flex-1 overflow-y-auto pr-1 min-h-[140px]">
        <div className="grid grid-cols-3 sm:grid-cols-2 gap-2 md:gap-3">
          {filtered.map((a) => (
            <DraggableAsset key={a.id} asset={a} />
          ))}
        </div>
      </div>

      <p className="text-center text-[11px] md:text-xs text-candy-pink/70 mt-2 font-display">
        Tap a part, then tap the machine — or drag it in!
      </p>
    </div>
  );
}
