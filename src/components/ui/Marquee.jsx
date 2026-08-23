import { cn } from "../../lib/cn";
import { useReducedMotion } from "../../lib/hooks";
import styles from "./Marquee.module.css";

// Infinite horizontal ticker. Duplicates children for a seamless loop.
export default function Marquee({ items, reverse = false, className }) {
  const reduced = useReducedMotion();
  const track = (
    <ul className={styles.track} aria-hidden={!reduced}>
      {items.map((it, i) => (
        <li key={i} className={styles.item}>
          <span className={styles.dot} />
          {it}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn(styles.marquee, reverse && styles.reverse, className)}>
      <div className={cn(styles.viewport, reduced && styles.static)}>
        {track}
        {!reduced && (
          <ul className={styles.track} aria-hidden="true">
            {items.map((it, i) => (
              <li key={i} className={styles.item}>
                <span className={styles.dot} />
                {it}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
