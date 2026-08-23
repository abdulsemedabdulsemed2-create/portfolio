import { useEffect, useRef } from "react";
import { wave } from "../../lib/signal";
import { useReducedMotion } from "../../lib/hooks";

// Reusable oscilloscope. Fills its positioned parent (inset:0).
// The parent owns size + placement; this only draws.
export default function SignalCanvas({
  color = "#c25a37",
  colorVar,
  amp = 1,
  lineWidth = 1.5,
  opacity = 1,
  glow = 0,
  lines = 1,
  interactive = false,
  className,
}) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();
  const pointer = useRef({ x: -1, y: 0.5, active: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rafRef = { current: 0 };

    // Resolve the stroke colour from a CSS variable when given, so the
    // waveform re-tints whenever the active palette changes.
    const strokeRef = { current: color };
    const readColor = () => {
      if (colorVar) {
        const v = getComputedStyle(document.documentElement)
          .getPropertyValue(colorVar)
          .trim();
        strokeRef.current = v || color;
      } else {
        strokeRef.current = color;
      }
    };
    readColor();
    window.addEventListener("themechange", readColor);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      const stroke = strokeRef.current;
      const p = pointer.current;
      p.active += ((p.x >= 0 ? 1 : 0) - p.active) * 0.06;

      for (let li = 0; li < lines; li++) {
        const layerAmp = amp * (1 - li * 0.32);
        const layerOpacity = opacity * (1 - li * 0.5);
        ctx.beginPath();
        const step = 2;
        for (let px = 0; px <= w; px += step) {
          const x = px / w;
          let y = wave(x, time - li * 0.35, layerAmp);
          if (interactive && p.x >= 0) {
            const d = Math.abs(x - p.x);
            y += Math.exp(-Math.pow(d * 9, 2)) * (p.y - 0.5) * 2.2 * p.active;
          }
          const yPix = h / 2 - y * (h / 2) * 0.7;
          if (px === 0) ctx.moveTo(px, yPix);
          else ctx.lineTo(px, yPix);
        }
        ctx.strokeStyle = stroke;
        ctx.globalAlpha = layerOpacity;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";
        if (glow > 0) {
          ctx.shadowColor = stroke;
          ctx.shadowBlur = glow;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    };

    if (reduced) draw(0);
    else rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("themechange", readColor);
    };
  }, [color, colorVar, amp, lineWidth, opacity, glow, lines, interactive, reduced]);

  const onMove = (e) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointer.current.x = (e.clientX - rect.left) / rect.width;
    pointer.current.y = (e.clientY - rect.top) / rect.height;
  };
  const onLeave = () => {
    pointer.current.x = -1;
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      onPointerMove={interactive ? onMove : undefined}
      onPointerLeave={interactive ? onLeave : undefined}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: interactive ? "auto" : "none",
      }}
    />
  );
}
