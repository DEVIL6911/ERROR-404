import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 px-6 border-t border-sky/10 bg-deep text-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-8">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 font-display font-bold tracking-[0.12em] text-lg text-white hover:text-sky transition-colors duration-250"
          aria-label="REEF home"
        >
          <span className="text-sky text-xl" aria-hidden="true">🐢</span>
          REEF
        </button>
        
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm font-semibold text-sky-pale">
          <a href="#" aria-label="Our Mission" className="hover:text-sky transition-colors">Our Mission</a>
          <a href="#" aria-label="Volunteer" className="hover:text-sky transition-colors">Volunteer</a>
          <a href="#" aria-label="Instagram" className="hover:text-sky transition-colors">Instagram</a>
          <a href="#" aria-label="Twitter" className="hover:text-sky transition-colors">Twitter</a>
        </div>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-sky/20 to-transparent max-w-lg my-2" />
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl text-sm text-sky-pale/80 font-medium">
          <p>© {new Date().getFullYear()} REEF Ocean Conservation. All rights reserved.</p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 mt-4 md:mt-0 text-sky hover:text-white transition-colors bg-sky/10 px-4 py-2 rounded-full border border-sky/20 hover:border-sky/40"
          >
            Back to top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
