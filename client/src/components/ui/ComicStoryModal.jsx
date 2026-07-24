import React from 'react';
import { useReefStore } from '../../store/useReefStore';
import { STORY_CHAPTERS } from '../../utils/mockData';
import { X, ChevronRight, ChevronLeft, Volume2, Sparkles } from 'lucide-react';

export default function ComicStoryModal() {
  const {
    isStoryModalOpen,
    closeStoryModal,
    activeStoryChapter,
    setStoryChapter
  } = useReefStore();

  if (!isStoryModalOpen) return null;

  const currentChapter = STORY_CHAPTERS.find(c => c.chapter === activeStoryChapter) || STORY_CHAPTERS[0];

  const handleNext = () => {
    if (activeStoryChapter < STORY_CHAPTERS.length) {
      setStoryChapter(activeStoryChapter + 1);
    } else {
      setStoryChapter(1);
    }
  };

  const handlePrev = () => {
    if (activeStoryChapter > 1) {
      setStoryChapter(activeStoryChapter - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="comic-box-lg bg-popDark text-white w-full max-w-3xl p-6 relative border-6 border-black shadow-pop-xl">
        {/* Close Button */}
        <button
          onClick={closeStoryModal}
          className="absolute top-4 right-4 comic-box bg-popRed text-white p-2 hover:bg-red-600 shadow-pop-sm"
        >
          <X size={20} />
        </button>

        {/* Story Header */}
        <div className="flex items-center gap-3 border-b-4 border-black pb-3 mb-6">
          <span className="comic-box bg-popYellow text-black font-comic text-xl px-3 py-1">
            {currentChapter.title}
          </span>
          <span className="bg-popPink text-white font-mono text-xs px-2.5 py-1 border border-black font-bold uppercase">
            {currentChapter.badge}
          </span>
        </div>

        {/* Main Comic Panel Frame */}
        <div className="comic-box bg-white text-black p-6 mb-6 shadow-pop-lg relative overflow-hidden">
          {/* Halftone Overlay */}
          <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Visual Icon Illustration Box */}
            <div className="comic-box bg-popTeal p-8 text-7xl flex items-center justify-center border-4 border-black shadow-pop shrink-0 transform -rotate-3">
              {currentChapter.panelImage}
            </div>

            {/* Narrative Content */}
            <div className="flex-1">
              <span className="bg-black text-popYellow font-comic text-sm px-2 py-0.5 uppercase inline-block mb-2">
                EXTRA! EXTRA!
              </span>
              <h2 className="font-comic text-3xl leading-none text-black mb-3">
                {currentChapter.headline}
              </h2>
              <p className="font-sans text-base text-gray-900 leading-relaxed mb-4 border-l-4 border-popRed pl-3">
                {currentChapter.narrative}
              </p>

              {/* Action Callout Bubble */}
              <div className="speech-bubble bg-popYellow p-3 text-xs font-comic text-black text-center border-3 border-black transform rotate-1">
                💥 "{currentChapter.callout}"
              </div>
            </div>
          </div>
        </div>

        {/* Sound FX & Chapter Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("KABOOM! Sound effect played!")}
              className="comic-box bg-popOrange text-black font-comic text-xs px-3 py-1.5 flex items-center gap-1 hover:bg-amber-400"
            >
              <Volume2 size={14} /> SOUND FX: "SPLASH!"
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={activeStoryChapter === 1}
              onClick={handlePrev}
              className="comic-box bg-white text-black font-comic px-3 py-1.5 text-sm disabled:opacity-50"
            >
              <ChevronLeft size={18} /> PREV
            </button>

            <span className="font-mono text-xs text-popYellow">
              PAGE {activeStoryChapter} / {STORY_CHAPTERS.length}
            </span>

            <button
              onClick={handleNext}
              className="comic-box bg-popTeal text-black font-comic px-4 py-1.5 text-sm flex items-center gap-1 shadow-pop-sm"
            >
              NEXT ISSUE <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
