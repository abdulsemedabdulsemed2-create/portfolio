import { profile } from "../../data/profile";
import CountUp from "../ui/CountUp";
import styles from "./StatsStrip.module.css";

export default function StatsStrip() {
  return (
    <section className={styles.strip} aria-label="By the numbers">
      {profile.stats.map((s, i) => (
        <div className={styles.stat} key={s.label}>
          <span className={styles.idx}>0{i + 1}</span>
          <span className={styles.value}>
            <CountUp value={s.value} suffix={s.suffix} />
          </span>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </section>
  );
}
