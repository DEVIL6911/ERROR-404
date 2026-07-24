import React, { useState } from 'react';
import { useResearchPapers } from '../../hooks/useApi';
import { BookOpen, Download, Tag, FileText, Sparkles, ExternalLink } from 'lucide-react';

export default function ResearchPaperGrid() {
  const { papers, loading } = useResearchPapers();
  const [selectedTag, setSelectedTag] = useState('ALL');

  const allTags = ['ALL', 'Coral Restoration', 'Super-Corals', 'Micro-fragmentation', 'Plastic Currents'];

  const filteredPapers = selectedTag === 'ALL'
    ? papers
    : papers.filter(p => p.tags.includes(selectedTag));

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-sans">
      {/* Pop-Art Header */}
      <div className="comic-box bg-popYellow text-black p-6 mb-8 shadow-pop-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-black text-popYellow text-xs font-mono font-bold px-2 py-0.5 uppercase">
            ISSUE SCIENCE REPOSITORY
          </span>
          <h1 className="font-comic text-4xl text-black leading-tight mt-1">
            🔬 SUPER-CORAL & OCEAN DYNAMICS PAPERS
          </h1>
          <p className="text-sm font-mono text-gray-800">
            Open-access marine biology research papers integrated into the REEF Guardian platform.
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`comic-box text-xs font-comic px-3 py-1.5 transition-transform ${
                selectedTag === tag
                  ? 'bg-popPink text-white font-extrabold shadow-pop-sm translate-y-[-2px]'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Research Issue Cards */}
      {loading ? (
        <div className="text-center font-comic text-2xl text-popYellow animate-bounce py-12">
          LOADING RESEARCH PAPERS... 🚀
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="comic-box bg-white text-black p-6 shadow-pop-lg hover:shadow-pop-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Comic Science Badge */}
                <div className="flex items-center justify-between mb-3 border-b-3 border-black pb-2">
                  <span className="bg-popTeal font-comic text-sm px-2.5 py-0.5 border-2 border-black font-bold">
                    VOL. {paper.year} • DOI {paper.doi.split('/')[1]}
                  </span>
                  <span className="bg-popOrange text-black text-xs font-mono font-bold px-2 py-0.5 border border-black">
                    {paper.downloads} DOWNLOADS
                  </span>
                </div>

                {/* Comic Headline Callout */}
                <div className="bg-yellow-100 border-2 border-black p-2.5 mb-4 text-xs font-comic text-black shadow-pop-sm flex items-start gap-2">
                  <Sparkles size={18} className="text-popRed shrink-0 mt-0.5" />
                  <span>"{paper.comicSummary}"</span>
                </div>

                <h3 className="font-comic text-2xl leading-tight text-black mb-2">
                  {paper.title}
                </h3>

                <p className="text-xs font-mono text-gray-700 mb-3">
                  <strong className="text-popBlue">AUTHORS:</strong> {paper.authors.join(', ')}
                </p>

                <p className="text-sm text-gray-800 mb-4 line-clamp-4 leading-relaxed font-sans border-l-4 border-popYellow pl-3">
                  {paper.abstract}
                </p>
              </div>

              {/* Card Footer Actions & Tags */}
              <div className="border-t-3 border-black pt-4 mt-2">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {paper.tags.map((t) => (
                    <span key={t} className="bg-gray-100 border border-black text-[10px] font-mono font-bold px-2 py-0.5">
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="comic-box bg-popTeal text-black font-comic text-xs px-3 py-2 flex items-center gap-1 hover:bg-cyan-300"
                  >
                    <ExternalLink size={14} /> VIEW DOI CITATION
                  </a>

                  <button
                    onClick={() => alert(`Downloading research paper PDF: ${paper.title}`)}
                    className="comic-box bg-popPink text-white font-comic text-xs px-3 py-2 flex items-center gap-1 shadow-pop-sm hover:bg-pink-600"
                  >
                    <Download size={14} /> DOWNLOAD PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
