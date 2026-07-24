import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import LandingHero from "./components/Hero/LandingHero";
import StoryTransition from "./components/StoryTransition";
import StoryViewer from "./components/StoryViewer";
import FinaleSection from "./components/FinaleSection";
import ActionSection from "./components/ActionSection";
import ImpactStats from "./components/ImpactStats";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollProgress } from "./hooks/useScrollProgress";

export default function App() {
  const [storyStarted, setStoryStarted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const progress = useScrollProgress();
  useSmoothScroll();

  const handleStartStory = useCallback(() => {
    setTransitioning(true);
    setActiveChapterIndex(0); // Reset to first chapter when starting
  }, []);

  const handleGoHome = useCallback(() => {
    setStoryStarted(false);
    setTimeout(() => {
      const el = document.getElementById("hero");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    setStoryStarted(true);
    setTransitioning(false);
    setTimeout(() => {
      const el = document.getElementById("story-viewer");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    if (storyStarted) {
      const el = document.getElementById("story-viewer");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [storyStarted]);

  return (
    <main role="main" className="relative bg-abyss text-mist min-h-screen">
      <ScrollProgress progress={progress} />
      
      <Header 
        onStartStory={handleStartStory} 
        onGoHome={handleGoHome}
        storyStarted={storyStarted} 
        activeChapterIndex={activeChapterIndex}
        setActiveChapterIndex={setActiveChapterIndex}
      />

      <AnimatePresence>
        {!storyStarted && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LandingHero onStartStory={handleStartStory} />
          </motion.div>
        )}
      </AnimatePresence>

      {storyStarted && (
        <motion.div
          key="story-sequence"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* New single-view Side-by-Side Story Component */}
          <StoryViewer 
            activeChapterIndex={activeChapterIndex}
            setActiveChapterIndex={setActiveChapterIndex}
          />
          
          <FinaleSection />
        </motion.div>
      )}

      <ActionSection />
      <ImpactStats />
      <Footer />

      <StoryTransition
        isActive={transitioning}
        onComplete={handleTransitionComplete}
      />
    </main>
  );
}
