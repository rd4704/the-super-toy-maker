import { renderToString } from 'react-dom/server';
import type { PlacedPart } from '../state/machine';
import { getAsset } from '../assets/catalog';
import { AssetSvg } from '../assets/AssetSvg';

const SIZE = 720;

/**
 * Composites the placed SVG parts into a single PNG dataURL with the toy's
 * name plate and a sparkly frame. Fully offline, deterministic, kid-safe.
 */
export async function renderToyToDataUrl(parts: PlacedPart[], name: string): Promise<string> {
  const partsSvg = parts
    .slice()
    .sort((a, b) => a.z - b.z)
    .map((p) => {
      const asset = getAsset(p.assetId);
      if (!asset) return '';
      const cx = p.x * SIZE;
      const cy = p.y * SIZE;
      // Match on-screen visual size: machine canvas is ~520px, so up-scale.
      const scale = (SIZE / 520) * p.scale;
      const inner = renderToString(<AssetSvg asset={asset} />);
      return `<g transform="translate(${cx} ${cy}) rotate(${p.rotation}) scale(${scale}) translate(${
        -asset.width / 2
      } ${-asset.height / 2})">${stripSvgWrapper(inner)}</g>`;
    })
    .join('');

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#fff7e6"/>
      <stop offset="100%" stop-color="#ffd1e6"/>
    </radialGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bg)"/>
  <rect x="14" y="14" width="${SIZE - 28}" height="${SIZE - 28}" rx="48"
        fill="none" stroke="#ff5fa2" stroke-width="10" stroke-dasharray="2 14" stroke-linecap="round"/>
  ${sparkles()}
  ${partsSvg}
  <g>
    <rect x="${SIZE / 2 - 240}" y="${SIZE - 110}" width="480" height="74" rx="37"
          fill="#ff5fa2" stroke="#80113f" stroke-width="6"/>
    <text x="${SIZE / 2}" y="${SIZE - 60}" text-anchor="middle"
          font-family="Fredoka, Comic Sans MS, sans-serif" font-size="40"
          font-weight="700" fill="#ffffff">${escapeXml(name)}</text>
  </g>
</svg>`.trim();

  return await svgToPngDataUrl(svg, SIZE, SIZE);
}

function sparkles() {
  const pts = [
    [80, 90], [640, 110], [120, 600], [620, 580], [350, 70], [60, 360], [660, 360],
  ];
  return pts
    .map(
      ([x, y]) => `<g transform="translate(${x} ${y})">
        <path d="M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z" fill="#ffd84d" opacity="0.9"/>
      </g>`,
    )
    .join('');
}

function stripSvgWrapper(svg: string): string {
  return svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function svgToPngDataUrl(svg: string, w: number, h: number): Promise<string> {
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImage(url);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
