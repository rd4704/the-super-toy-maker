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
    model: 'flux',
  });
  if (seed != null) params.set('seed', String(seed));
  return `${ENDPOINT}${encodeURIComponent(prompt)}?${params.toString()}`;
}

/**
 * Fetches the generated image and converts it to a data URL so it can be
 * stored in IndexedDB without re-hitting the network later.
 */
export async function generateAiToyImage(opts: AiImageOptions): Promise<string> {
  const url = buildAiImageUrl(opts);
  const res = await fetch(url, { mode: 'cors' });
  if (!res.ok) throw new Error(`Image service returned ${res.status}`);
  const blob = await res.blob();
  return await blobToDataUrl(blob);
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}
