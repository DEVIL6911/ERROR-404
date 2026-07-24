import React from 'react';
import { useReefStore } from '../../store/useReefStore';
import { Shield, Thermometer, Waves, Users, Activity, ExternalLink, Zap } from 'lucide-react';

export default function ImpactSidebar() {
  const { selectedReef, reefs, setSelectedReefId, openVolunteerModal } = useReefStore();

  if (!selectedReef) return null;

  return (
    <aside className="w-full md:w-96 bg-white text-black border-4 border-black p-5 shadow-pop-lg flex flex-col gap-4 font-sans relative z-20">
      {/* Pop-Art Badge Header */}
      <div className="flex items-center justify-between border-b-4 border-black pb-3">
        <div className="bg-popYellow border-2 border-black px-2.5 py-1 font-comic text-sm tracking-wide shadow-pop-sm">
          📍 REEF COORDINATE DATA
        </div>
        <span className="bg-popRed text-white text-xs font-mono font-bold px-2 py-0.5 border border-black rounded">
          {selectedReef.threatLevel} THREAT
        </span>
      </div>

      {/* Reef Title */}
      <div>
        <h2 className="font-comic text-2xl leading-none text-black mb-1">
          {selectedReef.name}
        </h2>
        <p className="text-xs font-mono text-gray-700 flex items-center gap-1">
          <span>REGION:</span> {selectedReef.region} ({selectedReef.coordinates[0]}°, {selectedReef.coordinates[1]}°)
        </p>
      </div>

      {/* Pop-Art Speech Callout */}
      <div className="speech-bubble bg-popTeal p-3 rounded text-xs font-bold border-3 border-black text-black">
        <p className="font-comic text-sm text-black">
          "{selectedReef.speechBubble}"
        </p>
      </div>

      {/* Key Metric Meters */}
      <div className="grid grid-cols-2 gap-3">
        <div className="comic-box bg-yellow-100 p-2.5 border-3 border-black">
          <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-1">
            <span className="flex items-center gap-1"><Activity size={14} /> HEALTH</span>
            <span className="font-comic text-lg text-popDark">{selectedReef.healthIndex}%</span>
          </div>
          <div className="w-full bg-black h-3 border border-black p-0.5">
            <div
              className="bg-popGreen h-full border-r border-black"
              style={{ width: `${selectedReef.healthIndex}%` }}
            ></div>
          </div>
        </div>

        <div className="comic-box bg-blue-100 p-2.5 border-3 border-black">
          <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-1">
            <span className="flex items-center gap-1"><Zap size={14} /> RESTORED</span>
            <span className="font-comic text-lg text-popDark">{selectedReef.restorationProgress}%</span>
          </div>
          <div className="w-full bg-black h-3 border border-black p-0.5">
            <div
              className="bg-popTeal h-full border-r border-black"
              style={{ width: `${selectedReef.restorationProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Environmental Metrics */}
      <div className="bg-gray-100 border-3 border-black p-3 text-xs font-mono grid grid-cols-3 gap-2 text-center">
        <div>
          <span className="block text-gray-500 text-[10px]">TEMP</span>
          <span className="font-bold text-sm text-popRed flex items-center justify-center gap-0.5">
            <Thermometer size={12} /> {selectedReef.temperature}
          </span>
        </div>
        <div>
          <span className="block text-gray-500 text-[10px]">DEPTH</span>
          <span className="font-bold text-sm text-popBlue flex items-center justify-center gap-0.5">
            <Waves size={12} /> {selectedReef.depth}
          </span>
        </div>
        <div>
          <span className="block text-gray-500 text-[10px]">VOLUNTEERS</span>
          <span className="font-bold text-sm text-black flex items-center justify-center gap-0.5">
            <Users size={12} /> {selectedReef.volunteerCount}
          </span>
        </div>
      </div>

      {/* Other Reef Selector Chips */}
      <div>
        <span className="block text-xs font-comic text-gray-700 mb-1.5">SELECT SECTOR:</span>
        <div className="flex flex-wrap gap-1.5">
          {reefs.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedReefId(r.id)}
              className={`text-xs px-2 py-1 border-2 border-black font-mono transition-transform ${
                r.id === selectedReef.id
                  ? 'bg-popYellow font-bold shadow-pop-sm translate-y-[-1px]'
                  : 'bg-white hover:bg-gray-200'
              }`}
            >
              {r.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* CTA Action Button */}
      <button
        onClick={openVolunteerModal}
        className="comic-box bg-popPink text-white font-comic text-lg py-3 px-4 shadow-pop hover:bg-pink-600 active:scale-98 transition-all flex items-center justify-center gap-2 mt-auto"
      >
        <Shield size={20} /> JOIN RESTORATION SQUAD!
      </button>
    </aside>
  );
}
