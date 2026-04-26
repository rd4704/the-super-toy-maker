import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ASSETS, CATEGORIES, type AssetCategory, type AssetDef } from '../assets/catalog';
import { AssetSvg } from '../assets/AssetSvg';
import { sounds } from '../sound/sounds';

function DraggableAsset({ asset }: { asset: AssetDef }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `asset:${asset.id}`,
    data: { kind: 'asset', assetId: asset.id },
  });
  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onMouseDown={() => sounds.pickup()}
      title={asset.name}
      className={`group relative aspect-square rounded-2xl bg-white border-4 border-candy-pink/40 shadow-pop p-2 flex items-center justify-center transition-transform ${
        isDragging ? 'opacity-30' : 'hover:-translate-y-1 hover:rotate-2'
      }`}
    >
      <AssetSvg asset={asset} size={Math.min(72, asset.width)} />
      <span className="absolute bottom-0 left-0 right-0 text-[10px] font-display text-candy-pink/80 pb-0.5">
        {asset.name}
      </span>
    </button>
  );
}

export function AssetsPanel() {
  const [cat, setCat] = useState<AssetCategory>('head');
  const filtered = ASSETS.filter((a) => a.category === cat);

  return (
    <div className="h-full flex flex-col bg-white/70 backdrop-blur-md rounded-3xl border-4 border-candy-yellow shadow-toy p-3">
      <h2 className="font-display text-2xl text-candy-pink text-center mb-2">🎁 Toy Parts</h2>

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

      <div className="shelf-scroll flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((a) => (
            <DraggableAsset key={a.id} asset={a} />
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-candy-pink/70 mt-2 font-display">
        Drag a part into the machine ➡️
      </p>
    </div>
  );
}
