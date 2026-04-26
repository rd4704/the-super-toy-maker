# 🧸 The Super Toy Maker

A colorful, kid-friendly web app where children build their own toys by dragging
parts into a magical machine, give the toy a name, and watch it come to life
with animations, sounds, and sparkles. Saved toys live in a personal library.

## ✨ Features

- **3-panel layout**: Asset shelf · Toy Maker Machine · Output & Library
- **Drag & drop** parts onto the machine canvas (powered by `@dnd-kit`)
- **Move, rotate, scale, delete** parts after placement
- **Animated assembly** sequence with steam, gears, confetti, and sound effects
- **Composite image generator** — turns the placed parts + name into a saveable PNG
- **Local library** stored in IndexedDB (Dexie) — no account or backend needed
- **PWA-ready** — installable on phone/tablet/desktop, works offline

## 🛠 Tech stack

| Concern | Choice |
| --- | --- |
| Framework | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS (custom candy palette) |
| Drag & drop | `@dnd-kit/core` |
| Animation | Framer Motion + Tailwind keyframes |
| Audio | Howler.js (procedurally generated chiptune beeps, no network needed) |
| State | Zustand |
| Storage | Dexie (IndexedDB) |
| PWA | `vite-plugin-pwa` |
| Assets | Inline hand-rolled SVGs (CC0, ship anywhere) |

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

### Build for production

```bash
npm run build
npm run preview
```

## 🧒 Kid-safety choices

- **No network calls required.** Sounds are generated in-browser; assets are
  bundled SVGs; image generation runs locally.
- **No login, no analytics, no third-party trackers.**
- **Composite-based "Make" step** (deterministic, no AI surprises). An optional
  AI mode using a free image API (e.g., Pollinations.ai) can be added later
  with a strict allow-list/profanity filter on the toy name.

## 🗂 Project structure

```
src/
  App.tsx                 # 3-panel layout + DnD context
  main.tsx                # React entry
  styles.css              # Tailwind + custom keyframes
  assets/
    catalog.tsx           # Inline SVG asset library + categories
    AssetSvg.tsx          # Renders an asset by id
  components/
    AssetsPanel.tsx       # Left: scrollable shelf, draggable items
    Machine.tsx           # Middle: drop zone, gears, placed parts
    Output.tsx            # Right: name input, Make button, reveal, library
  state/
    machine.ts            # Zustand store of placed parts
    db.ts                 # Dexie database for the saved-toys library
  sound/
    sounds.ts             # Howler-powered procedural SFX
  utils/
    render.tsx            # Composites parts + name into a PNG dataURL
```

## 📱 Going mobile

This is a standard Vite/React app — wrap with **Capacitor** to ship to iOS &
Android stores using the same code:

```bash
npm i -D @capacitor/cli @capacitor/core @capacitor/ios @capacitor/android
npx cap init "Super Toy Maker" com.example.toymaker --web-dir=dist
npm run build && npx cap add ios && npx cap add android && npx cap sync
```

## 🧩 Add more parts

Open `src/assets/catalog.tsx` and append to the `ASSETS` array. Each asset is an
inline SVG with a category, so it appears automatically in the right tab.

## 🪄 Optional: enable AI image generation

Pollinations.ai exposes a free, no-key endpoint. To add a "Surprise me" button:

```ts
const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
  `${toyName}, cute colorful toy, pixar style, white background`
)}?width=720&height=720&nologo=true`;
```

⚠️ Always sanitize the toy name and apply a kid-safe word filter before
sending to any external API.

## 📜 License

MIT for the code. Bundled SVG assets in this repo are original / CC0.
