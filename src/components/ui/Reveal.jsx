import { motion } from "framer-motion";
import { useReducedMotion } from "../../lib/hooks";

// Scroll-triggered reveal. Slides up + fades once in view.
// Respects reduced motion (renders statically).
export default function Reveal({ children, delay = 0, y = 24, as = "div", className }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
