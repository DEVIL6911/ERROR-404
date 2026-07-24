import { useRef } from "react";
import { motion, useInView } from "motion/react";
import CountUp from "react-countup";

const stats = [
  { end: 12840, suffix: "+", label: "VOLUNTEERS" },
  { end: 87, suffix: "", label: "CONSERVATION PROJECTS" },
  { end: 2400000, suffix: "+", label: "CORAL FRAGMENTS RESTORED", format: "2.4M+" },
  { end: 36, suffix: "", label: "MARINE SPECIES PROTECTED" },
];

export default function ImpactStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="impact" ref={ref} className="relative min-h-[85vh] flex flex-col items-center justify-center py-20 px-6 bg-gradient-to-br from-[#021018] via-[#04344a] to-[#082838]">
      {/* Ambient Light Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#ff6b8a]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0.5, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="headline text-center mb-12"
        >
          EVERY DIVE, EVERY HOUR, EVERY CHOICE — <em>WRITES THE NEXT PAGE</em>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0.5, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center shadow-xl border border-[rgba(94,234,212,0.25)] bg-[#041421]/90 backdrop-blur-md"
            >
              <div className="font-display text-4xl md:text-5xl font-semibold text-coral text-shadow-coral mb-2">
                {isInView ? (
                  <CountUp start={0} end={stat.end} suffix={stat.suffix} duration={2.5} />
                ) : (
                  <span>{stat.format || "0"}</span>
                )}
              </div>
              <p className="text-xs tracking-[0.08em] text-muted uppercase mt-1 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
