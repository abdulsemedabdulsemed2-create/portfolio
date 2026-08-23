import { socials } from "../../data/socials";
import { profile } from "../../data/profile";
import { nav } from "../../data/site";
import { Link } from "react-router-dom";
import ArrowLink from "../ui/ArrowLink";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.cta}>
          <p className={styles.ctaLabel}>// let&apos;s build something</p>
          <a className={styles.email} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>

        <nav className={styles.cols} aria-label="Footer">
          <div className={styles.col}>
            <span className={styles.colHead}>Index</span>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={styles.colLink} viewTransition>
                <span className={styles.colIdx}>{n.id}</span>
                {n.label}
              </Link>
            ))}
          </div>
          <div className={styles.col}>
            <span className={styles.colHead}>Channels</span>
            {socials.map((s) => (
              <ArrowLink key={s.key} href={s.url} variant="line" className={styles.social}>
                {s.label}
              </ArrowLink>
            ))}
          </div>
        </nav>
      </div>

      <div className={styles.bar}>
        <span>
          © {year} {profile.name}
        </span>
        <span className={styles.built}>
          Built with React · deployed on the edge · no templates were harmed
        </span>
        <span className={styles.sig}>{profile.handle}</span>
      </div>
    </footer>
  );
}
