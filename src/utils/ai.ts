// Generates a toy image via Pollinations.ai — a free, no-key image API.
// We always wrap the user's toy name in a kid-safe prompt template so the
// model produces a friendly, cartoony toy regardless of the input noun.

const ENDPOINT = 'https://image.pollinations.ai/prompt/';

export interface AiImageOptions {
  toyName: string;
  size?: number;
  seed?: number;
}

export function buildAiImageUrl({ toyName, size = 720, seed }: AiImageOptions): string {
  const prompt =
    `a cute colorful toy named "${toyName}", pixar style, soft pastel colors, ` +
    `friendly face, plush, centered, white background, kid-safe, no text`;
  const params = new URLSearchParams({
    width: String(size),
    height: String(size),
    nologo: 'true',
    safe: 'true',
  });
  if (seed != null) params.set('seed', String(seed));
  return `${ENDPOINT}${encodeURIComponent(prompt)}?${params.toString()}`;
}

export interface AiImageResult {
  /** Either a data: URL (canvas conversion succeeded) or the original https URL. */
  src: string;
  /** True when we got a usable PNG data URL we can persist offline. */
  embedded: boolean;
}

/**
 * Loads the generated image via an <img> element (which sends browser-friendly
 * headers and avoids the 403 that direct fetch sometimes hits) and tries to
 * convert it to a PNG data URL via canvas. Falls back to returning the raw
 * URL if the canvas is tainted (CORS denied).
 */
export async function generateAiToyImage(opts: AiImageOptions): Promise<AiImageResult> {
  const url = buildAiImageUrl(opts);
  const img = await loadImage(url);
  const size = opts.size ?? 720;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unavailable');
    ctx.drawImage(img, 0, 0, size, size);
    return { src: canvas.toDataURL('image/png'), embedded: true };
  } catch {
    return { src: url, embedded: false };
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = src;
  });
}
