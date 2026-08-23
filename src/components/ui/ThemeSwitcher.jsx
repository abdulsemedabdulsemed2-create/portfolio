import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import styles from "./ThemeSwitcher.module.css";

// Palettes are defined in index.css under [data-theme="…"].
// `dot` / `bg` are just preview swatches for this control.
const THEMES = [
  { id: "paper", label: "Paper", note: "warm cream", bg: "#f3ece0", dot: "#c25a37" },
  { id: "sand", label: "Sand", note: "sunset", bg: "#f6ecdd", dot: "#d5822f" },
  { id: "sage", label: "Sage", note: "botanical", bg: "#edefe4", dot: "#3f6b3a" },
  { id: "dusk", label: "Dusk", note: "warm dark", bg: "#191410", dot: "#e8a23c" },
];

const STORAGE_KEY = "portfolio-theme";
const DEFAULT = "paper";

function applyTheme(id) {
  document.documentElement.dataset.theme = id;
  window.dispatchEvent(new Event("themechange"));
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(DEFAULT);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = THEMES.some((t) => t.id === stored) ? stored : DEFAULT;
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (id) => {
    setTheme(id);
    applyTheme(id);
    localStorage.setItem(STORAGE_KEY, id);
    setOpen(false);
  };

  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div className={styles.root} ref={ref}>
      <div className={cn(styles.panel, open && styles.panelOpen)} role="menu" aria-label="Color themes">
        {THEMES.map((t) => (
          <button
            key={t.id}
            role="menuitemradio"
            aria-checked={t.id === theme}
            className={cn(styles.item, t.id === theme && styles.itemActive)}
            onClick={() => choose(t.id)}
          >
            <span
              className={styles.swatch}
              style={{ background: t.bg, borderColor: t.dot }}
            >
              <span className={styles.swatchDot} style={{ background: t.dot }} />
            </span>
            <span className={styles.itemText}>
              <span className={styles.itemLabel}>{t.label}</span>
              <span className={styles.itemNote}>{t.note}</span>
            </span>
          </button>
        ))}
      </div>

      <button
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Change color theme (current: ${active.label})`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.triggerDot} style={{ background: active.dot }} />
        <span className={styles.triggerLabel}>{active.label}</span>
      </button>
    </div>
  );
}
