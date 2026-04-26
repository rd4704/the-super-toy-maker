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

  // ============================================================
  // EXTRA HAND-DRAWN SVG ASSETS
  // ============================================================

  // ---------- MORE HEADS ----------
  make('head-alien', 'Alien Head', 'head', 110, 120, (
    <>
      <ellipse cx="55" cy="68" rx="40" ry="48" fill="#7ee36b" stroke="#2c6b1f" strokeWidth="3" />
      <ellipse cx="40" cy="60" rx="9" ry="14" fill="#1a1a1a" />
      <ellipse cx="70" cy="60" rx="9" ry="14" fill="#1a1a1a" />
      <ellipse cx="42" cy="55" rx="3" ry="5" fill="#fff" />
      <ellipse cx="72" cy="55" rx="3" ry="5" fill="#fff" />
      <path d="M46 88 Q55 94 64 88" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M55 20 V8" stroke="#2c6b1f" strokeWidth="3" />
      <circle cx="55" cy="6" r="6" fill="#ff5fa2" stroke="#80113f" strokeWidth="2" />
    </>
  )),
  make('head-pirate', 'Pirate Head', 'head', 120, 120, (
    <>
      <circle cx="60" cy="68" r="44" fill="#ffd9b3" stroke="#7a4a1a" strokeWidth="3" />
      <path d="M14 38 Q60 14 106 38 L96 50 L24 50 Z" fill="#1a1a1a" />
      <rect x="50" y="44" width="20" height="6" fill="#ff5fa2" />
      <circle cx="46" cy="68" r="6" fill="#1a1a1a" />
      <rect x="64" y="60" width="18" height="14" rx="2" fill="#1a1a1a" />
      <path d="M64 67 L40 60" stroke="#1a1a1a" strokeWidth="2" />
      <path d="M50 90 Q60 96 70 90" stroke="#7a4a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  )),
  make('head-unicorn', 'Unicorn Head', 'head', 120, 130, (
    <>
      <ellipse cx="60" cy="80" rx="42" ry="40" fill="#ffe6f4" stroke="#b3408a" strokeWidth="3" />
      <polygon points="60,8 68,40 52,40" fill="#ffd84d" stroke="#a87f00" strokeWidth="2" />
      <path d="M30 50 Q22 34 32 28 L40 50 Z" fill="#ffb3d1" stroke="#b3408a" strokeWidth="2" />
      <path d="M90 50 Q98 34 88 28 L80 50 Z" fill="#ffb3d1" stroke="#b3408a" strokeWidth="2" />
      <circle cx="46" cy="80" r="5" fill="#1a1a1a" />
      <circle cx="74" cy="80" r="5" fill="#1a1a1a" />
      <ellipse cx="60" cy="98" rx="6" ry="4" fill="#ff8ec6" />
      <path d="M52 108 Q60 112 68 108" stroke="#b3408a" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  )),
  make('head-ghost', 'Ghost Head', 'head', 110, 120, (
    <>
      <path d="M10 60 Q10 12 55 12 Q100 12 100 60 V108 L88 100 L76 108 L64 100 L52 108 L40 100 L28 108 L16 100 Z"
            fill="#ffffff" stroke="#7a8aa0" strokeWidth="3" />
      <ellipse cx="40" cy="55" rx="6" ry="9" fill="#1a1a1a" />
      <ellipse cx="70" cy="55" rx="6" ry="9" fill="#1a1a1a" />
      <ellipse cx="55" cy="78" rx="9" ry="6" fill="#1a1a1a" />
    </>
  )),
  make('head-monster', 'Monster Head', 'head', 130, 120, (
    <>
      <path d="M10 80 Q10 18 65 18 Q120 18 120 80 Q120 110 65 110 Q10 110 10 80 Z"
            fill="#b06bff" stroke="#3a1a6e" strokeWidth="3" />
      <polygon points="20,12 26,32 14,32" fill="#3a1a6e" />
      <polygon points="110,12 116,32 104,32" fill="#3a1a6e" />
      <circle cx="42" cy="58" r="14" fill="#fff" />
      <circle cx="88" cy="58" r="14" fill="#fff" />
      <circle cx="42" cy="58" r="7" fill="#1a1a1a" />
      <circle cx="88" cy="58" r="7" fill="#1a1a1a" />
      <path d="M30 88 L42 78 L52 90 L62 78 L72 90 L82 78 L92 90 L102 78"
            stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )),

  // ---------- MORE BODIES ----------
  make('body-cupcake', 'Cupcake Body', 'body', 130, 140, (
    <>
      <path d="M22 70 L40 134 L90 134 L108 70 Z" fill="#ffd6a5" stroke="#7a4a1a" strokeWidth="3" />
      <path d="M22 80 L108 80 M28 96 L102 96 M34 112 L96 112" stroke="#7a4a1a" strokeWidth="2" />
      <path d="M14 70 Q14 36 65 36 Q116 36 116 70 Q90 80 65 70 Q40 80 14 70 Z"
            fill="#ffb3d1" stroke="#b3408a" strokeWidth="3" />
      <circle cx="40" cy="58" r="3" fill="#ff5fa2" />
      <circle cx="65" cy="50" r="3" fill="#7ee36b" />
      <circle cx="90" cy="58" r="3" fill="#4dc6ff" />
      <circle cx="65" cy="32" r="6" fill="#ff5fa2" stroke="#80113f" strokeWidth="2" />
    </>
  )),
  make('body-mushroom', 'Mushroom Body', 'body', 140, 140, (
    <>
      <path d="M14 70 Q14 18 70 18 Q126 18 126 70 Q126 80 70 80 Q14 80 14 70 Z"
            fill="#ff5fa2" stroke="#80113f" strokeWidth="3" />
      <circle cx="40" cy="48" r="10" fill="#fff" />
      <circle cx="80" cy="38" r="8" fill="#fff" />
      <circle cx="100" cy="58" r="7" fill="#fff" />
      <rect x="48" y="78" width="44" height="58" rx="6" fill="#fff7e6" stroke="#80113f" strokeWidth="3" />
      <circle cx="60" cy="100" r="3" fill="#80113f" />
      <circle cx="80" cy="100" r="3" fill="#80113f" />
      <path d="M58 116 Q70 124 82 116" stroke="#80113f" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  )),
  make('body-cloud', 'Cloud Body', 'body', 160, 110, (
    <>
      <path d="M28 80 Q4 80 14 60 Q12 36 40 36 Q44 18 70 22 Q86 8 110 26 Q146 24 144 56 Q160 76 132 84 Q120 102 90 90 Q60 100 40 92 Q28 96 28 80 Z"
            fill="#ffffff" stroke="#7a8aa0" strokeWidth="3" />
      <circle cx="60" cy="56" r="5" fill="#1a1a1a" />
      <circle cx="100" cy="56" r="5" fill="#1a1a1a" />
      <path d="M68 74 Q80 82 92 74" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="48" cy="68" r="4" fill="#ff8ec6" opacity="0.6" />
      <circle cx="112" cy="68" r="4" fill="#ff8ec6" opacity="0.6" />
    </>
  )),
  make('body-sub', 'Submarine Body', 'body', 180, 110, (
    <>
      <ellipse cx="90" cy="60" rx="80" ry="38" fill="#ffd84d" stroke="#7a5a00" strokeWidth="4" />
      <rect x="74" y="14" width="34" height="22" rx="4" fill="#ffd84d" stroke="#7a5a00" strokeWidth="3" />
      <rect x="86" y="4" width="6" height="18" fill="#7a5a00" />
      <circle cx="90" cy="14" r="4" fill="#ff5fa2" />
      <circle cx="50" cy="60" r="10" fill="#cdeeff" stroke="#0a4a73" strokeWidth="3" />
      <circle cx="90" cy="60" r="10" fill="#cdeeff" stroke="#0a4a73" strokeWidth="3" />
      <circle cx="130" cy="60" r="10" fill="#cdeeff" stroke="#0a4a73" strokeWidth="3" />
      <path d="M170 50 L186 40 L186 80 L170 70 Z" fill="#7a5a00" />
    </>
  )),
  make('body-castle', 'Castle Body', 'body', 160, 150, (
    <>
      <rect x="20" y="40" width="120" height="100" fill="#cccccc" stroke="#444" strokeWidth="3" />
      <path d="M20 40 V20 H36 V32 H50 V20 H66 V32 H80 V20 H96 V32 H110 V20 H126 V32 H140 V40 Z"
            fill="#cccccc" stroke="#444" strokeWidth="3" />
      <rect x="68" y="80" width="24" height="40" rx="12" fill="#7a4a1a" stroke="#3a1a0a" strokeWidth="3" />
      <rect x="36" y="60" width="14" height="14" fill="#4dc6ff" stroke="#0a4a73" strokeWidth="2" />
      <rect x="110" y="60" width="14" height="14" fill="#4dc6ff" stroke="#0a4a73" strokeWidth="2" />
      <path d="M80 14 L80 0 L96 6 L80 12" fill="#ff5fa2" stroke="#80113f" strokeWidth="2" />
    </>
  )),

  // ---------- MORE WHEELS / FEET ----------
  make('wheel-spring', 'Springs', 'wheels', 120, 80, (
    <>
      <path d="M16 8 Q40 18 16 28 Q40 38 16 48 Q40 58 16 68" stroke="#888" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M104 8 Q80 18 104 28 Q80 38 104 48 Q80 58 104 68" stroke="#888" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <ellipse cx="20" cy="74" rx="14" ry="5" fill="#444" />
      <ellipse cx="100" cy="74" rx="14" ry="5" fill="#444" />
    </>
  )),
  make('wheel-rocket', 'Rocket Boots', 'wheels', 130, 70, (
    <>
      <rect x="10" y="14" width="46" height="26" rx="6" fill="#ff5fa2" stroke="#80113f" strokeWidth="3" />
      <rect x="74" y="14" width="46" height="26" rx="6" fill="#ff5fa2" stroke="#80113f" strokeWidth="3" />
      <rect x="14" y="40" width="38" height="10" rx="3" fill="#80113f" />
      <rect x="78" y="40" width="38" height="10" rx="3" fill="#80113f" />
      <path d="M22 50 Q33 64 44 50 L40 68 L33 60 L26 68 Z" fill="#ffd84d" stroke="#a87f00" strokeWidth="2" />
      <path d="M86 50 Q97 64 108 50 L104 68 L97 60 L90 68 Z" fill="#ffd84d" stroke="#a87f00" strokeWidth="2" />
    </>
  )),
  make('wheel-ball', 'Bouncy Ball', 'wheels', 80, 80, (
    <>
      <circle cx="40" cy="40" r="34" fill="#ff5fa2" stroke="#80113f" strokeWidth="4" />
      <path d="M6 40 H74 M40 6 V74" stroke="#80113f" strokeWidth="3" />
      <path d="M16 16 Q40 36 64 16 M16 64 Q40 44 64 64" stroke="#80113f" strokeWidth="3" fill="none" />
      <circle cx="28" cy="26" r="6" fill="#ffffff" opacity="0.6" />
    </>
  )),

  // ---------- MORE WINGS ----------
  make('wings-bat', 'Bat Wings', 'wings', 200, 90, (
    <>
      <path d="M100 50 Q60 0 8 20 Q24 40 12 60 Q34 70 60 60 Q72 80 100 50 Z"
            fill="#3a1a6e" stroke="#1a0a3e" strokeWidth="3" />
      <path d="M100 50 Q140 0 192 20 Q176 40 188 60 Q166 70 140 60 Q128 80 100 50 Z"
            fill="#3a1a6e" stroke="#1a0a3e" strokeWidth="3" />
    </>
  )),
  make('wings-rainbow', 'Rainbow Wings', 'wings', 200, 100, (
    <>
      <path d="M100 50 Q40 10 8 40 Q40 60 100 50 Z" fill="#ff5fa2" />
      <path d="M100 50 Q44 22 16 46 Q44 60 100 50 Z" fill="#ffd84d" />
      <path d="M100 50 Q48 34 24 52 Q48 60 100 50 Z" fill="#7ee36b" />
      <path d="M100 50 Q52 42 32 56 Q52 60 100 50 Z" fill="#4dc6ff" />
      <path d="M100 50 Q160 10 192 40 Q160 60 100 50 Z" fill="#ff5fa2" />
      <path d="M100 50 Q156 22 184 46 Q156 60 100 50 Z" fill="#ffd84d" />
      <path d="M100 50 Q152 34 176 52 Q152 60 100 50 Z" fill="#7ee36b" />
      <path d="M100 50 Q148 42 168 56 Q148 60 100 50 Z" fill="#4dc6ff" />
    </>
  )),
  make('wings-propeller', 'Propeller', 'wings', 130, 60, (
    <>
      <ellipse cx="65" cy="30" rx="60" ry="6" fill="#bdbdbd" stroke="#333" strokeWidth="3" />
      <ellipse cx="65" cy="30" rx="6" ry="22" fill="#bdbdbd" stroke="#333" strokeWidth="3" />
      <circle cx="65" cy="30" r="8" fill="#ff5fa2" stroke="#80113f" strokeWidth="3" />
    </>
  )),

  // ---------- MORE EYES ----------
  make('eyes-heart', 'Heart Eyes', 'eyes', 120, 50, (
    <>
      <path d="M28 40 C-2 22 14 4 28 18 C42 4 58 22 28 40 Z" fill="#ff5fa2" stroke="#80113f" strokeWidth="2" />
      <path d="M92 40 C62 22 78 4 92 18 C106 4 122 22 92 40 Z" fill="#ff5fa2" stroke="#80113f" strokeWidth="2" />
    </>
  )),
  make('eyes-sleepy', 'Sleepy Eyes', 'eyes', 110, 40, (
    <>
      <path d="M10 20 Q30 4 50 20" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M60 20 Q80 4 100 20" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M14 26 L18 32 M86 26 L82 32 M96 26 L92 32 M24 26 L28 32" stroke="#4dc6ff" strokeWidth="2" strokeLinecap="round" />
    </>
  )),
  make('eyes-spiral', 'Spiral Eyes', 'eyes', 120, 50, (
    <>
      <circle cx="30" cy="25" r="22" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="90" cy="25" r="22" fill="#fff" stroke="#111" strokeWidth="3" />
      <path d="M30 25 m-14 0 a14 14 0 1 1 28 0 a10 10 0 1 1 -20 0 a6 6 0 1 1 12 0" fill="none" stroke="#1a1a1a" strokeWidth="3" />
      <path d="M90 25 m-14 0 a14 14 0 1 1 28 0 a10 10 0 1 1 -20 0 a6 6 0 1 1 12 0" fill="none" stroke="#1a1a1a" strokeWidth="3" />
    </>
  )),

  // ---------- MORE EXTRAS ----------
  make('extra-crown', 'Crown', 'extra', 100, 60, (
    <>
      <path d="M10 50 L10 20 L30 36 L50 8 L70 36 L90 20 L90 50 Z"
            fill="#ffd84d" stroke="#a87f00" strokeWidth="3" strokeLinejoin="round" />
      <rect x="10" y="50" width="80" height="6" fill="#ffd84d" stroke="#a87f00" strokeWidth="2" />
      <circle cx="30" cy="34" r="3" fill="#ff5fa2" />
      <circle cx="50" cy="14" r="4" fill="#4dc6ff" />
      <circle cx="70" cy="34" r="3" fill="#7ee36b" />
    </>
  )),
  make('extra-cape', 'Cape', 'extra', 130, 100, (
    <>
      <path d="M20 8 L110 8 L120 90 L100 80 L90 92 L78 80 L65 92 L52 80 L40 92 L30 80 L10 90 Z"
            fill="#ff5fa2" stroke="#80113f" strokeWidth="3" />
      <circle cx="35" cy="20" r="4" fill="#ffd84d" />
      <circle cx="95" cy="20" r="4" fill="#ffd84d" />
    </>
  )),
  make('extra-magic-wand', 'Magic Wand', 'extra', 100, 100, (
    <>
      <rect x="46" y="34" width="8" height="62" rx="2" fill="#7a4a1a" stroke="#3a1a0a" strokeWidth="2" transform="rotate(20 50 65)" />
      <polygon points="60,8 68,28 88,28 72,40 78,60 60,48 42,60 48,40 32,28 52,28"
               fill="#ffd84d" stroke="#a87f00" strokeWidth="2" />
      <circle cx="20" cy="48" r="3" fill="#ff5fa2" />
      <circle cx="84" cy="76" r="3" fill="#7ee36b" />
      <circle cx="14" cy="78" r="2" fill="#4dc6ff" />
    </>
  )),
  make('extra-flower', 'Flower', 'extra', 80, 90, (
    <>
      <rect x="38" y="44" width="4" height="44" fill="#2c6b1f" />
      <path d="M40 80 Q22 70 24 56" stroke="#2c6b1f" strokeWidth="3" fill="none" />
      <path d="M40 70 Q56 64 56 50" stroke="#2c6b1f" strokeWidth="3" fill="none" />
      <ellipse cx="20" cy="58" rx="6" ry="3" fill="#7ee36b" transform="rotate(-30 20 58)" />
      <ellipse cx="58" cy="50" rx="6" ry="3" fill="#7ee36b" transform="rotate(30 58 50)" />
      <circle cx="22" cy="22" r="10" fill="#ffd84d" />
      <circle cx="58" cy="22" r="10" fill="#ffd84d" />
      <circle cx="22" cy="46" r="10" fill="#ffd84d" />
      <circle cx="58" cy="46" r="10" fill="#ffd84d" />
      <circle cx="40" cy="10" r="10" fill="#ffd84d" />
      <circle cx="40" cy="34" r="10" fill="#ff5fa2" />
    </>
  )),
  make('extra-balloon', 'Balloon', 'extra', 70, 110, (
    <>
      <ellipse cx="35" cy="40" rx="28" ry="34" fill="#ff5fa2" stroke="#80113f" strokeWidth="3" />
      <polygon points="35,74 30,82 40,82" fill="#80113f" />
      <path d="M35 82 Q40 96 30 108" stroke="#80113f" strokeWidth="2" fill="none" />
      <ellipse cx="22" cy="26" rx="6" ry="9" fill="#fff" opacity="0.5" />
    </>
  )),
  make('extra-lightning', 'Lightning', 'extra', 60, 100, (
    <>
      <polygon points="34,4 8,54 28,54 22,96 54,42 32,42 42,4"
               fill="#ffd84d" stroke="#a87f00" strokeWidth="3" strokeLinejoin="round" />
    </>
  )),
  make('extra-music', 'Music Note', 'extra', 70, 90, (
    <>
      <rect x="42" y="14" width="6" height="60" fill="#1a1a1a" />
      <path d="M48 14 L66 8 L66 24 L48 30 Z" fill="#1a1a1a" />
      <ellipse cx="34" cy="74" rx="14" ry="10" fill="#1a1a1a" transform="rotate(-12 34 74)" />
    </>
  )),
  make('extra-mustache', 'Mustache', 'extra', 100, 40, (
    <>
      <path d="M50 18 Q40 4 22 8 Q4 14 14 28 Q26 36 38 28 Q44 22 50 24 Q56 22 62 28 Q74 36 86 28 Q96 14 78 8 Q60 4 50 18 Z"
            fill="#7a4a1a" stroke="#3a1a0a" strokeWidth="2" />
    </>
  )),
  make('extra-glasses', 'Glasses', 'extra', 130, 50, (
    <>
      <circle cx="32" cy="25" r="22" fill="none" stroke="#1a1a1a" strokeWidth="4" />
      <circle cx="98" cy="25" r="22" fill="none" stroke="#1a1a1a" strokeWidth="4" />
      <path d="M54 25 L76 25" stroke="#1a1a1a" strokeWidth="4" />
      <path d="M10 25 L0 22" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
      <path d="M120 25 L130 22" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="26" cy="20" rx="6" ry="4" fill="#ffffff" opacity="0.5" />
      <ellipse cx="92" cy="20" rx="6" ry="4" fill="#ffffff" opacity="0.5" />
    </>
  )),
  make('extra-star-big', 'Big Star', 'extra', 90, 86, (
    <>
      <polygon points="45,4 56,32 86,32 62,50 72,80 45,62 18,80 28,50 4,32 34,32"
               fill="#ffd84d" stroke="#a87f00" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="35" cy="38" r="3" fill="#fff" opacity="0.7" />
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
