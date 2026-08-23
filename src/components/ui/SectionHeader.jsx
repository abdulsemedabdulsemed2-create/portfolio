import Eyebrow from "./Eyebrow";
import ArrowLink from "./ArrowLink";
import styles from "./SectionHeader.module.css";

// Consistent section header: channel index + eyebrow + big title,
// with an optional action link on the right.
export default function SectionHeader({
  index,
  eyebrow,
  title,
  action,
  actionTo,
  accent,
}) {
  return (
    <header className={styles.head}>
      <div>
        <Eyebrow index={index} accent={accent}>
          {eyebrow}
        </Eyebrow>
        <h2 className={styles.title}>{title}</h2>
      </div>
      {action && (
        <ArrowLink to={actionTo} variant="line" className={styles.action}>
          {action}
        </ArrowLink>
      )}
    </header>
  );
}
