import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function ComicChapter({ chapter, index }) {
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !imgRef.current) return;

    if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id={chapter.id}
      className="section flex flex-col items-center justify-center scroll-snap-start relative min-h-screen py-16 px-4 md:px-8 bg-[#010b12]"
      aria-label={chapter.ariaLabel}
    >
      {/* Ocean Ambient Glow at Z = -5 */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-30"
        style={{ transform: "translateZ(-5px) scale(1.1)" }}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full bg-gradient-to-tr from-[#0e7490]/30 to-[#2ec4b6]/20 blur-3xl" />
      </div>

      {/* Full Page Comic Container */}
      <div
        className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center z-10"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Sleek Floating Header Badge */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-3 bg-[#031525]/90 border border-[rgba(94,234,212,0.3)] backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg"
        >
          <span className="bg-[#ea580c] text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Chapter 0{index + 1}
          </span>
          <h2 className="font-display text-xl sm:text-2xl text-white font-semibold tracking-wide">
            {chapter.name}
          </h2>
        </motion.div>

        {/* Comic Strip Canvas Container */}
        <div className="relative w-full flex items-center justify-center rounded-xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.85)] border border-[rgba(94,234,212,0.2)] bg-[#020e17]">
          {/* Loading Spinner */}
          {!imgLoaded && !imgError && (
            <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-[#050B14] text-aqua gap-3">
              <div className="w-12 h-12 border-4 border-aqua/20 border-t-aqua rounded-full animate-spin" />
              <p className="text-xs font-mono text-muted tracking-widest uppercase">
                Loading High-Res Comic Chapter {index + 1}...
              </p>
            </div>
          )}

          {!imgError && chapter.image && (
            <img
              ref={imgRef}
              src={chapter.image}
              alt={chapter.ariaLabel}
              className={`w-full max-w-4xl h-auto object-contain max-h-[85vh] transition-all duration-700 ${
                imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              onError={() => setImgError(true)}
              onLoad={() => setImgLoaded(true)}
            />
          )}

          {imgError && (
            <div
              className={`w-full min-h-[70vh] reef-fallback ${
                chapter.mood === "beauty-to-loss" || chapter.mood === "mystery-hope"
                  ? "healthy"
                  : chapter.mood === "renewal"
                  ? "planted"
                  : "bleached"
              }`}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Subtle Key Text Caption Below Comic Strip (Never covering artwork) */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-mist text-base md:text-lg font-display italic text-center max-w-xl px-4 text-shadow-glow"
        >
          &quot;{chapter.keyText}&quot;
        </motion.p>
      </div>
    </section>
  );
}
