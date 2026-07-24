import { motion } from "motion/react";

export default function FinaleSection() {
  return (
    <section id="finale" className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-deep to-abyss" aria-hidden="true" />
      <div className="relative z-10 max-w-3xl w-full text-center px-6">
        <motion.h2
          className="headline text-[#f7fcff] mb-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          THE STORY ENDS HERE.
        </motion.h2>
        <motion.h2
          className="headline text-glow mb-8"
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          THE MISSION DOESN&apos;T.
        </motion.h2>
        <motion.p
          className="subhead text-muted"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          The reef needs you. Not someday. Now.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10"
        >
          <button
            onClick={() => document.getElementById("action")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-primary btn-large text-deep font-semibold"
          >
            START YOUR CHAPTER →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
