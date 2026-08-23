import { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useReducedMotion } from "../../lib/hooks";
import { cn } from "../../lib/cn";
import styles from "./Hero.module.css";

const lineVariants = {
  rest: {},
  play: { transition: { staggerChildren: 0.045 } },
};

// Each letter springs up and settles — a wave passing through the name.
const letterVariants = {
  rest: { y: 0, rotate: 0, scale: 1 },
  play: {
    y: [0, -48, 0],
    rotate: [0, -9, 0],
    scale: [1, 1.14, 1],
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

function Letters({ text }) {
  return [...text].map((ch, i) => (
    <motion.span
      key={`${ch}-${i}`}
      className={styles.char}
      variants={letterVariants}
    >
      {ch}
    </motion.span>
  ));
}

export default function NameSignature({ first, last }) {
  const reduced = useReducedMotion();
  const top = useAnimationControls();
  const bottom = useAnimationControls();
  const [filled, setFilled] = useState(false);
  const [busy, setBusy] = useState(false);

  const play = async () => {
    if (reduced || busy) return;
    setBusy(true);
    setFilled(true);
    top.start("play");
    await bottom.start("play");
    setFilled(false);
    setBusy(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      play();
    }
  };

  return (
    <h1 className={styles.name}>
      <span
        className={styles.nameHit}
        role="button"
        tabIndex={0}
        aria-label={`${first} ${last} — activate the name animation`}
        onClick={play}
        onKeyDown={onKeyDown}
      >
        <motion.span
          className={styles.line}
          variants={lineVariants}
          initial="rest"
          animate={top}
        >
          <Letters text={first} />
        </motion.span>
        <motion.span
          className={cn(styles.lineAlt, filled && styles.lineAltFill)}
          variants={lineVariants}
          initial="rest"
          animate={bottom}
        >
          <Letters text={last} />
        </motion.span>
      </span>
      <span className={styles.nameHint} aria-hidden="true">
        click my name
      </span>
    </h1>
  );
}
