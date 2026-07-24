import React from 'react';
import { useReefStore } from '../../store/useReefStore';
import { Shield, Sparkles, BookOpen, MessageSquare, Heart, Volume2, VolumeX, User, Eye } from 'lucide-react';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    halftoneEnabled,
    toggleHalftone,
    soundEnabled,
    toggleSound,
    openStoryModal,
    openAuthModal,
    user,
    logout
  } = useReefStore();

  return (
    <header className="relative z-30 w-full bg-popDark border-b-4 border-black px-4 py-3 shadow-pop">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Logo with Pop-Art Style */}
        <div className="flex items-center gap-3">
          <div className="comic-box bg-popYellow text-black px-3 py-1 font-comic text-2xl tracking-wider transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer" onClick={() => setActiveTab('globe')}>
            🪸 REEF <span className="bg-popRed text-white text-xs px-1.5 py-0.5 rounded font-mono ml-1">POP!</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 bg-black border-2 border-white px-3 py-1 rounded text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-popGreen animate-ping"></span>
            <span>GUARDIAN SQUAD ACTIVE</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('globe')}
            className={`comic-box px-3.5 py-1.5 font-comic text-sm flex items-center gap-1.5 transition-all ${
              activeTab === 'globe'
                ? 'bg-popTeal text-black border-black font-extrabold shadow-pop translate-y-[-2px]'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            <Eye size={16} /> 3D REEF MAP
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`comic-box px-3.5 py-1.5 font-comic text-sm flex items-center gap-1.5 transition-all ${
              activeTab === 'research'
                ? 'bg-popYellow text-black border-black font-extrabold shadow-pop translate-y-[-2px]'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            <BookOpen size={16} /> RESEARCH PAPERS
          </button>

          <button
            onClick={() => setActiveTab('forum')}
            className={`comic-box px-3.5 py-1.5 font-comic text-sm flex items-center gap-1.5 transition-all ${
              activeTab === 'forum'
                ? 'bg-popPink text-white border-black font-extrabold shadow-pop translate-y-[-2px]'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            <MessageSquare size={16} /> FORUM & PLASTIC DRIFT
          </button>

          <button
            onClick={openStoryModal}
            className="comic-box bg-popOrange text-black px-3.5 py-1.5 font-comic text-sm flex items-center gap-1.5 hover:bg-amber-400 transition-transform active:scale-95 shadow-pop"
          >
            <Sparkles size={16} /> STORY SAGA
          </button>
        </nav>

        {/* Action Controls & Auth */}
        <div className="flex items-center gap-2">
          {/* Halftone Toggle */}
          <button
            onClick={toggleHalftone}
            title="Toggle Halftone Dot Texture"
            className={`comic-box p-2 text-xs font-bold ${
              halftoneEnabled ? 'bg-popYellow text-black' : 'bg-gray-700 text-white'
            }`}
          >
            GRID
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            title="Toggle Sound Effects"
            className="comic-box p-2 bg-white text-black hover:bg-popTeal transition-colors"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* User Auth Membership Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="comic-box bg-popGreen text-black px-3 py-1 font-comic text-xs flex items-center gap-1">
                <Shield size={14} /> {user.username}
              </div>
              <button
                onClick={logout}
                className="text-xs text-gray-300 hover:text-popRed font-mono underline"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="comic-box bg-popPink text-white px-3.5 py-1.5 font-comic text-sm flex items-center gap-1.5 shadow-pop hover:bg-pink-600"
            >
              <User size={16} /> JOIN SQUAD
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
