import { useRef } from "react";
import { motion, useInView } from "motion/react";
import CountUpPkg from "react-countup";
const CountUp = CountUpPkg.default ?? CountUpPkg;
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
    <section id="impact" ref={ref} className="relative min-h-screen min-h-[100dvh] flex items-center justify-center py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-deep via-ocean/30 to-abyss" aria-hidden="true" />
      <div className="relative z-10 max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-semibold text-coral text-shadow-coral mb-2">
                {isInView && (
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={2.5}
                    useEasing={true}
                  >
                    {({ countUpProps }) => (
                      <span {...countUpProps} />
                    )}
                  </CountUp>
                )}
                {!isInView && <span>{stat.format || "0"}</span>}
              </div>
              <p className="text-xs tracking-[0.08em] text-muted uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
