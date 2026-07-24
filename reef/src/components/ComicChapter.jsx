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

    if (prefersReducedMotion) return;

    const handleLoad = () => {
      if (imgRef.current) {
        const img = imgRef.current;
        if (img.complete && img.naturalWidth > 0) {
          setImgLoaded(true);
        }
      }
    };

    if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    } else {
      imgRef.current.addEventListener("load", handleLoad);
      return () => imgRef.current.removeEventListener("load", handleLoad);
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id={chapter.id}
      className="section flex items-center justify-center scroll-snap-start"
      aria-label={chapter.ariaLabel}
    >
      <div className="relative w-full h-screen h-[100dvh] overflow-hidden">
        {!imgError && chapter.image && (
          <img
            ref={imgRef}
            src={chapter.image}
            alt={chapter.ariaLabel}
            className="absolute inset-0 w-full h-full object-contain z-[1] transition-opacity duration-700"
            style={{ opacity: imgLoaded ? 1 : 0 }}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
            onError={() => setImgError(true)}
            onLoad={() => setImgLoaded(true)}
          />
        )}
        {imgError && (
          <div
            className={`absolute inset-0 z-0 reef-fallback ${chapter.mood === "beauty-to-loss" || chapter.mood === "mystery-hope" ? "healthy" : chapter.mood === "renewal" ? "planted" : "bleached"}`}
            aria-hidden="true"
          />
        )}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 z-0 bg-abyss" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent z-[2] pointer-events-none" />
        <div className="absolute bottom-8 left-0 right-0 z-[5] text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-glow text-xs tracking-[0.25em] uppercase mb-2 font-medium opacity-80">
              Chapter {index + 1}
            </p>
            <h2 className="font-display text-2xl md:text-3xl text-white font-normal">
              {chapter.name}
            </h2>
            <p className="text-muted text-sm mt-2 max-w-md mx-auto font-display italic">
              {chapter.keyText}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
