import React, { useState } from 'react';
import { useReefStore } from '../../store/useReefStore';
import { X, Heart, Shield, CheckCircle2 } from 'lucide-react';

export default function VolunteerModal() {
  const { isVolunteerModalOpen, closeVolunteerModal, selectedReef } = useReefStore();
  const [submitted, setSubmitted] = useState(false);
  const [volunteerName, setVolunteerName] = useState('');
  const [role, setRole] = useState('DIVER');

  if (!isVolunteerModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!volunteerName) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeVolunteerModal();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="comic-box-lg bg-popTeal text-black w-full max-w-lg p-6 relative border-6 border-black shadow-pop-xl">
        <button
          onClick={closeVolunteerModal}
          className="absolute top-4 right-4 comic-box bg-popRed text-white p-1.5 hover:bg-red-600 shadow-pop-sm"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4 border-b-4 border-black pb-3">
          <span className="text-3xl">🪸</span>
          <div>
            <h2 className="font-comic text-2xl leading-none text-black">
              JOIN RESTORATION MISSION!
            </h2>
            <span className="text-xs font-mono font-bold text-gray-800">
              TARGET: {selectedReef?.name || 'Sector Alpha'}
            </span>
          </div>
        </div>

        {submitted ? (
          <div className="comic-box bg-popYellow p-6 text-center shadow-pop">
            <CheckCircle2 size={48} className="mx-auto text-popGreen mb-2" />
            <h3 className="font-comic text-2xl mb-1">KABOOM! ENLISTED SUCCESSFULLY!</h3>
            <p className="text-xs font-mono">You are now deployed to {selectedReef?.name} restoration squad!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-comic text-black mb-1">VOLUNTEER FULL NAME</label>
              <input
                type="text"
                value={volunteerName}
                onChange={(e) => setVolunteerName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="w-full p-2.5 border-3 border-black font-mono text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-comic text-black mb-1">SPECIALIZATION / ROLE</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 border-3 border-black font-mono text-sm bg-white"
              >
                <option value="DIVER">SCUBA DIVER NURSERY DEPLOYER</option>
                <option value="DATA_SCIENTIST">DATA & ACOUSTIC MONITOR</option>
                <option value="COMMUNITY_LEAD">COMMUNITY RESTORATION LEAD</option>
                <option value="DONOR">SUPER-CORAL SPONSOR</option>
              </select>
            </div>

            <div className="speech-bubble bg-white p-3 text-xs font-comic text-black border-3 border-black">
              "Every volunteer increases reef restoration speed by 15%!"
            </div>

            <button
              type="submit"
              className="comic-box bg-popPink text-white font-comic text-xl py-3 shadow-pop hover:bg-pink-600 transition-all mt-2"
            >
              CONFIRM ENLISTMENT! 💥
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
