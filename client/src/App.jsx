import React from 'react';
import Navbar from './components/ui/Navbar';
import OceanScene from './components/ocean/OceanScene';
import ImpactSidebar from './components/ui/ImpactSidebar';
import ResearchPaperGrid from './components/ui/ResearchPaperGrid';
import ForumPanel from './components/ui/ForumPanel';
import ComicStoryModal from './components/ui/ComicStoryModal';
import AuthModal from './components/ui/AuthModal';
import VolunteerModal from './components/ui/VolunteerModal';
import { useReefStore } from './store/useReefStore';

export default function App() {
  const { activeTab, halftoneEnabled } = useReefStore();

  return (
    <div className={`min-h-screen flex flex-col bg-popDark text-white relative ${halftoneEnabled ? 'bg-halftone' : ''}`}>
      {/* Pop-Art Vintage Top Header Navigation */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1 relative w-full flex flex-col overflow-hidden">
        {activeTab === 'globe' && (
          <div className="w-full flex-1 relative flex flex-col md:flex-row h-[calc(100vh-70px)]">
            {/* 3D Ocean Canvas Viewport */}
            <div className="flex-1 h-full relative">
              <OceanScene />
            </div>

            {/* Interactive Impact Mapping Floating Overlay Sidebar */}
            <div className="p-4 md:absolute md:top-4 md:right-4 md:bottom-4 z-20 pointer-events-auto">
              <ImpactSidebar />
            </div>
          </div>
        )}

        {activeTab === 'research' && (
          <div className="py-8 px-4">
            <ResearchPaperGrid />
          </div>
        )}

        {activeTab === 'forum' && (
          <div className="py-8 px-4">
            <ForumPanel />
          </div>
        )}
      </main>

      {/* Pop-Art Modals */}
      <ComicStoryModal />
      <AuthModal />
      <VolunteerModal />
    </div>
  );
}
