# 🧸 The Super Toy Maker

A colorful, kid-friendly web app where children build their own toys —
either by assembling parts in a magical machine, or by typing a name and
letting AI draw it. Toys are saved to a personal library that lives in the
browser, no account required.

## ✨ Features

- **Two ways to make a toy**:
  - 🛠️ **Build mode**: drag *or* tap parts into the machine, then animate them with a name
  - 🎲 **Surprise Me (AI)**: type a toy name and a free image API draws it for you
- **Tap-to-place** + **drag-and-drop** — pick whichever feels easier (great for tiny fingers)
- **Move, rotate, scale, delete** parts after placement
- **Animated assembly** sequence with steam, gears, confetti, and silly sounds
- **Local library** — clickable cards open a detail view with download & delete
- **Mobile-first responsive layout** with natural page scroll on phones
- **Procedural sound effects + cheerful background music** with a global mute toggle
- **PWA-ready** — installable on phone/tablet/desktop, works offline

## 🛠 Tech stack

| Concern | Choice |
| --- | --- |
| Framework | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS (custom candy palette + keyframes) |
| Drag & drop | `@dnd-kit/core` + `snapCenterToCursor` modifier |
| Animation | Framer Motion |
| Audio | Howler.js + a tiny in-house WAV synth (no audio files shipped) |
| State | Zustand |
| Storage | Dexie (IndexedDB) |
| AI image | [Pollinations.ai](https://image.pollinations.ai) (free, no key) |
| PWA | `vite-plugin-pwa` |
| Hosting | Vercel (with a same-origin rewrite proxy for the AI API) |
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

The dev and preview servers proxy `/ai-image/*` to `image.pollinations.ai`
so the browser sees the API as same-origin (avoids the upstream Cloudflare
Turnstile check).

## 🧒 Kid-safety choices

- **No login, no analytics, no third-party trackers.**
- **AI requests are proxied through our own origin**, so no Referer header
  leaks to the upstream image API and toy names stay private to the request.
- **Kid-safe prompt template + word filter**: all AI prompts are wrapped
  inside a fixed *"a cute colorful toy named X, pixar style, ..."* template,
  and the toy name is run through a profanity / adult-content / character
  allow-list before any network call.
- **`safe=true`** is passed to the AI endpoint to enable strict NSFW filtering.
- Apart from the optional AI generation, everything else (sounds, parts,
  composite image, library) runs locally in the browser.

## 🗂 Project structure

```
src/
  App.tsx                       # Layout + DnD context + AI modal mount
  main.tsx                      # React entry
  styles.css                    # Tailwind + custom keyframes
  assets/
    catalog.tsx                 # Inline SVG asset library + categories
    AssetSvg.tsx                # Renders an asset by id
  components/
    AssetsPanel.tsx             # Parts shelf (drag + tap-to-arm)
    Machine.tsx                 # Drop zone, gears, placed parts, tap-to-place
    Output.tsx                  # Name input, Make button, library, detail modal
    SurpriseAiModal.tsx         # AI Surprise Me flow (input → loading → reveal)
  state/
    machine.ts                  # Zustand store (parts, selected, armedAssetId, …)
    db.ts                       # Dexie database for the saved-toys library
  sound/
    sounds.ts                   # Howler-powered procedural SFX + music
  utils/
    render.tsx                  # Composites SVG parts + name into a PNG dataURL
    surprise.ts                 # Random local toy builder + name generator
    ai.ts                       # Builds the Pollinations image URL (relative)
    safety.ts                   # Kid-safe word filter for AI prompts
```

## 📱 Mobile UX

The app adapts at the `md` breakpoint:

- **Phones**: natural page scroll, vertical stack (`Machine → Parts → Output`),
  big Surprise Me CTA right under the header, larger tap targets, 3-column
  parts grid.
- **Desktop**: fixed 3-panel layout (`Parts | Machine | Output`) using `100dvh`,
  no page-level scroll.

To ship to iOS & Android stores, wrap with **Capacitor**:

```bash
npm i -D @capacitor/cli @capacitor/core @capacitor/ios @capacitor/android
npx cap init "Super Toy Maker" com.example.toymaker --web-dir=dist
npm run build && npx cap add ios && npx cap add android && npx cap sync
```

## 🧩 Add more parts

Open `src/assets/catalog.tsx` and append to the `ASSETS` array. Each asset is
inline SVG with a `category`, so it appears automatically in the right tab.
The 6 built-in categories are `head`, `body`, `wheels`, `wings`, `eyes`, `extra`.

## 🪄 The Surprise Me (AI) flow

1. User clicks **🎲 Surprise Me**, types a toy name.
2. Name is validated by `src/utils/safety.ts` (length, allowed characters,
   profanity/adult-theme deny-list).
3. `src/utils/ai.ts` builds a relative URL like
   `/ai-image/<encoded-prompt>?width=720&height=720&safe=true&seed=<rand>`.
4. Vite (dev/preview) and Vercel (prod) rewrite that path server-side to
   `https://image.pollinations.ai/prompt/...`. This same-origin hop avoids
   the upstream Cloudflare Turnstile token requirement.
5. The result is rendered in an `<img>` and saved into the same Dexie
   library used by the build-mode toys.

If the AI API returns an error for a particular prompt+seed combo, the modal
silently retries with a fresh seed up to 3 times.

## ☁️ Deploying to Vercel

`vercel.json` already configures:

- SPA rewrites (everything except `assets/`, `sw.js`, etc. → `index.html`)
- The `/ai-image/*` rewrite to Pollinations
- Long-cache headers for hashed assets, no-cache for `sw.js`

```bash
vercel --prod
```

## 📜 License

MIT for the code. Bundled SVG assets in this repo are original / CC0.
AI-generated images are produced by [Pollinations.ai](https://pollinations.ai)
under their own terms.
