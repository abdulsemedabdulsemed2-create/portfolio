import SignalCanvas from "./SignalCanvas";
import styles from "./SignalField.module.css";

// Ambient, site-wide waveform anchored to the bottom of the viewport.
// Sits behind all page content (below the .shell z-index).
export default function SignalField() {
  return (
    <div className={styles.field} aria-hidden="true">
      <SignalCanvas
        color="#2f3f63"
        amp={0.6}
        lineWidth={1}
        opacity={0.55}
        lines={2}
      />
    </div>
  );
}
