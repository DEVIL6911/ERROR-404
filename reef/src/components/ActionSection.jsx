import { motion } from "motion/react";
import ActionCard from "./ActionCard";

export default function ActionSection() {
  return (
    <section id="action" className="relative min-h-screen min-h-[100dvh] flex items-center justify-center py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-deep to-abyss" aria-hidden="true" />
      <div className="relative z-10 max-w-5xl w-full">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="headline"
          >
            YOUR CHAPTER BEGINS NOW.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="subhead text-muted"
          >
            Choose how you want to make a difference.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              id: "restore",
              title: "RESTORE",
              description: "Help restore damaged coral reefs by funding nursery-grown fragments.",
              cta: "RESTORE A REEF →",
              icon: "🪸",
            },
            {
              id: "clean",
              title: "CLEAN",
              description: "Take action against ocean and beach pollution with local cleanup drives.",
              cta: "JOIN A CLEANUP →",
              icon: "🌊",
            },
            {
              id: "protect",
              title: "PROTECT",
              description: "Help protect marine life and ocean ecosystems through advocacy.",
              cta: "PROTECT MARINE LIFE →",
              icon: "🐠",
            },
            {
              id: "share",
              title: "SHARE",
              description: "Spread awareness and inspire others to join the movement.",
              cta: "SPREAD THE WORD →",
              icon: "📢",
            },
          ].map((item, i) => (
            <ActionCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
