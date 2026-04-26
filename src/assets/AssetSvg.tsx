import type { AssetDef } from './catalog';

interface Props {
  asset: AssetDef;
  size?: number;
  className?: string;
}

export function AssetSvg({ asset, size, className }: Props) {
  const w = size ?? asset.width;
  const h = size ? (asset.height * size) / asset.width : asset.height;
  return (
    <svg
      viewBox={`0 0 ${asset.width} ${asset.height}`}
      width={w}
      height={h}
      className={className}
      style={{ overflow: 'visible' }}
    >
      {asset.svg}
    </svg>
  );
}
