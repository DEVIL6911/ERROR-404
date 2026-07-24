import { useRef, useState, useEffect, Suspense, lazy } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import OceanParticles from "../OceanParticles";

const CoralFragment = lazy(() => import("./CoralFragment"));

function CoralSkeleton() {
  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-ocean/20 animate-pulse" />
    </div>
  );
}

export default function LandingHero({ onStartStory }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef(null);

  const handleStart = async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (prefersReducedMotion) {
      onStartStory();
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
    onStartStory();
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden"
      data-section="hero"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a6e] via-[#04344a] to-[#021018] z-0" />
        <div className="absolute inset-0 z-[2] pointer-events-none opacity-85 mix-blend-screen">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,220,0.06) 45%, transparent 50%), linear-gradient(95deg, transparent 55%, rgba(180,240,255,0.05) 60%, transparent 68%)",
              backgroundSize: "200% 100%",
              animation: "rays 14s ease-in-out infinite alternate",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      <Suspense fallback={<CoralSkeleton />}>
        <CoralFragment />
      </Suspense>
      <OceanParticles />

      <div className="relative z-10 max-w-[720px] w-full text-center px-6 py-20">
        <motion.p
          className="eyebrow text-aqua"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          One Reef · One Voice
        </motion.p>
        <motion.h1
          className="headline text-[#f7fcff] mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          THE OCEAN&apos;S STORY ISN&apos;T OVER.
        </motion.h1>
        <motion.p
          className="subhead text-muted max-w-[36rem] mx-auto mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Every reef has a story. Some are fading. Some are fighting to survive. And some are waiting for someone to act.
        </motion.p>
        <motion.p
          className="body-copy text-mist max-w-[28rem] mx-auto mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          Enter the story of Kai, a young marine explorer who discovers that the ocean can still heal — but it cannot save itself.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <button
            onClick={handleStart}
            disabled={isTransitioning}
            className="btn btn-primary btn-large text-deep font-semibold disabled:opacity-50"
          >
            {isTransitioning ? "Entering..." : "START THE STORY →"}
          </button>
          <button
            onClick={() => document.getElementById("action")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-ghost"
          >
            EXPLORE OUR MISSION
          </button>
        </motion.div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
