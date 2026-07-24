import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Floating bubbles animation component
const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  
  useEffect(() => {
    // Generate random bubbles
    const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 10 + 5,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute bottom-[-50px] bg-white/30 rounded-full blur-[1px]"
          style={{ width: b.size, height: b.size, left: `${b.left}%` }}
          animate={{
            y: ["0vh", "-120vh"],
            x: ["0px", `${Math.random() * 50 - 25}px`, "0px"]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default function LandingHero({ onStartStory }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden bg-deep"
    >
      {/* Full-bleed hero background image with gentle movement. */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full origin-center"
          animate={{
            scale: [1, 1.05, 1],
            y: ["0%", "-1%", "0%"]
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <img
            src="/assets/hero-bg.png"
            alt="Sea turtle swimming over coral reef"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
      {/* Animated Bubbles */}
      <Bubbles />

      {/* Hero Content - Clean, no glass on the main text to show the turtle */}
      <div className="relative z-10 w-full max-w-5xl px-4 pt-32 pb-20 mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center w-full"
        >
          {/* Top text */}
          <motion.div
            className="inline-flex items-center gap-2 mb-8 bg-sky/20 backdrop-blur-md px-5 py-2 rounded-full border border-sky/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-white text-lg drop-shadow-md">🌊</span>
            <span 
              className="text-white text-xs sm:text-sm font-bold tracking-widest uppercase"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              Ocean Conservation Mission
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-xl leading-tight"
            style={{ textShadow: "0 10px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.8)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            THE OCEAN&apos;S STORY ISN&apos;T OVER.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-4 font-semibold leading-relaxed drop-shadow-md"
            style={{ textShadow: "0 4px 15px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We rescue injured sea animals, protect endangered marine species,
            and restore coral reefs to bring life back to our oceans.
          </motion.p>

          <motion.p
            className="text-base text-white/95 max-w-lg mx-auto mb-10 font-display italic font-semibold drop-shadow-md"
            style={{ textShadow: "0 4px 15px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Every creature matters. Every reef counts. Every action makes a difference.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <button
              onClick={onStartStory}
              className="px-10 py-4 rounded-full bg-coral text-white font-bold text-sm tracking-widest uppercase w-full sm:w-auto border border-coral/50 shadow-[0_8px_25px_rgba(255,122,92,0.4)] hover:shadow-[0_12px_35px_rgba(255,122,92,0.6)] hover:bg-[#ff8f75] hover:-translate-y-1 transition-all duration-300"
            >
              START THE STORY →
            </button>
            <button
              onClick={() => document.getElementById("action")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-sm tracking-widest uppercase w-full sm:w-auto shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              EXPLORE OUR MISSION
            </button>
          </motion.div>
        </motion.div>

        {/* Mission stats strip - Now styled in glass pills */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { value: "2.4M+", label: "Corals Restored" },
            { value: "36", label: "Species Protected" },
            { value: "12K+", label: "Volunteers" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-6 px-4 text-center hover:bg-white/20 transition-colors duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl font-display font-bold text-white mb-1 drop-shadow-md">
                {stat.value}
              </div>
              <div className="text-xs text-sky-pale uppercase tracking-widest font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint opacity-50" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
