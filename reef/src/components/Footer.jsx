export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-[rgba(94,234,212,0.1)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-semibold tracking-[0.18em] text-sm text-mist">
          <span className="text-aqua text-shadow-glow" aria-hidden="true">◉</span>
          REEF
        </div>
        <div className="flex items-center gap-6 text-muted">
          <a href="#" aria-label="Instagram" className="hover:text-glow transition-colors">Instagram</a>
          <a href="#" aria-label="Twitter" className="hover:text-glow transition-colors">Twitter</a>
          <a href="#" aria-label="YouTube" className="hover:text-glow transition-colors">YouTube</a>
        </div>
        <p className="text-xs text-muted tracking-wide">One Reef · One Voice</p>
      </div>
    </footer>
  );
}
