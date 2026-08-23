import { cn } from "../../lib/cn";
import styles from "./Eyebrow.module.css";

// A mono section label with an optional channel index and a leading tick.
export default function Eyebrow({ index, children, accent, className }) {
  return (
    <span className={cn(styles.eyebrow, className)} style={accent ? { "--tick": accent } : undefined}>
      <span className={styles.tick} aria-hidden="true" />
      {index != null && <span className={styles.index}>{index}</span>}
      <span className={styles.text}>{children}</span>
    </span>
  );
}
