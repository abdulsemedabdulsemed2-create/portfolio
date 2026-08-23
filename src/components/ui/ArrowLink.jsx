import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";
import styles from "./ArrowLink.module.css";

// A link with a sliding arrow. Internal routes use react-router's
// viewTransition; pass `href` for external links (opens new tab).
export default function ArrowLink({ to, href, children, variant = "line", className, ...rest }) {
  const cls = cn(styles.link, styles[variant], className);
  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </>
  );

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} to={to} viewTransition {...rest}>
      {inner}
    </Link>
  );
}
