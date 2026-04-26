// Kid-safety: very small allow/deny check for the toy name before sending
// it to an external image API. This is intentionally simple and does NOT
// guarantee safety — it just stops the most obvious abuse from a child's
// keyboard. Server-side moderation would be required for a real product.

const BANNED = [
  // English profanity / slurs (lowercase, partial-match safe)
  'fuck', 'shit', 'bitch', 'cunt', 'dick', 'cock', 'pussy', 'asshole',
  'bastard', 'damn', 'piss', 'whore', 'slut', 'fag', 'nigger', 'nigga',
  // Adult / unsafe themes
  'sex', 'porn', 'nude', 'naked', 'kill', 'murder', 'gun', 'blood', 'gore',
  'rape', 'drug', 'cocaine', 'heroin', 'weed', 'alcohol', 'beer', 'wine',
  'suicide', 'die', 'death', 'hate',
];

export interface SafetyResult {
  ok: boolean;
  reason?: string;
  cleaned: string;
}

export function checkToyName(input: string): SafetyResult {
  const cleaned = input.trim().replace(/\s+/g, ' ').slice(0, 40);

  if (cleaned.length < 2) {
    return { ok: false, reason: 'Please type a longer name.', cleaned };
  }

  const lower = cleaned.toLowerCase();
  const hit = BANNED.find((w) => lower.includes(w));
  if (hit) {
    return {
      ok: false,
      reason: 'That name has a word we can\'t use. Try something silly!',
      cleaned,
    };
  }

  // Block anything that's not letters / digits / spaces / a few harmless symbols
  if (!/^[\p{L}\p{N} '\-!?.]+$/u.test(cleaned)) {
    return {
      ok: false,
      reason: 'Please use only letters, numbers and spaces.',
      cleaned,
    };
  }

  return { ok: true, cleaned };
}
