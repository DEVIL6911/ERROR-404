import { motion } from "motion/react";

const actionItems = [
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
];

export default function ActionCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 flex flex-col gap-3 hover:border-aqua/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(46,196,182,0.08)] transition-all duration-300 group"
    >
      <div className="text-3xl leading-none" aria-hidden="true">{item.icon}</div>
      <h3 className="text-lg font-semibold text-white font-display">{item.title}</h3>
      <p className="text-sm text-muted flex-1 leading-relaxed">{item.description}</p>
      <button className="btn btn-outline text-sm py-2 px-4 group-hover:bg-aqua/10">
        {item.cta}
      </button>
    </motion.article>
  );
}
