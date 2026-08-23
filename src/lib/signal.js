// ─────────────────────────────────────────────────────────────
//  Signal math — deterministic waveform + generative geometry.
//  Shared by the ambient SignalCanvas and per-project ProjectGlyph.
// ─────────────────────────────────────────────────────────────

// Mulberry32 — small, fast, seeded PRNG.
export function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A composite oscilloscope wave: sum of a few harmonics + a moving
// pulse. `t` is time (seconds), `x` is 0..1 across the width.
export function wave(x, t, amp = 1) {
  const a = Math.sin(x * 6.2831 * 1.5 + t * 1.1);
  const b = 0.5 * Math.sin(x * 6.2831 * 3.1 - t * 1.7);
  const c = 0.25 * Math.sin(x * 6.2831 * 6.3 + t * 2.6);
  // travelling gaussian "packet"
  const px = (t * 0.12) % 1.4 - 0.2;
  const packet = Math.exp(-Math.pow((x - px) * 7, 2)) * Math.sin(x * 60 + t * 8);
  return (a + b + c) * 0.28 * amp + packet * 0.4 * amp;
}

// Build a project-specific waveform config from its seed, so every
// project gets a recognizable, stable signature.
export function seedWave(seed) {
  const r = rng(seed);
  const harmonics = Array.from({ length: 3 }, () => ({
    freq: 1 + Math.floor(r() * 6),
    amp: 0.15 + r() * 0.55,
    phase: r() * 6.2831,
    speed: 0.4 + r() * 2.2,
  }));
  return {
    harmonics,
    density: 0.6 + r() * 0.9,
    jitter: r() * 0.4,
  };
}

// Sample a seeded waveform at position x (0..1) and time t.
export function sampleSeedWave(cfg, x, t, amp = 1) {
  let y = 0;
  for (const h of cfg.harmonics) {
    y += h.amp * Math.sin(x * 6.2831 * h.freq + h.phase + t * h.speed);
  }
  return y * 0.5 * amp;
}
