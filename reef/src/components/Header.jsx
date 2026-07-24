import { useState, useEffect } from "react";

export default function Header() {
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
      className={`fixed inset-x-0 top-0 z-[100] h-[4.25rem] flex items-center justify-between px-clamp transition-all duration-500 ${
        scrolled
          ? "bg-[#021018]/90 backdrop-blur-md border-b border-[rgba(94,234,212,0.25)] shadow-lg"
          : "bg-gradient-to-b from-[#fdf6ec]/80 to-transparent text-[#1e293b]"
      }`}
    >
      <button
        onClick={() => scrollTo("hero")}
        className={`flex items-center gap-2 font-bold tracking-[0.2em] text-sm transition-colors ${
          scrolled ? "text-mist hover:text-glow" : "text-[#0c4a6e] hover:text-[#0284c7]"
        }`}
        aria-label="REEF home"
      >
        <span className="text-coral font-serif text-lg">🪸</span>
        REEF
      </button>

      <nav className="hidden md:flex items-center gap-6 text-sm tracking-wide font-medium" aria-label="Primary">
        <button
          onClick={() => scrollTo("hero")}
          className={`transition-opacity ${scrolled ? "text-mist opacity-80 hover:opacity-100" : "text-[#0f172a] opacity-90 hover:opacity-100"}`}
        >
          About
        </button>
        <button
          onClick={() => scrollTo("chapter-1")}
          className={`transition-opacity ${scrolled ? "text-mist opacity-80 hover:opacity-100" : "text-[#0f172a] opacity-90 hover:opacity-100"}`}
        >
          Comic Story
        </button>
        <button
          onClick={() => scrollTo("action")}
          className={`transition-opacity ${scrolled ? "text-mist opacity-80 hover:opacity-100" : "text-[#0f172a] opacity-90 hover:opacity-100"}`}
        >
          Action
        </button>
        <button
          onClick={() => scrollTo("impact")}
          className={`transition-opacity ${scrolled ? "text-mist opacity-80 hover:opacity-100" : "text-[#0f172a] opacity-90 hover:opacity-100"}`}
        >
          Impact
        </button>
        <button
          onClick={() => scrollTo("chapter-1")}
          className="border border-[#ff6b8a]/40 rounded-full px-4 py-1.5 bg-[#ff6b8a]/15 text-[#ff6b8a] hover:bg-[#ff6b8a] hover:text-white transition-all shadow-sm"
        >
          Dive In ↓
        </button>
      </nav>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`md:hidden p-2 transition-colors ${scrolled ? "text-mist" : "text-[#0c4a6e]"}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#021018]/95 border-b border-[rgba(94,234,212,0.25)] backdrop-blur-lg md:hidden">
          <nav className="flex flex-col p-4 gap-4 text-sm tracking-wide" aria-label="Mobile">
            <button onClick={() => scrollTo("hero")} className="text-left text-mist opacity-80 hover:text-glow">About</button>
            <button onClick={() => scrollTo("chapter-1")} className="text-left text-mist opacity-80 hover:text-glow">Comic Story</button>
            <button onClick={() => scrollTo("action")} className="text-left text-mist opacity-80 hover:text-glow">Action</button>
            <button onClick={() => scrollTo("impact")} className="text-left text-mist opacity-80 hover:text-glow">Impact</button>
            <button onClick={() => scrollTo("chapter-1")} className="text-left text-aqua font-semibold">Dive In ↓</button>
          </nav>
        </div>
      )}
    </header>
  );
}
