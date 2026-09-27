import React, { useState } from 'react';
import { Project } from '../../types';
import { PROJECTS } from '../../data/portfolioData';
import { sound } from '../../services/soundEngine';

interface ProjectsWindowProps {
  onSelectProject: (project: Project, mode: 'demo' | 'code' | 'preview') => void;
}

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Frontend' | 'UI/UX Design'>('All');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex flex-col flex-1 bg-[#eeeeee]">
      {/* Menu Bar */}
      <div className="flex items-center gap-4 px-2 py-1 font-courier text-[12px] text-[#1a1c1c] bg-[#eeeeee] border-b border-[#bdc9c8]">
        <button
          onClick={() => sound.click()}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          File
        </button>
        <button
          onClick={() => sound.click()}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          Edit
        </button>
        <button
          onClick={() => sound.click()}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          View
        </button>
        <button
          onClick={() => {
            sound.chord();
            alert('RetroOS Explorer v98.4 - Station Alpha Portfolio Browser');
          }}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          Help
        </button>
      </div>

      {/* Explorer Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1 px-2 py-1 bg-[#eeeeee] border-b border-[#dadada]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => sound.click()}
            className="h-6 px-2 bg-[#eeeeee] bevel-raised text-[#1a1c1c] font-courier text-[11px] flex items-center gap-1 active:bevel-sunken hover:bg-[#e8e8e8]"
          >
            <span className="material-symbols-outlined text-[13px]">arrow_back</span> Back
          </button>
          <button
            onClick={() => sound.click()}
            className="h-6 px-2 bg-[#eeeeee] bevel-raised text-[#1a1c1c] font-courier text-[11px] flex items-center gap-1 active:bevel-sunken hover:bg-[#e8e8e8]"
          >
            Forward <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
          </button>
          <div className="w-[1px] h-5 bg-[#bdc9c8] mx-1" />
          <button
            onClick={() => sound.click()}
            className="h-6 px-2 bg-[#eeeeee] bevel-raised text-[#1a1c1c] font-courier text-[11px] flex items-center gap-1 active:bevel-sunken hover:bg-[#e8e8e8]"
          >
            <span className="material-symbols-outlined text-[13px]">grid_view</span> View: Icons
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex items-center flex-1 max-w-sm ml-2 bg-white bevel-sunken px-2 py-0.5 font-courier text-[11px] text-[#1a1c1c] truncate">
          <span className="text-[#6e7979] mr-1 font-bold">Location:</span> C:\PORTFOLIO\FEATURED_WORK
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white bevel-sunken p-3 m-1 overflow-y-auto max-h-[500px]">
        {/* Filter Tabs */}
        {/* Main Content Area */}
<div className="bg-white bevel-sunken p-3 m-1 overflow-y-auto flex-1 min-h-0 max-h-[calc(100vh-210px)]">
          <button
            onClick={() => {
              sound.click();
              setActiveFilter('All');
            }}
            className={`px-3 py-1 font-bold transition-none ${
              activeFilter === 'All'
                ? 'bg-[#eeeeee] bevel-raised border-b-0 text-[#1a1c1c]'
                : 'bg-[#f4f3f3] hover:bg-[#eeeeee] text-[#3e4949]'
            }`}
          >
            All Projects ({PROJECTS.length})
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveFilter('Frontend');
            }}
            className={`px-3 py-1 font-bold transition-none ${
              activeFilter === 'Frontend'
                ? 'bg-[#eeeeee] bevel-raised border-b-0 text-[#1a1c1c]'
                : 'bg-[#f4f3f3] hover:bg-[#eeeeee] text-[#3e4949]'
            }`}
          >
            Frontend Apps
          </button>
          <button
            onClick={() => {
              sound.click();
              setActiveFilter('UI/UX Design');
            }}
            className={`px-3 py-1 font-bold transition-none ${
              activeFilter === 'UI/UX Design'
                ? 'bg-[#eeeeee] bevel-raised border-b-0 text-[#1a1c1c]'
                : 'bg-[#f4f3f3] hover:bg-[#eeeeee] text-[#3e4949]'
            }`}
          >
            UI/UX Design
          </button>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProjects.map((p) => {
            const hasError = imgErrors[p.id];
            return (
              <div
                key={p.id}
                className="bg-[#eeeeee] bevel-raised p-2 flex flex-col justify-between hover:bg-[#e8e8e8] transition-colors"
              >
                <div>
                  {/* Image container with 90s sunken frame & fallback */}
                  <div className="relative w-full h-32 bg-[#1a1c1c] bevel-sunken overflow-hidden mb-2">
                    {!hasError ? (
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(p.id)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      /* Resilient SVG/Retro Fallback Container */
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#002020] to-[#004f4f] p-2 text-center">
                        <span className="material-symbols-outlined text-[32px] text-[#76d6d5]">
                          devices
                        </span>
                        <span className="font-courier text-[10px] text-white font-bold mt-1">
                          {p.title}
                        </span>
                      </div>
                    )}
                    <span
                      style={{ backgroundColor: p.tagColor }}
                      className="absolute top-1 left-1 text-white font-courier text-[10px] px-1 font-bold tracking-wider"
                    >
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="font-courier text-[15px] font-bold text-[#1a1c1c] uppercase tracking-tight">
                    {p.title}
                  </h3>
                  <p className="font-inter text-[12px] text-[#3e4949] mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="mt-3 pt-2 border-t border-[#bdc9c8] flex items-center justify-between">
                  <span className="font-inter text-[11px] font-bold text-[#006565]">
                    {p.statusBadge}
                  </span>

                  <div className="flex items-center gap-1">
                    {p.id === 'pixelcommerce' && (
                      <button
                        onClick={() => {
                          sound.click();
                          onSelectProject(p, 'code');
                        }}
                        className="px-2 py-1 bg-[#eeeeee] bevel-raised font-courier text-[10px] font-bold text-[#1a1c1c] hover:bg-[#000080] hover:text-white active:bevel-sunken"
                      >
                        Inspect Code
                      </button>
                    )}
                    <button
                      onClick={() => {
                        sound.chord();
                        onSelectProject(p, 'demo');
                      }}
                      className="px-3 py-1 bg-[#eeeeee] bevel-raised font-courier text-[11px] font-bold text-[#1a1c1c] hover:bg-[#000080] hover:text-white active:bevel-sunken"
                    >
                      {p.id === 'voxelworld' ? 'Launch ➔' : 'Run Demo ➔'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* System Diagnostic Output (Monospace Log Box) */}
        <div className="mt-3 bg-[#1a1c1c] text-[#93f2f2] bevel-sunken p-2 font-courier text-[11px] leading-relaxed">
          <div className="flex items-center justify-between text-[#6e7979]">
            <span>[SYS_DIAGNOSTIC] MEMORY LOAD: 42%</span>
            <span>TCP/IP: CONNECTED</span>
          </div>
          <div className="mt-1 text-[#76d6d5]">
            &gt; Ready for collaboration. Core competencies: Modern Architecture, Design Systems, Creative Front-End.
          </div>
        </div>
      </div>

      {/* Window Status Bar */}
      <div className="flex items-center gap-1 px-1 py-1 bg-[#eeeeee] text-[#1a1c1c] font-courier text-[11px]">
        <div className="flex-1 bg-[#eeeeee] bevel-sunken px-2 py-0.5 truncate">
          {filteredProjects.length} Object(s) displayed (Total: 4.8MB uncompressed)
        </div>
        <div className="w-32 bg-[#eeeeee] bevel-sunken px-2 py-0.5 text-center">
          DISK SPACE: OK
        </div>
      </div>
    </div>
  );
};
