import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useInView } from "../../lib/hooks";

// Counts from 0 to `value` when scrolled into view.
export default function CountUp({ value, duration = 1400, suffix = "", className }) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView({ amount: 0.5 });
  const [display, setDisplay] = useState(reduced ? value : 0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
