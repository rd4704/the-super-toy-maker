import { Howl, Howler } from 'howler';

/**
 * All sounds are procedurally synthesized into WAV data URLs.
 * No network, no files needed — works fully offline.
 */

type WaveType = 'sine' | 'square' | 'triangle' | 'saw';

interface ToneOptions {
  freqStart: number;
  freqEnd?: number;
  duration: number;
  volume?: number;
  wave?: WaveType;
  vibrato?: { rate: number; depth: number };
  attack?: number; // seconds
  decay?: number; // seconds (release)
}

const SAMPLE_RATE = 22050;

function waveSample(type: WaveType, phase: number): number {
  switch (type) {
    case 'sine':
      return Math.sin(2 * Math.PI * phase);
    case 'square':
      return Math.sin(2 * Math.PI * phase) > 0 ? 1 : -1;
    case 'triangle':
      return 2 * Math.abs(2 * (phase - Math.floor(phase + 0.5))) - 1;
    case 'saw':
      return 2 * (phase - Math.floor(phase + 0.5));
  }
}

function buildWav(samples: Float32Array): string {
  const length = samples.length;
  const buffer = new ArrayBuffer(44 + length * 2);
  const view = new DataView(buffer);
  const writeStr = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i));
  };
  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + length * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, 'data');
  view.setUint32(40, length * 2, true);

  for (let i = 0; i < length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s * 0x7fff, true);
  }

  const bytes = new Uint8Array(buffer);
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return 'data:audio/wav;base64,' + btoa(bin);
}

function renderTone(opts: ToneOptions, out: Float32Array, offset = 0) {
  const {
    freqStart,
    freqEnd = freqStart,
    duration,
    volume = 0.4,
    wave = 'sine',
    vibrato,
    attack = 0.005,
    decay = 0.05,
  } = opts;
  const partLen = Math.floor(SAMPLE_RATE * duration);
  let phase = 0;
  for (let i = 0; i < partLen; i++) {
    const t = i / SAMPLE_RATE;
    const progress = duration > 0 ? t / duration : 0;
    const baseFreq = freqStart + (freqEnd - freqStart) * progress;
    const f = vibrato ? baseFreq * (1 + vibrato.depth * Math.sin(2 * Math.PI * vibrato.rate * t)) : baseFreq;
    phase += f / SAMPLE_RATE;
    const env =
      t < attack
        ? t / attack
        : t > duration - decay
          ? Math.max(0, (duration - t) / decay)
          : 1;
    const idx = offset + i;
    if (idx < out.length) out[idx] += waveSample(wave, phase) * env * volume;
  }
}

function makeTone(opts: ToneOptions): string {
  const length = Math.floor(SAMPLE_RATE * opts.duration);
  const out = new Float32Array(length);
  renderTone(opts, out);
  return buildWav(out);
}

function mixTones(parts: ToneOptions[]): string {
  const totalDuration = Math.max(...parts.map((p) => p.duration));
  const length = Math.floor(SAMPLE_RATE * totalDuration);
  const out = new Float32Array(length);
  for (const p of parts) renderTone(p, out);
  // Soft normalize
  let peak = 0;
  for (let i = 0; i < out.length; i++) peak = Math.max(peak, Math.abs(out[i]));
  if (peak > 0.95) {
    const inv = 0.95 / peak;
    for (let i = 0; i < out.length; i++) out[i] *= inv;
  }
  return buildWav(out);
}

function makeSequence(notes: ToneOptions[], gap = 0.0): string {
  const total = notes.reduce((s, n) => s + n.duration, 0) + gap * Math.max(0, notes.length - 1);
  const length = Math.floor(SAMPLE_RATE * total);
  const out = new Float32Array(length);
  let cursor = 0;
  for (const n of notes) {
    renderTone(n, out, cursor);
    cursor += Math.floor(SAMPLE_RATE * (n.duration + gap));
  }
  return buildWav(out);
}

function noiseBurst(duration: number, volume = 0.4): string {
  const length = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.max(0, 1 - t / duration);
    out[i] = (Math.random() * 2 - 1) * env * volume;
  }
  return buildWav(out);
}

// ---------- Sound library ----------

const cache: Record<string, Howl> = {};
let muted = false;
let bgMusic: Howl | null = null;

function get(name: string, build: () => { src: string; volume?: number; loop?: boolean }): Howl {
  if (!cache[name]) {
    const cfg = build();
    cache[name] = new Howl({
      src: [cfg.src],
      volume: cfg.volume ?? 0.5,
      loop: cfg.loop ?? false,
    });
  }
  return cache[name];
}

function play(name: string, build: () => { src: string; volume?: number }) {
  if (muted) return;
  get(name, build).play();
}

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const sounds = {
  pop: () =>
    play(rand(['pop1', 'pop2', 'pop3']), () => ({
      src: makeTone({
        freqStart: rand([520, 660, 740, 830]),
        freqEnd: rand([880, 1100, 1320]),
        duration: 0.08,
        wave: 'sine',
        volume: 0.35,
      }),
    })),

  pickup: () =>
    play(rand(['pick1', 'pick2', 'pick3']), () => ({
      src: makeTone({
        freqStart: 440,
        freqEnd: rand([880, 990, 1100]),
        duration: 0.12,
        wave: 'triangle',
        volume: 0.35,
      }),
    })),

  drop: () =>
    play(rand(['drop1', 'drop2', 'drop3']), () => ({
      src: mixTones([
        { freqStart: 660, freqEnd: 220, duration: 0.18, wave: 'triangle', volume: 0.35 },
        { freqStart: 130, freqEnd: 80, duration: 0.18, wave: 'sine', volume: 0.4 },
      ]),
    })),

  // Silly cartoon "boing"
  boing: () =>
    play('boing', () => ({
      src: makeTone({
        freqStart: 220,
        freqEnd: 660,
        duration: 0.32,
        wave: 'sine',
        vibrato: { rate: 18, depth: 0.18 },
        volume: 0.4,
        attack: 0.005,
        decay: 0.18,
      }),
    })),

  // Rising slide-whistle "wee!"
  wee: () =>
    play('wee', () => ({
      src: makeTone({
        freqStart: 300,
        freqEnd: 1500,
        duration: 0.45,
        wave: 'sine',
        volume: 0.35,
        attack: 0.02,
        decay: 0.06,
      }),
    })),

  // Bubble pop
  bloop: () =>
    play(rand(['bloop1', 'bloop2']), () => ({
      src: makeTone({
        freqStart: rand([300, 380, 500]),
        freqEnd: rand([100, 140, 180]),
        duration: 0.16,
        wave: 'sine',
        volume: 0.4,
      }),
    })),

  // Quick chirpy giggle
  giggle: () =>
    play('giggle', () => ({
      src: makeSequence(
        [
          { freqStart: 800, freqEnd: 900, duration: 0.07, wave: 'triangle', volume: 0.35 },
          { freqStart: 1000, freqEnd: 1100, duration: 0.07, wave: 'triangle', volume: 0.35 },
          { freqStart: 900, freqEnd: 800, duration: 0.07, wave: 'triangle', volume: 0.35 },
          { freqStart: 1200, freqEnd: 1400, duration: 0.1, wave: 'triangle', volume: 0.35 },
        ],
        0.02,
      ),
    })),

  whirr: () => {
    if (muted) return;
    const h = get('whirr', () => ({
      src: mixTones([
        { freqStart: 140, freqEnd: 220, duration: 1.4, wave: 'saw', volume: 0.18 },
        { freqStart: 280, freqEnd: 440, duration: 1.4, wave: 'square', volume: 0.1 },
      ]),
      volume: 0.4,
    }));
    h.play();
  },

  ding: () =>
    play('ding', () => ({
      src: mixTones([
        { freqStart: 1320, duration: 0.45, wave: 'sine', volume: 0.4, decay: 0.4 },
        { freqStart: 1980, duration: 0.45, wave: 'sine', volume: 0.2, decay: 0.4 },
      ]),
    })),

  // Big celebratory "tada!"
  tada: () =>
    play('tada', () => ({
      src: makeSequence(
        [
          { freqStart: 523, duration: 0.08, wave: 'square', volume: 0.3 },
          { freqStart: 659, duration: 0.08, wave: 'square', volume: 0.3 },
          { freqStart: 784, duration: 0.08, wave: 'square', volume: 0.3 },
          { freqStart: 1046, duration: 0.45, wave: 'square', volume: 0.35, decay: 0.3 },
        ],
        0.02,
      ),
    })),

  sparkle: () =>
    play('sparkle', () => ({
      src: makeSequence(
        [
          { freqStart: 1760, duration: 0.06, wave: 'triangle', volume: 0.3 },
          { freqStart: 2200, duration: 0.06, wave: 'triangle', volume: 0.3 },
          { freqStart: 2640, duration: 0.1, wave: 'triangle', volume: 0.3 },
        ],
        0.01,
      ),
    })),

  // Silly raspberry-ish delete
  delete: () =>
    play('delete', () => ({
      src: mixTones([
        { freqStart: 220, freqEnd: 110, duration: 0.22, wave: 'saw', volume: 0.3 },
        { freqStart: 110, freqEnd: 60, duration: 0.22, wave: 'square', volume: 0.25 },
      ]),
    })),

  click: () =>
    play(rand(['click1', 'click2']), () => ({
      src: noiseBurst(0.04, 0.25),
    })),

  // Background music — cheerful pentatonic loop
  startMusic: () => {
    if (bgMusic) return;
    const beat = 0.18;
    const N = (f: number, d = 1, vol = 0.16, wave: WaveType = 'triangle'): ToneOptions => ({
      freqStart: f,
      duration: beat * d,
      wave,
      volume: vol,
      attack: 0.01,
      decay: 0.05,
    });
    const R = (d = 1): ToneOptions => ({
      freqStart: 0,
      duration: beat * d,
      wave: 'sine',
      volume: 0,
    });
    const melody = [
      N(523), N(659), N(784), N(659), N(523, 2), R(1),
      N(587), N(784), N(880), N(784), N(587, 2), R(1),
      N(523), N(784), N(1046), N(784), N(659, 2), R(1),
      N(659), N(587), N(523, 2), R(2),
    ];
    const src = makeSequence(melody, 0.01);
    bgMusic = new Howl({ src: [src], volume: 0.18, loop: true });
    if (!muted) bgMusic.play();
  },

  stopMusic: () => {
    if (bgMusic) {
      bgMusic.stop();
      bgMusic.unload();
      bgMusic = null;
    }
  },

  setMuted: (v: boolean) => {
    muted = v;
    Howler.mute(v);
  },

  isMuted: () => muted,
};
