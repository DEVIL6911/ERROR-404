export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-[rgba(94,234,212,0.2)] bg-[#010c14]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-bold tracking-[0.2em] text-sm text-mist">
          <span className="text-coral font-serif text-lg">🪸</span>
          REEF
        </div>
        <div className="flex items-center gap-6 text-muted font-medium text-sm">
          <a href="#" aria-label="Instagram" className="hover:text-glow transition-colors">Instagram</a>
          <a href="#" aria-label="Twitter" className="hover:text-glow transition-colors">Twitter</a>
          <a href="#" aria-label="YouTube" className="hover:text-glow transition-colors">YouTube</a>
        </div>
        <p className="text-xs text-muted tracking-widest uppercase font-semibold">One Reef · One Voice</p>
      </div>
    </footer>
  );
}
