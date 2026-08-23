import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../../data/profile";
import { useReducedMotion } from "../../lib/hooks";
import SignalCanvas from "../signal/SignalCanvas";
import ArrowLink from "../ui/ArrowLink";
import Eyebrow from "../ui/Eyebrow";
import NameSignature from "./NameSignature";
import styles from "./Hero.module.css";

function RotatingRole() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setI((v) => (v + 1) % profile.roles.length),
      2600,
    );
    return () => clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return <span className={styles.role}>{profile.roles[0]}</span>;
  }

  return (
    <span className={styles.roleWrap} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          className={styles.role}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const [first, last] = profile.name.split(" ");

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.topline}>
        <Eyebrow accent="var(--mint)">{profile.availableLabel}</Eyebrow>
        <span className={styles.status}>{profile.status}</span>
      </div>

      <div className={styles.stage}>
        <div className={styles.signalBand} aria-hidden="true">
          <SignalCanvas
            colorVar="--signal"
            amp={1}
            lineWidth={2}
            glow={10}
            lines={2}
            interactive
          />
        </div>

        <NameSignature first={first} last={last} />

        <div className={styles.roleRow}>
          <span className={styles.roleLabel}>// currently operating as</span>
          <RotatingRole />
        </div>
      </div>

      <div className={styles.foot}>
        <p className={styles.intro}>{profile.intro}</p>
        <div className={styles.actions}>
          <ArrowLink to="/projects" variant="solid">
            View the work
          </ArrowLink>
          <ArrowLink to="/resume" variant="line">
            Résumé
          </ArrowLink>
          <ArrowLink href={`mailto:${profile.email}`} variant="ghost">
            Get in touch
          </ArrowLink>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>SCROLL</span>
        <span className={styles.scrollBar} />
      </div>
    </section>
  );
}
