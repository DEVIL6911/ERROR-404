import { motion } from "motion/react";

export default function FinaleSection() {
  return (
    <section id="finale" className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-gradient-to-b from-[#010b12] via-[#042436] to-[#011420]">
      {/* Ambient Underwater Light Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#2ec4b6]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full text-center px-6">
        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#f7fcff] mb-3 tracking-wide"
          initial={{ opacity: 0.3, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          THE STORY ENDS HERE.
        </motion.h2>

        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-aqua text-shadow-glow mb-6 tracking-wide"
          initial={{ opacity: 0.3, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          THE MISSION DOESN&apos;T.
        </motion.h2>

        <motion.p
          className="text-muted text-lg max-w-md mx-auto"
          initial={{ opacity: 0.5, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          The reef needs you. Not someday. Now.
        </motion.p>

        <motion.div
          initial={{ opacity: 0.5, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={() => document.getElementById("action")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-primary btn-large text-deep font-bold tracking-wider shadow-[0_0_30px_rgba(46,196,182,0.5)] hover:scale-105 transition-all"
          >
            START YOUR CHAPTER →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
