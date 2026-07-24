import { motion } from "motion/react";

export default function FinaleSection() {
  return (
    <section id="finale" className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden py-12 px-4 md:px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-deep to-abyss" aria-hidden="true" />
      <div className="relative z-10 max-w-3xl w-full text-center px-4 md:px-6">
        <motion.h2
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f7fcff] mb-2 md:mb-4 drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          THE STORY ENDS HERE.
        </motion.h2>
        
        <motion.h2
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-glow mb-6 md:mb-8 drop-shadow-xl"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          THE MISSION DOESN&apos;T.
        </motion.h2>
        
        <motion.p
          className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          The reef needs you. Not someday. Now. Be the change our oceans are waiting for.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12"
        >
          <button
            onClick={() => document.getElementById("action")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-coral btn-large text-white shadow-[0_8px_30px_rgba(255,122,92,0.3)] hover:shadow-[0_12px_40px_rgba(255,122,92,0.5)] px-12 py-4 text-lg rounded-full transition-all duration-300"
          >
            START YOUR CHAPTER →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
