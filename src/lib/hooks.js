import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// ── Reduced motion, as a live-updating boolean ──────────────────
const RM_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeRM(cb) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getRM() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(RM_QUERY).matches;
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribeRM, getRM, () => false);
}

// ── Generic media query hook ────────────────────────────────────
export function useMediaQuery(query) {
  const subscribe = (cb) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
  const get = () => window.matchMedia(query).matches;
  return useSyncExternalStore(subscribe, get, () => false);
}

// ── Live clock in a given IANA timezone ─────────────────────────
export function useClock(timeZone = "America/Los_Angeles") {
  const [time, setTime] = useState(() => formatTime(timeZone));
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(timeZone)), 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

function formatTime(timeZone) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "--:--:--";
  }
}

// ── Element in-view, once. Returns [ref, inView] ────────────────
export function useInView(options = {}) {
  const { amount = 0.25, once = true } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount, once]);

  return [ref, inView];
}
