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
      className="section flex items-center justify-center scroll-snap-start relative min-h-screen py-8"
      aria-label={chapter.ariaLabel}
    >
      <div className="relative w-full max-w-5xl mx-auto h-[85vh] flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[rgba(94,234,212,0.2)] bg-[#04121e]/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-2 md:p-4">
        {/* Loading Spinner so black screen never occurs during image download */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050B14] text-aqua gap-3">
            <div className="w-10 h-10 border-3 border-aqua/20 border-t-aqua rounded-full animate-spin" />
            <p className="text-xs font-mono text-muted tracking-widest uppercase">
              Loading Chapter {index + 1}...
            </p>
          </div>
        )}

        {!imgError && chapter.image && (
          <img
            ref={imgRef}
            src={chapter.image}
            alt={chapter.ariaLabel}
            className={`w-full h-full object-contain z-[1] transition-all duration-700 ${
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
            className={`absolute inset-0 z-0 reef-fallback ${
              chapter.mood === "beauty-to-loss" || chapter.mood === "mystery-hope"
                ? "healthy"
                : chapter.mood === "renewal"
                ? "planted"
                : "bleached"
            }`}
            aria-hidden="true"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#021018]/90 via-transparent to-transparent z-[2] pointer-events-none" />

        {/* Primary Info sitting physically closer to camera (z=0 vs background z=-5) per depth scale rule */}
        <div
          className="absolute bottom-6 left-0 right-0 z-[10] text-center px-4 pointer-events-auto"
          style={{ transform: "translateZ(0)" }}
        >
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="bg-[#05131f]/90 border border-[rgba(94,234,212,0.25)] backdrop-blur-md max-w-xl mx-auto p-5 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
          >
            <p className="text-aqua text-xs tracking-[0.25em] uppercase mb-1 font-semibold">
              Chapter {index + 1}
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-white font-normal">
              {chapter.name}
            </h2>
            <p className="text-mist text-sm mt-2 max-w-md mx-auto font-display italic">
              &quot;{chapter.keyText}&quot;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
