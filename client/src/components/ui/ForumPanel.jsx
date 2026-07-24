import React, { useState } from 'react';
import { useForumTopics } from '../../hooks/useApi';
import { useReefStore } from '../../store/useReefStore';
import { MessageSquare, Heart, Send, Waves, Eye, Shield, Sparkles, PlusCircle } from 'lucide-react';

export default function ForumPanel() {
  const { topics, loading, addTopic } = useForumTopics();
  const { setVisualMode, setActiveTab } = useReefStore();
  const [selectedTopicId, setSelectedTopicId] = useState(1);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('PLASTIC_CURRENTS');
  const [newVisualMode, setNewVisualMode] = useState('DEEP_SEA_PLASTIC_CURRENT');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const selectedTopic = topics.find(t => t.id === selectedTopicId) || topics[0];

  const handleTopicClick = (topic) => {
    setSelectedTopicId(topic.id);
    // CRITICAL CORE FEATURE: Transition 3D scene visual mode based on selected topic!
    if (topic.visual_mode === 'DEEP_SEA_PLASTIC_CURRENT') {
      setVisualMode('DEEP_SEA_PLASTIC_CURRENT');
    } else {
      setVisualMode('SURFACE_OCEAN');
    }
  };

  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    addTopic({
      title: newTitle,
      category: newCategory,
      content: newContent,
      visual_mode: newVisualMode
    });
    setNewTitle('');
    setNewContent('');
    setShowCreateForm(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-sans">
      {/* Pop-Art Banner Header */}
      <div className="comic-box bg-popPink text-white p-6 mb-8 shadow-pop-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-black text-popYellow text-xs font-mono font-bold px-2 py-0.5 uppercase">
            COMMUNITY & 3D CURRENT SIMULATION
          </span>
          <h1 className="font-comic text-4xl text-white leading-tight mt-1">
            💬 IMMERSIVE DISCUSSION FORUM
          </h1>
          <p className="text-sm font-mono text-pink-100">
            Selecting a plastic pollution topic dynamically switches the 3D Ocean canvas to deep-sea particle flow mode!
          </p>
        </div>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="comic-box bg-popYellow text-black font-comic text-lg px-4 py-2 flex items-center gap-2 hover:bg-yellow-300 shadow-pop"
        >
          <PlusCircle size={20} /> START TOPIC
        </button>
      </div>

      {/* New Topic Creation Form Modal / Panel */}
      {showCreateForm && (
        <form onSubmit={handleCreateTopic} className="comic-box bg-white text-black p-6 mb-8 shadow-pop-xl border-4 border-black">
          <h3 className="font-comic text-2xl mb-4 text-black border-b-3 border-black pb-2">
            ✏️ CREATE GUARDIAN FORUM TOPIC
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-comic text-gray-700 mb-1">TOPIC TITLE</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Deep Sea Polymer Flow Analysis"
                className="w-full p-2 border-3 border-black font-mono text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-comic text-gray-700 mb-1">CATEGORY & 3D MODE</label>
              <select
                value={newVisualMode}
                onChange={(e) => setNewVisualMode(e.target.value)}
                className="w-full p-2 border-3 border-black font-mono text-sm bg-white"
              >
                <option value="DEEP_SEA_PLASTIC_CURRENT">DEEP-SEA PLASTIC CURRENT MODE</option>
                <option value="SURFACE_OCEAN">SURFACE SUNLIT OCEAN MODE</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-comic text-gray-700 mb-1">DISCUSSION DETAILS</label>
            <textarea
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Describe your research observations..."
              className="w-full p-2 border-3 border-black font-mono text-sm"
              required
            ></textarea>
          </div>
          <button type="submit" className="comic-box bg-popTeal text-black font-comic text-lg px-6 py-2 shadow-pop">
            POST TO GUARDIAN FORUM!
          </button>
        </form>
      )}

      {/* Main Forum Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topic List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h2 className="font-comic text-xl text-popYellow flex items-center gap-2">
            <span>🔥 ACTIVE TOPICS</span>
            <span className="text-xs font-mono text-gray-400">(Click to Trigger 3D Mode)</span>
          </h2>

          {topics.map((topic) => {
            const isSelected = topic.id === selectedTopic?.id;
            return (
              <div
                key={topic.id}
                onClick={() => handleTopicClick(topic)}
                className={`comic-box p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-popYellow text-black border-4 border-black shadow-pop-lg translate-y-[-2px]'
                    : 'bg-white text-black hover:bg-gray-100 shadow-pop-sm'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="bg-black text-white px-2 py-0.5 font-bold">
                    {topic.author_avatar} {topic.author_name}
                  </span>
                  {topic.visual_mode === 'DEEP_SEA_PLASTIC_CURRENT' && (
                    <span className="bg-popRed text-white px-2 py-0.5 font-bold flex items-center gap-1 animate-pulse">
                      <Waves size={12} /> 3D DEEP SEA
                    </span>
                  )}
                </div>

                <h3 className="font-comic text-lg leading-tight mb-2 text-black">
                  {topic.title}
                </h3>

                <p className="text-xs font-sans line-clamp-2 text-gray-800 mb-3">
                  {topic.content}
                </p>

                <div className="flex items-center justify-between text-xs font-mono border-t-2 border-black pt-2">
                  <span className="flex items-center gap-1 font-bold text-popBlue">
                    <Heart size={14} className="fill-popRed text-popRed" /> {topic.likes} LIKES
                  </span>
                  <span className="font-bold underline text-black flex items-center gap-1">
                    <Eye size={14} /> VIEW IN 3D
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Topic Thread View */}
        {selectedTopic && (
          <div className="lg:col-span-7 comic-box bg-white text-black p-6 shadow-pop-lg flex flex-col justify-between">
            <div>
              {/* Visual Mode Active Indicator Banner */}
              <div className="comic-box bg-popTeal p-3 mb-4 text-xs font-comic text-black flex items-center justify-between border-3 border-black">
                <span className="flex items-center gap-2">
                  <Sparkles size={16} /> 3D CANVAS STATE:
                  <strong className="underline uppercase">{selectedTopic.visual_mode}</strong>
                </span>
                <button
                  onClick={() => setActiveTab('globe')}
                  className="bg-black text-popYellow px-2.5 py-1 text-xs font-bold border border-white hover:bg-gray-800"
                >
                  SWITCH TO FULL 3D VIEW 🌍
                </button>
              </div>

              <h2 className="font-comic text-3xl leading-tight mb-2 text-black">
                {selectedTopic.title}
              </h2>

              <div className="flex items-center gap-2 text-xs font-mono text-gray-700 mb-4 pb-3 border-b-3 border-black">
                <span>BY: <strong>{selectedTopic.author_name}</strong></span>
                <span>•</span>
                <span>POSTED: {new Date(selectedTopic.created_at).toLocaleDateString()}</span>
              </div>

              <div className="speech-bubble bg-gray-100 p-4 font-sans text-sm leading-relaxed text-black border-3 border-black mb-6">
                {selectedTopic.content}
              </div>

              {/* Threaded Comments */}
              <h3 className="font-comic text-xl text-black mb-3 border-b-2 border-black pb-1">
                💬 GUARDIAN RESPONSES ({selectedTopic.comments?.length || 0})
              </h3>

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                {selectedTopic.comments && selectedTopic.comments.length > 0 ? (
                  selectedTopic.comments.map((comment) => (
                    <div key={comment.id} className="bg-yellow-50 border-2 border-black p-3 text-xs font-sans">
                      <div className="flex items-center justify-between font-mono mb-1">
                        <span className="font-bold text-popBlue flex items-center gap-1">
                          <Shield size={12} /> {comment.author_name}
                        </span>
                        <span className="bg-popPink text-white px-1.5 py-0.5 text-[10px] font-bold">
                          {comment.author_badge}
                        </span>
                      </div>
                      <p className="text-gray-800">{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-mono text-gray-500 italic">
                    No comments yet. Be the first Guardian to post a reply!
                  </p>
                )}
              </div>
            </div>

            {/* Quick Comment Input */}
            <div className="border-t-3 border-black pt-4 flex gap-2">
              <input
                type="text"
                placeholder="Type your response to this research topic..."
                className="w-full p-2 border-3 border-black font-mono text-xs"
              />
              <button
                onClick={() => alert("Comment submitted to Guardian thread!")}
                className="comic-box bg-popPink text-white font-comic px-4 py-2 text-sm flex items-center gap-1 shrink-0 shadow-pop-sm"
              >
                <Send size={14} /> REPLY
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
