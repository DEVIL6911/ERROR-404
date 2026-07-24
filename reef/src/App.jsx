import Header from "./components/Header";
import LandingHero from "./components/Hero/LandingHero";
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
  const progress = useScrollProgress();
  useSmoothScroll();

  return (
    <div className="relative bg-abyss text-mist min-h-screen">
      <ScrollProgress progress={progress} />
      <Header />

      {/* Surface Shoreline & Split Ocean Hero */}
      <LandingHero />

      {/* Seamless Continuous Comic Story Section */}
      <div id="comic-story" className="relative z-10">
        {chapters.map((chapter, i) => (
          <ComicChapter key={chapter.id} chapter={chapter} index={i} />
        ))}
        <FinaleSection />
      </div>

      <ActionSection />
      <ImpactStats />
      <Footer />
    </div>
  );
}
