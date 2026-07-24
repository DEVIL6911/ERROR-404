import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { chapters } from "../data/chapters";

export default function Header({ onStartStory, onGoHome, storyStarted, activeChapterIndex, setActiveChapterIndex }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const chaptersRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Update active section based on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // For story viewer, we track if we are in the "story-viewer" section
            if (entry.target.id === "story-viewer") {
              setActiveSection("story-viewer");
            } else {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [storyStarted]);

  // Close chapters dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (chaptersRef.current && !chaptersRef.current.contains(e.target)) {
        setChaptersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    setChaptersOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectChapter = (index) => {
    setActiveChapterIndex(index);
    scrollTo("story-viewer");
  };

  const handleHomeClick = () => {
    setMenuOpen(false);
    if (storyStarted) {
      onGoHome();
    } else {
      scrollTo("hero");
    }
  };

  const NavLink = ({ sectionId, label, onClick }) => {
    const isActive = activeSection === sectionId;
    return (
      <button
        onClick={onClick}
        className={`relative py-2 px-1 text-sm font-semibold tracking-wider transition-colors duration-250 ${
          isActive ? "text-sky" : "text-text-secondary hover:text-sky"
        }`}
      >
        {label}
        <span
          className={`absolute -bottom-0.5 left-0 h-[2px] bg-sky transition-transform duration-300 origin-left ${
            isActive ? "w-full scale-x-100" : "w-full scale-x-0"
          }`}
        />
      </button>
    );
  };

  return (
    <header
      role="banner"
      className="fixed inset-x-0 top-0 z-[100] h-[4.5rem] flex items-center justify-between px-6 md:px-12 bg-white/95 backdrop-blur-xl border-b border-sky/10 shadow-[0_4px_30px_rgba(14,165,233,0.05)]"
    >
      {/* Logo */}
      <button
        onClick={handleHomeClick}
        className="flex items-center gap-2 font-display font-bold tracking-[0.12em] text-lg text-deep hover:text-sky transition-colors duration-250"
        aria-label="REEF home"
      >
        <span className="text-sky text-xl" aria-hidden="true">🐢</span>
        REEF
      </button>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
        <NavLink sectionId="hero" label="HOME" onClick={handleHomeClick} />

        {storyStarted && (
          <div ref={chaptersRef} className="relative">
            <button
              onClick={() => setChaptersOpen(!chaptersOpen)}
              className={`relative py-2 px-1 text-sm font-semibold tracking-wider transition-colors duration-250 flex items-center gap-1 ${
                activeSection === "story-viewer" ? "text-sky" : "text-text-secondary hover:text-sky"
              }`}
            >
              CHAPTERS
              <ChevronDown size={14} className={`transition-transform duration-200 ${chaptersOpen ? "rotate-180" : ""}`} />
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] bg-sky transition-transform duration-300 origin-left ${
                  activeSection === "story-viewer" ? "w-full scale-x-100" : "w-full scale-x-0"
                }`}
              />
            </button>

            <AnimatePresence>
              {chaptersOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 left-0 w-56 bg-white/95 backdrop-blur-[20px] border border-[rgba(14,165,233,0.12)] rounded-xl shadow-[0_20px_50px_rgba(14,165,233,0.15)] overflow-hidden"
                >
                  {chapters.map((ch, i) => (
                    <button
                      key={ch.id}
                      onClick={() => handleSelectChapter(i)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 flex items-center gap-3 ${
                        activeSection === "story-viewer" && activeChapterIndex === i
                          ? "text-sky bg-sky/5 font-semibold"
                          : "text-text-secondary hover:text-sky hover:bg-sky/5"
                      }`}
                    >
                      <span className={`text-xs font-mono ${activeSection === "story-viewer" && activeChapterIndex === i ? "text-sky" : "text-muted"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {ch.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <NavLink sectionId="action" label="ACTION" onClick={() => scrollTo("action")} />
        <NavLink sectionId="impact" label="IMPACT" onClick={() => scrollTo("impact")} />

        <button
          onClick={() => { setMenuOpen(false); onStartStory(); }}
          className="ml-2 rounded-full px-6 py-2 bg-sky text-white font-semibold text-sm tracking-wider shadow-[0_4px_20px_rgba(14,165,233,0.25)] hover:shadow-[0_8px_30px_rgba(14,165,233,0.4)] hover:scale-[1.04] transition-all duration-250"
        >
          DIVE IN →
        </button>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 text-text-secondary hover:text-sky transition-colors duration-250"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[4.5rem] bg-white/95 backdrop-blur-[20px] z-[99] md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8 text-lg font-semibold tracking-wider" aria-label="Mobile">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0 }}
                onClick={handleHomeClick}
                className={`transition-colors duration-250 ${activeSection === "hero" ? "text-sky" : "text-text-secondary"}`}
              >
                HOME
              </motion.button>

              {storyStarted && chapters.map((ch, i) => (
                <motion.button
                  key={ch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (i + 1) * 0.06 }}
                  onClick={() => handleSelectChapter(i)}
                  className={`transition-colors duration-250 ${activeSection === "story-viewer" && activeChapterIndex === i ? "text-sky" : "text-text-secondary"}`}
                >
                  {ch.name}
                </motion.button>
              ))}

              <div className="w-12 h-px bg-sky/20" />

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.36 }}
                onClick={() => scrollTo("action")}
                className={`transition-colors duration-250 ${activeSection === "action" ? "text-sky" : "text-text-secondary"}`}
              >
                ACTION
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.42 }}
                onClick={() => scrollTo("impact")}
                className={`transition-colors duration-250 ${activeSection === "impact" ? "text-sky" : "text-text-secondary"}`}
              >
                IMPACT
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.48 }}
                onClick={() => { onStartStory(); setMenuOpen(false); }}
                className="mt-4 rounded-full px-8 py-3 bg-sky text-white font-semibold text-base tracking-wider shadow-[0_4px_20px_rgba(14,165,233,0.3)]"
              >
                DIVE IN →
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
