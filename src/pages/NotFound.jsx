import { Link } from "react-router-dom";
import SignalCanvas from "../components/signal/SignalCanvas";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className="page">
      <section className={styles.wrap}>
        <div className={styles.signal} aria-hidden="true">
          <SignalCanvas color="#ff5c38" amp={0.4} lineWidth={1.5} lines={2} glow={6} />
        </div>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Signal lost</h1>
        <p className={styles.text}>
          This channel isn&apos;t transmitting. The page may have moved, or never
          existed on this frequency.
        </p>
        <Link to="/" viewTransition className={styles.home}>
          ← Return to base frequency
        </Link>
      </section>
    </div>
  );
}
