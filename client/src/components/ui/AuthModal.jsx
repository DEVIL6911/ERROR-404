import React, { useState } from 'react';
import { useReefStore } from '../../store/useReefStore';
import { X, Shield, Lock, User, Mail, Sparkles } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, setUserAuth } = useReefStore();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    const fakeToken = "jwt_mock_token_kaboom_2026_" + Date.now();
    const fakeUser = {
      id: 1,
      username,
      email: email || `${username}@guardiansquad.org`,
      role: "SQUAD_MEMBER",
      comic_title: "Coral Defender"
    };
    setUserAuth(fakeUser, fakeToken);
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="comic-box-lg bg-white text-black w-full max-w-md p-6 relative border-6 border-black shadow-pop-xl">
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 comic-box bg-popRed text-white p-1.5 hover:bg-red-600 shadow-pop-sm"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4 border-b-4 border-black pb-3">
          <Shield size={28} className="text-popPink" />
          <div>
            <h2 className="font-comic text-2xl leading-none text-black">
              {isLogin ? 'AUTHENTICATE GUARDIAN SQUAD' : 'ENLIST IN GUARDIAN SQUAD'}
            </h2>
            <span className="text-xs font-mono text-gray-600">JWT SECURED ACCESS</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-comic text-gray-700 mb-1">USERNAME / CALLSIGN</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. CaptainCoral"
                className="w-full p-2.5 pl-9 border-3 border-black font-mono text-sm"
                required
              />
              <User size={16} className="absolute left-2.5 top-3 text-gray-500" />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-comic text-gray-700 mb-1">COMMUNICATION EMAIL</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guardian@ocean.org"
                  className="w-full p-2.5 pl-9 border-3 border-black font-mono text-sm"
                  required
                />
                <Mail size={16} className="absolute left-2.5 top-3 text-gray-500" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-comic text-gray-700 mb-1">SECURITY PASSCODE</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 pl-9 border-3 border-black font-mono text-sm"
                required
              />
              <Lock size={16} className="absolute left-2.5 top-3 text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            className="comic-box bg-popYellow text-black font-comic text-xl py-3 shadow-pop hover:bg-yellow-300 transition-all mt-2"
          >
            {isLogin ? 'ENTER SQUAD NETWORK! ⚡' : 'CREATE GUARDIAN BADGE! 🛡️'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t-2 border-black text-center text-xs font-mono">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-popBlue hover:underline font-bold"
          >
            {isLogin ? "Need a Guardian badge? Enlist here!" : "Already enlisted? Log in!"}
          </button>
        </div>
      </div>
    </div>
  );
}
