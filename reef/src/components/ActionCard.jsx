import { motion } from "motion/react";

export default function ActionCard({ item, index }) {
  const isCoral = item.accent === "coral";
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`bg-white/10 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 flex flex-col gap-5 border border-white/20 hover:-translate-y-3 transition-all duration-300 group ${
        isCoral 
          ? "hover:shadow-[0_20px_50px_rgba(255,122,92,0.4)] hover:border-coral/50" 
          : "hover:shadow-[0_20px_50px_rgba(14,165,233,0.4)] hover:border-sky/50"
      } shadow-[0_10px_30px_rgba(0,0,0,0.2)]`}
    >
      <div 
        className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 ${
          isCoral ? "bg-coral/20 text-white border border-coral/30" : "bg-sky/20 text-white border border-sky/30"
        }`} 
        aria-hidden="true"
      >
        {item.icon}
      </div>
      
      <h3 className="text-2xl font-bold text-white font-display tracking-wide drop-shadow-md">{item.title}</h3>
      
      <p className="text-base md:text-lg text-white/80 flex-1 leading-relaxed">{item.description}</p>
      
      <button 
        className={`mt-6 w-full py-4 px-6 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 border ${
          isCoral 
            ? "text-coral bg-white/10 border-coral/50 group-hover:bg-coral group-hover:text-white group-hover:border-coral group-hover:shadow-[0_8px_25px_rgba(255,122,92,0.6)]" 
            : "text-sky bg-white/10 border-sky/50 group-hover:bg-sky group-hover:text-white group-hover:border-sky group-hover:shadow-[0_8px_25px_rgba(14,165,233,0.6)]"
        }`}
      >
        {item.cta}
      </button>
    </motion.article>
  );
}
