# Bad Apple Renderer (FFmpeg WASM + React + Tailwind CSS + Vite)

A lightweight browser project that uses **FFmpeg WASM** to process video directly in the browser and render it as selectable character-art animation.
Built with **Vite**, **React**, **TypeScript**, **Tailwind CSS**, and the **ESM build** of FFmpeg for full compatibility.

No backend is required — everything (video decoding, frame extraction, and rendering) runs entirely client-side in the browser via WebAssembly.

---

## Features

- Runs FFmpeg entirely in the browser
- Extracts raw frames from video files
- Renders frames as character art with a **Character Set** picker (ASCII Classic, Dense Blocks, Minimal, Binary, Braille, Bread Mode 🍞, and the original Grayscale Hearts)
- Shows progress updates live in the UI

---

## Setup

```bash
npm install
npm run dev
```

Open the Vite dev server URL (usually `http://localhost:5173`).

---

## Deploying

This app is 100% static — any static host works. The one requirement is that the host must send these two response headers (already configured for local dev in `vite.config.ts`), because FFmpeg WASM needs `SharedArrayBuffer`:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Netlify, Vercel, and Cloudflare Pages all support custom headers via a config file. Plain GitHub Pages does **not** let you set custom response headers, so it won't work for this project as-is unless you put a CDN (e.g. Cloudflare) in front of it that injects those headers.

---

## FFmpeg Setup

This project loads FFmpeg from:

```
https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/
```

See [ffmpeg.wasm](https://ffmpegwasm.netlify.app/docs/overview) to learn more.

---

## Project Structure

```
src/
  main.tsx
  App.tsx
  index.css
  utils/
    charsets.ts          # single source of truth for every character-set preset
    ffmpegClient.ts
    frameUtils.ts
    videoToRaw.ts
    frameRenderer.ts
  components/
    VideoControls.tsx
    CharsetSelect.tsx
    ProgressBar.tsx
    OutputDisplay.tsx
  hooks/
    useVideoRenderer.ts # owns transcoding + playback + charset state

public/
  vite.svg

index.html
vite.config.ts
tsconfig.json
package.json
```

---

## Adding a new Character Set preset

Add one entry to `src/utils/charsets.ts` (and to `CHARSET_ORDER` if you want it in the dropdown) — the renderer and the dropdown both read from this single config, so nothing else needs to change:

```ts
export const CHARSETS: Record<CharsetId, CharsetPreset> = {
  // ...existing presets
  myPreset: { id: "myPreset", label: "My Preset", chars: "darkest-to-brightest-chars" },
};
```

---

## Usage

1. Select a video file
2. Pick a Character Set (defaults to ASCII Classic)
3. Press Play — FFmpeg loads, frames are extracted, and playback starts
4. Switch the Character Set at any time — the current frame re-renders immediately

---

## License

MIT
