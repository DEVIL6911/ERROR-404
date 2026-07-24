import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import LandingHero from "./components/Hero/LandingHero";
import StoryTransition from "./components/StoryTransition";
import ComicChapter from "./components/ComicChapter";
import FinaleSection from "./components/FinaleSection";
import ActionSection from "./components/ActionSection";
import ImpactStats from "./components/ImpactStats";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import { chapters } from "./data/chapters";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollProgress } from "./hooks/useScrollProgress";

export default function App() {
  const [storyStarted, setStoryStarted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const progress = useScrollProgress();
  useSmoothScroll();

  const handleStartStory = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
  }, [transitioning]);

  const handleTransitionComplete = useCallback(() => {
    setStoryStarted(true);
    setTransitioning(false);
  }, []);

  return (
    <div className="relative bg-abyss text-mist">
      <ScrollProgress progress={progress} />
      <Header onStartStory={handleStartStory} />

      <AnimatePresence mode="wait">
        {!storyStarted && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <LandingHero onStartStory={handleStartStory} />
          </motion.div>
        )}
      </AnimatePresence>

      {storyStarted && (
        <motion.div
          key="comic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {chapters.map((chapter, i) => (
            <ComicChapter key={chapter.id} chapter={chapter} index={i} />
          ))}
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
    </div>
  );
}
