import { motion } from "motion/react";

export default function LandingHero() {
  const scrollToStory = () => {
    const el = document.getElementById("chapter-1");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[140vh] w-full overflow-hidden flex flex-col items-center justify-start text-[#0f172a]"
      data-section="hero"
    >
      {/* 1. TOP SKY & SHORELINE (Surface Level - Inspired by Laracon US) */}
      <div className="relative w-full h-[65vh] bg-gradient-to-b from-[#fdf6ec] via-[#fde68a] to-[#fb923c]/40 flex flex-col items-center justify-start pt-24 px-6 overflow-hidden">
        {/* Sun & Distant Clouds */}
        <div className="absolute top-10 w-96 h-96 rounded-full bg-gradient-to-tr from-[#fef08a]/60 to-[#f97316]/30 blur-3xl pointer-events-none" />
        <div className="absolute top-12 left-10 w-40 h-10 bg-white/40 rounded-full blur-md" />
        <div className="absolute top-20 right-16 w-56 h-14 bg-white/50 rounded-full blur-md" />

        {/* Shoreline Sand & Palm silhouettes */}
        <div className="absolute bottom-16 left-0 right-0 h-32 pointer-events-none overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
            <path
              fill="#fef3c7"
              d="M0,128L80,117.3C160,107,320,85,480,96C640,107,800,149,960,154.7C1120,160,1280,128,1360,112L1440,96L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z"
            />
          </svg>
        </div>

        {/* Hero Title Emblem Box (Laracon US Badge Style) */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center max-w-xl mx-auto"
        >
          <div className="inline-block border-2 border-[#0c4a6e] px-8 py-6 bg-[#fdf6ec]/80 backdrop-blur-md rounded-lg shadow-xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ea580c] text-white text-[0.7rem] uppercase tracking-[0.3em] font-bold px-4 py-1 rounded-full shadow-md">
              Living Scroll Story
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0c4a6e] leading-none">
              REEF <span className="font-serif italic text-[#ea580c]">VIII</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-[#0369a1] mt-2">
              The Last Coral Guardian
            </p>
          </div>

          <p className="mt-6 text-sm sm:text-base text-[#1e293b] font-medium max-w-md mx-auto leading-relaxed">
            Coral reefs cover less than 1% of the ocean floor — yet hold a quarter of all marine life.
            Scroll down to begin Kai&apos;s story.
          </p>
        </motion.div>

        {/* Wavy Split Surface Water Line */}
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-20">
          <svg className="w-full h-full text-[#14b8a6]/80 fill-current" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,800,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
          </svg>
        </div>
      </div>

      {/* 2. UNDERWATER DEEP SECTION (Transition from Surface to Deep Ocean) */}
      <div className="relative w-full flex-1 bg-gradient-to-b from-[#0e7490] via-[#04344a] to-[#010b12] text-mist flex flex-col items-center justify-start pt-16 pb-28 px-6">
        {/* Underwater Sun Rays */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background:
              "linear-gradient(110deg, transparent 35%, rgba(255,255,220,0.15) 45%, transparent 55%), linear-gradient(75deg, transparent 50%, rgba(180,240,255,0.12) 60%, transparent 70%)",
            backgroundSize: "200% 100%",
          }}
        />

        {/* Swimming Whale Shark Silhouette */}
        <div className="absolute top-12 right-[10%] w-64 h-24 opacity-25 pointer-events-none animate-pulse">
          <svg viewBox="0 0 200 80" className="w-full h-full fill-white">
            <path d="M10,40 Q50,20 110,25 T170,35 Q190,40 200,30 Q190,50 160,50 T90,55 Q50,55 10,40 Z" />
          </svg>
        </div>

        {/* Scroll CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 mt-12 text-center"
        >
          <button
            onClick={scrollToStory}
            className="btn btn-primary btn-large text-deep font-bold tracking-wider shadow-[0_0_30px_rgba(46,196,182,0.5)] hover:scale-105 transition-all"
          >
            SCROLL TO START COMIC STORY ↓
          </button>
          <p className="text-xs text-muted tracking-widest uppercase mt-4 animate-pulse">
            Keep scrolling down to submerge into Chapter 1
          </p>
        </motion.div>
      </div>
    </section>
  );
}
