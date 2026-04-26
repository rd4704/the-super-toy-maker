import { ASSETS, type AssetCategory } from '../assets/catalog';
import { useMachine } from '../state/machine';

const ADJECTIVES = [
  'Super', 'Mega', 'Wibbly', 'Wobbly', 'Sparkly', 'Bouncy', 'Zappy', 'Fluffy',
  'Giggly', 'Glittery', 'Turbo', 'Galactic', 'Disco', 'Cosmic', 'Funky', 'Mighty',
  'Squishy', 'Zany', 'Jolly', 'Silly', 'Wonder', 'Happy', 'Crunchy', 'Pixel',
];

const NOUNS = [
  'Bot', 'Buddy', 'Pal', 'Wiggler', 'Zapper', 'Muncher', 'Critter', 'Roller',
  'Flapper', 'Hopper', 'Sprout', 'Bunny', 'Beast', 'Blob', 'Nugget', 'Pop',
  'Twirl', 'Doodle', 'Whirly', 'Boop', 'Kazoo', 'Cupcake', 'Donut', 'Star',
];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomAsset(category: AssetCategory) {
  const pool = ASSETS.filter((a) => a.category === category);
  if (!pool.length) return null;
  return rand(pool);
}

function maybe<T>(value: T, chance: number): T | null {
  return Math.random() < chance ? value : null;
}

export function makeRandomName(): string {
  return `${rand(ADJECTIVES)} ${rand(NOUNS)}`;
}

/**
 * Builds a random goofy toy: clears the machine, drops a body, head, eyes,
 * and a random sprinkle of wheels/wings/extras/yummy at sensible positions.
 */
export function buildSurpriseToy() {
  const { clear, addPart, updatePart, setToyName } = useMachine.getState();
  clear();

  // Body in the middle
  const body = pickRandomAsset('body');
  if (body) {
    const id = addPart(body.id, 0.5, 0.55);
    updatePart(id, { scale: 1 + Math.random() * 0.3, rotation: (Math.random() - 0.5) * 10 });
  }

  // Head above
  const head = pickRandomAsset('head');
  if (head) {
    const id = addPart(head.id, 0.5, 0.25);
    updatePart(id, { scale: 0.9 + Math.random() * 0.3, rotation: (Math.random() - 0.5) * 14 });
  }

  // Eyes near the head
  const eyes = maybe(pickRandomAsset('eyes'), 0.7);
  if (eyes) {
    const id = addPart(eyes.id, 0.5, 0.22);
    updatePart(id, { scale: 0.8 + Math.random() * 0.3 });
  }

  // Wheels at the bottom (often two)
  const wheels = maybe(pickRandomAsset('wheels'), 0.85);
  if (wheels) {
    const id1 = addPart(wheels.id, 0.32, 0.85);
    updatePart(id1, { scale: 0.9 + Math.random() * 0.3 });
    const id2 = addPart(wheels.id, 0.68, 0.85);
    updatePart(id2, { scale: 0.9 + Math.random() * 0.3 });
  }

  // Wings on the sides (sometimes)
  const wings = maybe(pickRandomAsset('wings'), 0.4);
  if (wings) {
    const id = addPart(wings.id, 0.5, 0.55);
    updatePart(id, { scale: 0.9 + Math.random() * 0.4 });
  }

  // 1–2 fun extras in random spots
  const sprinkleCount = 1 + Math.floor(Math.random() * 2);
  for (let i = 0; i < sprinkleCount; i++) {
    const item = pickRandomAsset('extra');
    if (!item) continue;
    const x = 0.2 + Math.random() * 0.6;
    const y = 0.15 + Math.random() * 0.7;
    const id = addPart(item.id, x, y);
    updatePart(id, {
      scale: 0.6 + Math.random() * 0.5,
      rotation: (Math.random() - 0.5) * 60,
    });
  }

  setToyName(makeRandomName());
}
