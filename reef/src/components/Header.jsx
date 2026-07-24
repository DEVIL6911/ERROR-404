import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header({ onStartStory, storyStarted }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] h-[4.25rem] flex items-center justify-between px-clamp transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(1,11,18,0.88)] border-b border-[rgba(94,234,212,0.22)]"
          : "bg-gradient-to-b from-[rgba(1,11,18,0.85)] to-transparent"
      }`}
    >
      <button
        onClick={() => scrollTo("hero")}
        className="flex items-center gap-2 font-semibold tracking-[0.18em] text-sm text-mist hover:text-glow transition-colors"
        aria-label="REEF home"
      >
        <span className="text-aqua text-shadow-glow animate-pulse-glow" aria-hidden="true">
          †
        </span>
        REEF
      </button>

      <nav className="hidden md:flex items-center gap-6 text-sm tracking-wide" aria-label="Primary">
        {storyStarted && (
          <button onClick={() => scrollTo("chapter-1")} className="opacity-75 hover:opacity-100 hover:text-glow transition-opacity">
            Chapters
          </button>
        )}
        <button onClick={() => scrollTo("action")} className="opacity-75 hover:opacity-100 hover:text-glow transition-opacity">
          Action
        </button>
        <button onClick={() => scrollTo("impact")} className="opacity-75 hover:opacity-100 hover:text-glow transition-opacity">
          Impact
        </button>
        <button
          onClick={() => { setMenuOpen(false); onStartStory(); }}
          className="border border-[rgba(94,234,212,0.22)] rounded-full px-4 py-1.5 opacity-100 bg-[rgba(46,196,182,0.12)] hover:bg-[rgba(46,196,182,0.28)] hover:border-aqua transition-colors"
        >
          Dive In →
        </button>
      </nav>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden p-2 text-mist hover:text-glow transition-colors"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[rgba(1,11,18,0.95)] border-b border-[rgba(94,234,212,0.22)] backdrop-blur-md md:hidden">
          <nav className="flex flex-col p-4 gap-4 text-sm tracking-wide" aria-label="Mobile">
            {storyStarted && (
              <button onClick={() => scrollTo("chapter-1")} className="text-left opacity-75 hover:text-glow">Chapters</button>
            )}
            <button onClick={() => scrollTo("action")} className="text-left opacity-75 hover:text-glow">Action</button>
            <button onClick={() => scrollTo("impact")} className="text-left opacity-75 hover:text-glow">Impact</button>
            <button onClick={() => { onStartStory(); setMenuOpen(false); }} className="text-left text-aqua">Dive In →</button>
          </nav>
        </div>
      )}
    </header>
  );
}
