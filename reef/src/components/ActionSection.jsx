import { motion } from "motion/react";
import ActionCard from "./ActionCard";

export default function ActionSection() {
  return (
    <section 
      id="action" 
      className="relative min-h-screen flex items-center justify-center py-16 md:py-24 px-4 md:px-6 bg-[url('/assets/impact-bg.png')] bg-fixed bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      
      {/* Dark overlay to ensure readability against the vibrant image */}
      <div className="absolute inset-0 bg-deep/60 backdrop-blur-[2px]" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl w-full">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-2.5 mb-6 border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
          >
            <span className="text-white text-lg">🪸</span>
            <span className="text-white text-sm font-bold tracking-widest uppercase">Take Action</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 drop-shadow-xl leading-tight text-white"
          >
            YOUR CHAPTER BEGINS NOW.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md"
          >
            Choose how you want to make a difference. Every action counts towards a healthier, vibrant ocean.
          </motion.p>
        </div>
        
        {/* 2x2 Grid Layout for 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[
            {
              id: "restore",
              title: "RESTORE",
              description: "Help restore damaged coral reefs by funding nursery-grown fragments.",
              cta: "RESTORE A REEF →",
              icon: "🪸",
              accent: "coral"
            },
            {
              id: "clean",
              title: "CLEAN",
              description: "Take action against ocean and beach pollution with local cleanup drives.",
              cta: "JOIN A CLEANUP →",
              icon: "🌊",
              accent: "sky"
            },
            {
              id: "protect",
              title: "PROTECT",
              description: "Help protect marine life and ocean ecosystems through advocacy.",
              cta: "PROTECT MARINE →",
              icon: "🐠",
              accent: "sky"
            },
            {
              id: "share",
              title: "SHARE",
              description: "Spread awareness and inspire others to join the movement today.",
              cta: "SPREAD THE WORD →",
              icon: "📢",
              accent: "sky"
            },
          ].map((item, i) => (
            <ActionCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
