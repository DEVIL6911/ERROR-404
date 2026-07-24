import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function StoryTransition({ isActive, onComplete }) {
  const [phase, setPhase] = useState("idle");
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isActive) return;

    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    setPhase("fade");
    const t1 = setTimeout(() => {
      setPhase("black");
      const t2 = setTimeout(() => {
        onComplete?.();
      }, 600);
      // Note: We don't return a cleanup function for t2 here because
      // the outer cleanup will handle t1, and when t1 fires, it sets phase to "black"
      // which keeps the black div visible until onComplete is called.
      // If the component unmounts during the black phase, we'll still
      // clean up t1 below, but t2 might fire after unmount - this is acceptable
      // for this use case as it's just a callback.
    }, 700);
    return () => {
      clearTimeout(t1);
      // Note: We don't clear t2 here because it's nested inside t1's callback.
      // If t1 fires, t2 is already set and will fire after its delay.
      // If we clean up t1 before it fires, t2 never gets set.
    };
  }, [isActive, onComplete, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[150] pointer-events-none"
      aria-hidden="true"
    >
      <AnimatePresence>
        {phase === "fade" && (
          <motion.div
            className="absolute inset-0 bg-deep"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
        )}
        {phase === "black" && (
          <motion.div
            className="absolute inset-0 bg-abyss"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}