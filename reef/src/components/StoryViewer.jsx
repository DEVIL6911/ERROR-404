import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { chapters } from "../data/chapters";

export default function StoryViewer({ activeChapterIndex, setActiveChapterIndex }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const chapter = chapters[activeChapterIndex];
  const isImageRight = activeChapterIndex % 2 !== 0;

  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [activeChapterIndex]);

  const handleNext = () => {
    if (activeChapterIndex < chapters.length - 1) {
      setActiveChapterIndex(activeChapterIndex + 1);
    } else {
      document.getElementById("finale")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (activeChapterIndex > 0) {
      setActiveChapterIndex(activeChapterIndex - 1);
    } else {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <article
      id="story-viewer"
      className="relative min-h-screen pt-24 pb-12 px-4 md:px-6 flex items-center justify-center bg-sky-bg overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapterIndex}
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`w-full flex flex-col md:flex-row gap-4 md:gap-8 items-center bg-white/70 backdrop-blur-lg rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-10 border border-white shadow-[0_20px_60px_rgba(14,165,233,0.12)] ${
              isImageRight ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Side (50%) - Full image visible without scrolling */}
            <div className="w-full md:w-1/2 relative h-[40vh] sm:h-[50vh] md:h-[75vh] rounded-2xl md:rounded-[2rem] overflow-hidden bg-sky-pale border border-white shadow-inner flex items-center justify-center">
              {!imgLoaded && !imgError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-sky gap-3">
                  <div className="w-8 h-8 border-2 border-sky/20 border-t-sky rounded-full animate-spin" />
                </div>
              )}
              {!imgError && chapter.image && (
                <img
                  src={chapter.image}
                  alt={chapter.ariaLabel}
                  className={`w-full h-full object-contain transition-opacity duration-700 p-2 md:p-4 ${
                    imgLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                />
              )}
              {imgError && (
                <div className="absolute inset-0 flex items-center justify-center bg-sky-pale text-sky">
                  Image missing
                </div>
              )}
            </div>
            
            {/* Text Side (50%) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-2 md:px-12 py-6 md:py-8">
              
              {/* Progress Dots Indicator */}
              <div className="flex items-center gap-2 mb-6">
                {chapters.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveChapterIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeChapterIndex ? "w-8 bg-sky" : "w-2 bg-sky/20 hover:bg-sky/40"
                    }`}
                    aria-label={`Go to chapter ${i + 1}`}
                  />
                ))}
              </div>
              
              <p className="text-sky text-xs md:text-sm tracking-[0.2em] uppercase mb-2 font-bold">
                Chapter {activeChapterIndex + 1}
              </p>
              
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-deep font-bold mb-4 drop-shadow-sm leading-tight">
                {chapter.name}
              </h2>
              
              <p className="font-display italic text-sky text-lg md:text-2xl mb-4 leading-relaxed font-medium">
                &quot;{chapter.keyText}&quot;
              </p>
              
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                {chapter.description}
              </p>
              
              <div className="w-12 h-1 bg-sky/30 mb-8 rounded-full" />
              
              {/* Navigation Controls */}
              <div className="flex items-center gap-3 md:gap-4">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 md:gap-2 px-4 md:px-6 py-3 rounded-full text-xs md:text-sm font-semibold text-text-secondary bg-white shadow-sm border border-sky/20 hover:text-sky hover:bg-sky-pale transition-all duration-250"
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>
                
                <button
                  onClick={handleNext}
                  className="flex flex-1 items-center justify-center gap-2 px-6 md:px-8 py-3 rounded-full text-xs md:text-sm font-bold text-white bg-sky shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_8px_30px_rgba(14,165,233,0.5)] hover:bg-sky-light hover:scale-105 transition-all duration-250"
                >
                  {activeChapterIndex < chapters.length - 1 ? "Next Chapter" : "Finish Story"}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </article>
  );
}
