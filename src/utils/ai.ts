// Builds an image URL for Pollinations.ai — a free, no-key image API.
// We always wrap the user's toy name in a kid-safe prompt template so the
// model produces a friendly, cartoony toy regardless of the input noun.
//
// We hit the API through our own origin (`/ai-image/...`) which is rewritten
// to `image.pollinations.ai/prompt/...` by Vite (dev/preview) and Vercel
// (prod). This server-side hop strips the browser's cross-origin Referer
// header, avoiding Pollinations' Cloudflare Turnstile token requirement.

const ENDPOINT = '/ai-image/';

export interface AiImageOptions {
  toyName: string;
  size?: number;
  seed?: number;
}

export function buildAiImageUrl({ toyName, size = 720, seed }: AiImageOptions): string {
  const prompt =
    `a cute colorful toy named ${toyName}, pixar style, soft pastel colors, ` +
    `friendly face, plush, centered on a white background, kid safe, no text`;
  const params = new URLSearchParams({
    width: String(size),
    height: String(size),
    safe: 'true',
  });
  if (seed != null) params.set('seed', String(seed));
  return `${ENDPOINT}${encodeURIComponent(prompt)}?${params.toString()}`;
}
