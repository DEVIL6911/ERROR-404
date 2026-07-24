import { motion } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function SeaCreature() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      <motion.div
        className="absolute top-[35%] -left-[300px] text-[rgba(94,234,212,0.15)] drop-shadow-[0_0_20px_rgba(94,234,212,0.3)] mix-blend-screen scale-[0.6] sm:scale-100 origin-center"
        initial={{ x: "-30vw", y: 0, rotate: 10 }}
        animate={{
          x: "115vw",
          y: [-30, 40, -15, 25, -30],
          rotate: [10, 15, 5, 12, 10],
        }}
        transition={{
          duration: 40,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <svg
          width="400"
          height="260"
          viewBox="0 0 400 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized Manta Ray Body */}
          <motion.path
            d="M 200 40 C 260 20, 320 60, 370 120 C 380 140, 360 160, 320 150 C 260 110, 230 160, 200 200 C 170 160, 140 110, 80 150 C 40 160, 20 140, 30 120 C 80 60, 140 20, 200 40 Z"
            fill="currentColor"
            animate={{
              d: [
                "M 200 40 C 260 20, 320 60, 370 120 C 380 140, 360 160, 320 150 C 260 110, 230 160, 200 200 C 170 160, 140 110, 80 150 C 40 160, 20 140, 30 120 C 80 60, 140 20, 200 40 Z",
                "M 200 50 C 240 40, 340 80, 360 130 C 370 150, 350 150, 310 130 C 240 70, 220 180, 200 210 C 180 180, 160 70, 90 130 C 50 150, 30 150, 40 130 C 60 80, 160 40, 200 50 Z",
                "M 200 40 C 260 20, 320 60, 370 120 C 380 140, 360 160, 320 150 C 260 110, 230 160, 200 200 C 170 160, 140 110, 80 150 C 40 160, 20 140, 30 120 C 80 60, 140 20, 200 40 Z"
              ]
            }}
            transition={{
              duration: 4.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
          {/* Tail */}
          <motion.path
            d="M 200 200 Q 200 230, 220 260"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            animate={{
              d: [
                "M 200 200 Q 200 230, 220 260",
                "M 200 210 Q 200 240, 180 250",
                "M 200 200 Q 200 230, 220 260"
              ]
            }}
            transition={{
              duration: 4.5,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
