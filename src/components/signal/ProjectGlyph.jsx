import { useMemo } from "react";
import { rng, seedWave, sampleSeedWave } from "../../lib/signal";
import { accent as accentOf } from "../../lib/accents";
import styles from "./ProjectGlyph.module.css";
import { cn } from "../../lib/cn";

// A deterministic generative plot unique to each project `seed`.
// Same seed → same glyph, every render. Colored by `accent`.
export default function ProjectGlyph({ seed, accent = "amber", animated = true, className }) {
  const a = accentOf(accent);

  const g = useMemo(() => {
    const r = rng(seed);
    const cfg = seedWave(seed);
    const W = 200;
    const H = 200;

    // Primary + secondary waveform paths sampled across the width.
    const line = (t, ampl) => {
      let d = "";
      for (let x = 0; x <= 1.0001; x += 0.02) {
        const y = sampleSeedWave(cfg, x, t, ampl);
        const px = x * W;
        const py = H / 2 - y * (H * 0.34);
        d += (x === 0 ? "M" : "L") + px.toFixed(1) + " " + py.toFixed(1) + " ";
      }
      return d.trim();
    };

    // Seeded scatter of "samples".
    const dots = Array.from({ length: 26 }, () => ({
      x: r() * W,
      y: r() * H,
      r: 0.6 + r() * 2.2,
    }));

    // Concentric arcs — a little radar target off to one side.
    const cx = 40 + r() * 30;
    const cy = 60 + r() * 80;
    const rings = [16, 30, 46, 62].map((rad) => ({ rad }));

    // Vertical readout ticks along the baseline.
    const ticks = Array.from({ length: 24 }, (_, i) => ({
      x: (i / 23) * W,
      h: 3 + (i % 4 === 0 ? 9 : 3) + r() * 3,
    }));

    return {
      W,
      H,
      primary: line(0.6, 1),
      secondary: line(2.4, 0.6),
      dots,
      cx,
      cy,
      rings,
      ticks,
    };
  }, [seed]);

  return (
    <svg
      className={cn(styles.glyph, animated && styles.animated, className)}
      viewBox={`0 0 ${g.W} ${g.H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Generative signal graphic"
      style={{ "--acc": a.color, "--acc-rgb": a.rgb }}
    >
      {/* faint frame grid */}
      <g className={styles.grid}>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={"h" + f} x1="0" x2={g.W} y1={g.H * f} y2={g.H * f} />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={"v" + f} y1="0" y2={g.H} x1={g.W * f} x2={g.W * f} />
        ))}
      </g>

      {/* radar rings */}
      <g className={styles.rings}>
        {g.rings.map((ring, i) => (
          <circle key={i} cx={g.cx} cy={g.cy} r={ring.rad} />
        ))}
        <circle className={styles.core} cx={g.cx} cy={g.cy} r="2.5" />
      </g>

      {/* baseline ticks */}
      <g className={styles.ticks}>
        {g.ticks.map((t, i) => (
          <line key={i} x1={t.x} x2={t.x} y1={g.H - 6} y2={g.H - 6 - t.h} />
        ))}
      </g>

      {/* scatter */}
      <g className={styles.dots}>
        {g.dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} />
        ))}
      </g>

      {/* waveforms */}
      <path className={styles.secondary} d={g.secondary} />
      <path className={styles.primary} d={g.primary} />

      {/* sweeping scan line */}
      <line className={styles.scan} x1="0" x2="0" y1="0" y2={g.H} />
    </svg>
  );
}
