import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function StoryTransition({ isActive, onComplete }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isActive) return;

    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const t = setTimeout(() => {
      onComplete?.();
    }, 200);

    return () => clearTimeout(t);
  }, [isActive, onComplete, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[150] pointer-events-none bg-[#050B14]"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        />
      )}
    </AnimatePresence>
  );
}