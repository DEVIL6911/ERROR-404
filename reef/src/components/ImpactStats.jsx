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
    <section 
      id="impact" 
      ref={ref} 
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center py-16 md:py-24 px-4 md:px-6 bg-[url('/assets/impact-bg.png')] bg-fixed bg-cover bg-center bg-no-repeat"
    >
      {/* Dark overlay to ensure text remains readable against the vibrant image */}
      <div className="absolute inset-0 bg-deep/60 backdrop-blur-[2px]" aria-hidden="true" />
      
      <div className="relative z-10 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-2.5 mb-8 border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <span className="text-white text-lg">📊</span>
            <span className="text-white text-sm font-bold tracking-widest uppercase">Our Impact</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 md:mb-12 text-center drop-shadow-xl leading-tight">
            EVERY DIVE, EVERY HOUR, EVERY CHOICE — <br className="hidden md:block" /><em className="text-sky font-medium not-italic">WRITES THE NEXT PAGE</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 text-center flex flex-col justify-center shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
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
              <p className="text-xs sm:text-sm tracking-[0.2em] text-white/80 font-bold uppercase leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
