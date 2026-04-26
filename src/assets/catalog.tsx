import type { ReactNode } from 'react';

export type AssetCategory = 'head' | 'body' | 'wheels' | 'wings' | 'eyes' | 'extra';

export interface AssetDef {
  id: string;
  name: string;
  category: AssetCategory;
  width: number;
  height: number;
  // Inline SVG content (without <svg> wrapper). Keeps things crisp & themeable.
  svg: ReactNode;
}

const make = (id: string, name: string, category: AssetCategory, w: number, h: number, svg: ReactNode): AssetDef => ({
  id, name, category, width: w, height: h, svg,
});

export const ASSETS: AssetDef[] = [
  // ---------- HEADS ----------
  make('head-robot', 'Robot Head', 'head', 110, 110, (
    <>
      <rect x="10" y="20" width="90" height="80" rx="14" fill="#9bbcff" stroke="#1f3a8a" strokeWidth="4" />
      <rect x="48" y="4" width="14" height="20" rx="4" fill="#1f3a8a" />
      <circle cx="55" cy="6" r="6" fill="#ff5fa2" />
      <rect x="24" y="44" width="22" height="22" rx="6" fill="#fff" />
      <rect x="64" y="44" width="22" height="22" rx="6" fill="#fff" />
      <circle cx="35" cy="55" r="6" fill="#1f3a8a" />
      <circle cx="75" cy="55" r="6" fill="#1f3a8a" />
      <rect x="36" y="80" width="38" height="6" rx="3" fill="#1f3a8a" />
    </>
  )),
  make('head-bear', 'Bear Head', 'head', 110, 110, (
    <>
      <circle cx="22" cy="28" r="14" fill="#a86b3c" />
      <circle cx="88" cy="28" r="14" fill="#a86b3c" />
      <circle cx="22" cy="28" r="6" fill="#f4c78b" />
      <circle cx="88" cy="28" r="6" fill="#f4c78b" />
      <circle cx="55" cy="60" r="42" fill="#c98b51" stroke="#6b3f1d" strokeWidth="3" />
      <circle cx="40" cy="55" r="5" fill="#1a1a1a" />
      <circle cx="70" cy="55" r="5" fill="#1a1a1a" />
      <ellipse cx="55" cy="72" rx="9" ry="6" fill="#1a1a1a" />
      <path d="M46 82 Q55 90 64 82" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  )),
  make('head-cat', 'Cat Head', 'head', 110, 110, (
    <>
      <polygon points="14,20 36,16 30,46" fill="#ffb14d" stroke="#a85a00" strokeWidth="3" />
      <polygon points="96,20 74,16 80,46" fill="#ffb14d" stroke="#a85a00" strokeWidth="3" />
      <circle cx="55" cy="60" r="42" fill="#ffd28a" stroke="#a85a00" strokeWidth="3" />
      <circle cx="40" cy="58" r="5" fill="#1a1a1a" />
      <circle cx="70" cy="58" r="5" fill="#1a1a1a" />
      <path d="M50 74 Q55 78 60 74" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M55 74 V78" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    </>
  )),
  make('head-dino', 'Dino Head', 'head', 130, 110, (
    <>
      <path d="M10 70 Q10 30 60 28 Q120 30 120 70 L120 90 L10 90 Z" fill="#7ee36b" stroke="#2c6b1f" strokeWidth="3" />
      <path d="M30 28 L34 18 L40 28 M50 26 L56 14 L62 26 M72 26 L78 16 L84 26" stroke="#2c6b1f" strokeWidth="3" fill="none" strokeLinejoin="round" />
      <circle cx="92" cy="55" r="8" fill="#fff" />
      <circle cx="92" cy="55" r="4" fill="#1a1a1a" />
      <circle cx="108" cy="78" r="3" fill="#1a1a1a" />
      <path d="M70 86 L80 86 M88 86 L98 86" stroke="#1a1a1a" strokeWidth="2" />
    </>
  )),

  // ---------- BODIES ----------
  make('body-rocket', 'Rocket Body', 'body', 110, 160, (
    <>
      <path d="M55 6 Q90 60 90 130 L20 130 Q20 60 55 6 Z" fill="#ff5fa2" stroke="#80113f" strokeWidth="4" />
      <circle cx="55" cy="60" r="16" fill="#ffe066" stroke="#80113f" strokeWidth="3" />
      <rect x="36" y="92" width="38" height="10" rx="3" fill="#80113f" />
      <path d="M20 110 L4 150 L26 132 Z" fill="#ffb14d" stroke="#80113f" strokeWidth="3" />
      <path d="M90 110 L106 150 L84 132 Z" fill="#ffb14d" stroke="#80113f" strokeWidth="3" />
    </>
  )),
  make('body-square', 'Box Body', 'body', 130, 130, (
    <>
      <rect x="6" y="6" width="118" height="118" rx="18" fill="#ffd84d" stroke="#7a5a00" strokeWidth="4" />
      <circle cx="36" cy="38" r="6" fill="#7a5a00" />
      <circle cx="94" cy="38" r="6" fill="#7a5a00" />
      <circle cx="36" cy="92" r="6" fill="#7a5a00" />
      <circle cx="94" cy="92" r="6" fill="#7a5a00" />
      <rect x="40" y="56" width="50" height="22" rx="6" fill="#fff" stroke="#7a5a00" strokeWidth="3" />
      <text x="65" y="73" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7a5a00">FUN</text>
    </>
  )),
  make('body-blob', 'Blob Body', 'body', 140, 130, (
    <>
      <path d="M20 70 Q10 20 70 14 Q140 18 130 80 Q120 130 70 124 Q10 120 20 70 Z" fill="#b06bff" stroke="#3a1a6e" strokeWidth="4" />
      <ellipse cx="55" cy="55" rx="8" ry="12" fill="#fff" />
      <ellipse cx="90" cy="55" rx="8" ry="12" fill="#fff" />
      <circle cx="56" cy="58" r="4" fill="#1a1a1a" />
      <circle cx="91" cy="58" r="4" fill="#1a1a1a" />
      <path d="M55 88 Q72 100 90 88" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  )),
  make('body-car', 'Car Body', 'body', 170, 90, (
    <>
      <path d="M10 70 L25 30 L65 25 L80 10 L130 12 L150 30 L160 70 Z" fill="#4dc6ff" stroke="#0a4a73" strokeWidth="4" />
      <rect x="40" y="32" width="40" height="22" rx="4" fill="#cdeeff" stroke="#0a4a73" strokeWidth="3" />
      <rect x="88" y="22" width="40" height="32" rx="4" fill="#cdeeff" stroke="#0a4a73" strokeWidth="3" />
      <circle cx="148" cy="48" r="4" fill="#ffd84d" />
    </>
  )),

  // ---------- WHEELS / FEET ----------
  make('wheel-big', 'Big Wheel', 'wheels', 70, 70, (
    <>
      <circle cx="35" cy="35" r="32" fill="#1a1a1a" />
      <circle cx="35" cy="35" r="18" fill="#cccccc" />
      <circle cx="35" cy="35" r="6" fill="#1a1a1a" />
      <rect x="33" y="6" width="4" height="58" fill="#1a1a1a" />
      <rect x="6" y="33" width="58" height="4" fill="#1a1a1a" />
    </>
  )),
  make('wheel-tread', 'Tank Tread', 'wheels', 130, 50, (
    <>
      <rect x="4" y="8" width="122" height="34" rx="17" fill="#444" stroke="#111" strokeWidth="3" />
      <circle cx="22" cy="25" r="10" fill="#ddd" />
      <circle cx="65" cy="25" r="10" fill="#ddd" />
      <circle cx="108" cy="25" r="10" fill="#ddd" />
    </>
  )),
  make('feet-paws', 'Paws', 'wheels', 120, 50, (
    <>
      <ellipse cx="30" cy="28" rx="22" ry="16" fill="#c98b51" stroke="#6b3f1d" strokeWidth="3" />
      <ellipse cx="90" cy="28" rx="22" ry="16" fill="#c98b51" stroke="#6b3f1d" strokeWidth="3" />
      <circle cx="22" cy="22" r="3" fill="#6b3f1d" />
      <circle cx="38" cy="22" r="3" fill="#6b3f1d" />
      <circle cx="82" cy="22" r="3" fill="#6b3f1d" />
      <circle cx="98" cy="22" r="3" fill="#6b3f1d" />
    </>
  )),

  // ---------- WINGS ----------
  make('wings-fairy', 'Fairy Wings', 'wings', 180, 110, (
    <>
      <path d="M90 55 Q30 0 10 55 Q30 110 90 55 Z" fill="#ffc1e3" stroke="#b3408a" strokeWidth="3" opacity="0.9" />
      <path d="M90 55 Q150 0 170 55 Q150 110 90 55 Z" fill="#ffc1e3" stroke="#b3408a" strokeWidth="3" opacity="0.9" />
    </>
  )),
  make('wings-jet', 'Jet Wings', 'wings', 200, 60, (
    <>
      <path d="M100 30 L4 14 L20 36 L4 48 Z" fill="#bdbdbd" stroke="#333" strokeWidth="3" />
      <path d="M100 30 L196 14 L180 36 L196 48 Z" fill="#bdbdbd" stroke="#333" strokeWidth="3" />
      <circle cx="100" cy="30" r="6" fill="#ff5fa2" />
    </>
  )),

  // ---------- EYES ----------
  make('eyes-googly', 'Googly Eyes', 'eyes', 100, 50, (
    <>
      <circle cx="25" cy="25" r="22" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="75" cy="25" r="22" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="30" cy="30" r="9" fill="#111" />
      <circle cx="80" cy="30" r="9" fill="#111" />
    </>
  )),
  make('eyes-star', 'Star Eyes', 'eyes', 110, 50, (
    <>
      <polygon points="25,4 31,20 48,20 34,30 39,46 25,36 11,46 16,30 2,20 19,20" fill="#ffd84d" stroke="#a87f00" strokeWidth="2" />
      <polygon points="85,4 91,20 108,20 94,30 99,46 85,36 71,46 76,30 62,20 79,20" fill="#ffd84d" stroke="#a87f00" strokeWidth="2" />
    </>
  )),

  // ---------- EXTRAS ----------
  make('extra-hat', 'Party Hat', 'extra', 80, 90, (
    <>
      <polygon points="40,4 72,82 8,82" fill="#ff5fa2" stroke="#80113f" strokeWidth="3" />
      <circle cx="40" cy="4" r="6" fill="#ffd84d" stroke="#80113f" strokeWidth="2" />
      <circle cx="22" cy="40" r="4" fill="#ffd84d" />
      <circle cx="55" cy="55" r="4" fill="#7ee36b" />
    </>
  )),
  make('extra-bow', 'Bow', 'extra', 90, 50, (
    <>
      <path d="M45 25 L8 6 L8 44 Z" fill="#ff5fa2" stroke="#80113f" strokeWidth="3" />
      <path d="M45 25 L82 6 L82 44 Z" fill="#ff5fa2" stroke="#80113f" strokeWidth="3" />
      <circle cx="45" cy="25" r="8" fill="#ffd84d" stroke="#80113f" strokeWidth="3" />
    </>
  )),
  make('extra-heart', 'Heart', 'extra', 60, 56, (
    <>
      <path d="M30 52 C-8 28 8 0 30 18 C52 0 68 28 30 52 Z" fill="#ff5fa2" stroke="#80113f" strokeWidth="3" />
    </>
  )),
  make('extra-antenna', 'Antenna', 'extra', 60, 80, (
    <>
      <path d="M30 76 Q10 40 24 8" stroke="#444" strokeWidth="4" fill="none" />
      <path d="M30 76 Q50 40 36 8" stroke="#444" strokeWidth="4" fill="none" />
      <circle cx="24" cy="8" r="6" fill="#ff5fa2" stroke="#80113f" strokeWidth="2" />
      <circle cx="36" cy="8" r="6" fill="#7ee36b" stroke="#2c6b1f" strokeWidth="2" />
    </>
  )),
];

export const CATEGORIES: { id: AssetCategory; label: string; emoji: string }[] = [
  { id: 'head', label: 'Heads', emoji: '🙂' },
  { id: 'body', label: 'Bodies', emoji: '🧱' },
  { id: 'wheels', label: 'Wheels', emoji: '⚙️' },
  { id: 'wings', label: 'Wings', emoji: '🪽' },
  { id: 'eyes', label: 'Eyes', emoji: '👀' },
  { id: 'extra', label: 'Extras', emoji: '✨' },
];

export const getAsset = (id: string) => ASSETS.find((a) => a.id === id);
