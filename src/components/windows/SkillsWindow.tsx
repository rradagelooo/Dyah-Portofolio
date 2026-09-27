import React, { useState } from 'react';
import { sound } from '../../services/soundEngine';

interface SkillsWindowProps {
  onClose: () => void;
  onShowAlert: (title: string, message: string) => void;
}

interface SkillIconData {
  id: string;
  name: string; // e.g. "JavaScript", "TypeScript", "React", "HTML5", "CSS3", etc.
  shortName: string; // e.g. "JS", "TS", "React", "Node", etc.
  category: 'Languages & Core' | 'Frameworks & Libs' | 'Styling & Design' | 'Tools & Backend';
  badgeColor: string;
  textColor: string;
  iconSymbol?: string;
  customIcon?: React.ReactNode;
}

export const SkillsWindow: React.FC<SkillsWindowProps> = ({ onClose, onShowAlert }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const skillsList: SkillIconData[] = [
    // Languages
    {
      id: 'js',
      name: 'JavaScript',
      shortName: 'JS',
      category: 'Languages & Core',
      badgeColor: '#F7DF1E',
      textColor: '#000000',
    },
    {
      id: 'ts',
      name: 'TypeScript',
      shortName: 'TS',
      category: 'Languages & Core',
      badgeColor: '#3178C6',
      textColor: '#FFFFFF',
    },
    {
      id: 'cpp',
      name: 'C++',
      shortName: 'C++',
      category: 'Languages & Core',
      badgeColor: '#00599C',
      textColor: '#FFFFFF',
    },
    {
      id: 'python',
      name: 'Python',
      shortName: 'Py',
      category: 'Languages & Core',
      badgeColor: '#3776AB',
      textColor: '#FFD43B',
    },
    {
      id: 'sql',
      name: 'SQL',
      shortName: 'SQL',
      category: 'Languages & Core',
      badgeColor: '#CC292B',
      textColor: '#FFFFFF',
      iconSymbol: 'database',
    },
    {
      id: 'html5',
      name: 'HTML5',
      shortName: 'HTML',
      category: 'Languages & Core',
      badgeColor: '#E34F26',
      textColor: '#FFFFFF',
    },
    {
      id: 'css3',
      name: 'CSS3',
      shortName: 'CSS',
      category: 'Languages & Core',
      badgeColor: '#1572B6',
      textColor: '#FFFFFF',
    },
    // {
    //   id: 'glsl',
    //   name: 'GLSL / Shaders',
    //   shortName: 'GLSL',
    //   category: 'Languages & Core',
    //   badgeColor: '#5586A4',
    //   textColor: '#FFFFFF',
    //   iconSymbol: 'scatter_plot',
    // },

    // Frameworks & Libs
    {
      id: 'react',
      name: 'React',
      shortName: 'React',
      category: 'Frameworks & Libs',
      badgeColor: '#61DAFB',
      textColor: '#000000',
    },
    // {
    //   id: 'nextjs',
    //   name: 'Next.js',
    //   shortName: 'Next',
    //   category: 'Frameworks & Libs',
    //   badgeColor: '#000000',
    //   textColor: '#FFFFFF',
    // },
    // {
    //   id: 'threejs',
    //   name: 'Three.js',
    //   shortName: 'Three',
    //   category: 'Frameworks & Libs',
    //   badgeColor: '#049EF4',
    //   textColor: '#FFFFFF',
    //   iconSymbol: 'view_in_ar',
    // },
    // {
    //   id: 'vue',
    //   name: 'Vue.js',
    //   shortName: 'Vue',
    //   category: 'Frameworks & Libs',
    //   badgeColor: '#42B883',
    //   textColor: '#FFFFFF',
    // },

    // Styling & Design
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      shortName: 'Tailwind',
      category: 'Styling & Design',
      badgeColor: '#06B6D4',
      textColor: '#FFFFFF',
    },
    {
      id: 'figma',
      name: 'Figma',
      shortName: 'Figma',
      category: 'Styling & Design',
      badgeColor: '#F24E1E',
      textColor: '#FFFFFF',
    },
    // {
    //   id: 'sass',
    //   name: 'Sass / SCSS',
    //   shortName: 'Sass',
    //   category: 'Styling & Design',
    //   badgeColor: '#CC6699',
    //   textColor: '#FFFFFF',
    // },

    // Tools & Backend
    {
      id: 'nodejs',
      name: 'Node.js',
      shortName: 'Node',
      category: 'Tools & Backend',
      badgeColor: '#339933',
      textColor: '#FFFFFF',
    },
    {
      id: 'git',
      name: 'Git',
      shortName: 'Git',
      category: 'Tools & Backend',
      badgeColor: '#F05032',
      textColor: '#FFFFFF',
      iconSymbol: 'merge_type',
    },
    {
      id: 'vite',
      name: 'Vite',
      shortName: 'Vite',
      category: 'Tools & Backend',
      badgeColor: '#646CFF',
      textColor: '#FFFFFF',
      iconSymbol: 'bolt',
    },
    // {
    //   id: 'postgres',
    //   name: 'PostgreSQL',
    //   shortName: 'Postgres',
    //   category: 'Tools & Backend',
    //   badgeColor: '#4169E1',
    //   textColor: '#FFFFFF',
    //   iconSymbol: 'database',
    // },
  ];

  const categories = ['All', 'Languages & Core', 'Frameworks & Libs', 'Styling & Design', 'Tools & Backend'];

  const filteredSkills = skillsList.filter((s) => {
    if (activeCategory === 'All') return true;
    return s.category === activeCategory;
  });

  const handleApply = () => {
    sound.chord();
    onShowAlert(
      'SKILLS.DLL INSTALLED',
      'Hardware & Software capabilities registered!\nAll selected technology stacks are operational.'
    );
  };

  return (
    <div className="flex flex-col flex-1 bg-[#eeeeee] w-80 sm:w-[480px]">
      {/* Menu Bar */}
      <div className="flex items-center gap-4 px-2 py-0.5 font-courier text-[11px] text-[#1a1c1c] bg-[#eeeeee] border-b border-[#bdc9c8]">
        <button
          onClick={() => sound.click()}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          View
        </button>
        <button
          onClick={() => sound.click()}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          Options
        </button>
        <button
          onClick={() => {
            sound.chord();
            alert('Skills & Tech Stack Viewer - Hover on any icon to reveal skill name.');
          }}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          Help
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1 px-2 pt-1 pb-1 bg-[#eeeeee] border-b border-[#dadada] font-courier text-[10px] overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sound.click();
              setActiveCategory(cat);
            }}
            className={`px-2 py-0.5 whitespace-nowrap cursor-pointer transition-none ${
              activeCategory === cat
                ? 'bg-[#000080] text-white font-bold bevel-sunken-sm'
                : 'bg-[#eeeeee] text-[#1a1c1c] bevel-raised-sm hover:bg-[#e8e8e8]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid Area */}
      <div className="p-2 bg-white bevel-sunken m-1 flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto">
        {/* Instructions banner */}
        <div className="bg-[#f4f3f3] bevel-raised px-2 py-1 flex items-center justify-between font-courier text-[10px] text-[#1a1c1c]">
          <div className="flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px] text-[#006565]">
              touch_app
            </span>
            <span>Arahkan kursor / klik icon:</span>
          </div>
          <span className="text-[10px] text-[#006565] font-bold">
            {filteredSkills.length} SKILLS
          </span>
        </div>

        {/* Icon Grid (6 columns to stay short and fit completely) */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1.5 py-0.5">
          {filteredSkills.map((skill) => {
            const isHovered = hoveredSkill === skill.id;
            const isSelected = selectedSkill === skill.id;

            return (
              <div
                key={skill.id}
                onMouseEnter={() => {
                  sound.click();
                  setHoveredSkill(skill.id);
                }}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => {
                  sound.pop();
                  setSelectedSkill(skill.id);
                }}
                title={skill.name}
                className="relative group flex flex-col items-center justify-center cursor-pointer"
              >
                {/* 3D Beveled Icon Container */}
                <div
                  className={`w-11 h-11 bg-[#eeeeee] bevel-raised p-1 flex flex-col items-center justify-center transition-transform shadow-[1px_1px_0px_rgba(0,0,0,0.25)] group-active:bevel-sunken ${
                    isHovered || isSelected ? 'ring-2 ring-[#000080] bg-[#e8e8ff] scale-105' : ''
                  }`}
                >
                  {/* Skill Badge Box */}
                  <div
                    style={{ backgroundColor: skill.badgeColor, color: skill.textColor }}
                    className="w-full h-full bevel-sunken flex flex-col items-center justify-center font-courier font-bold select-none p-0.5 leading-none"
                  >
                    {skill.iconSymbol ? (
                      <span className="material-symbols-outlined text-[15px]">
                        {skill.iconSymbol}
                      </span>
                    ) : (
                      <span className="text-[10px] tracking-tight">{skill.shortName}</span>
                    )}
                  </div>
                </div>

                {/* Sub-label text */}
                <span
                  className={`mt-0.5 font-courier text-[9px] font-bold px-0.5 text-center transition-none truncate max-w-full ${
                    isHovered || isSelected
                      ? 'bg-[#000080] text-white'
                      : 'text-[#1a1c1c] group-hover:bg-[#000080] group-hover:text-white'
                  }`}
                >
                  {isHovered || isSelected ? skill.name : skill.shortName}
                </span>

                {/* Floating Retro Tooltip Balloon */}
                {isHovered && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-50 bg-[#ffffe1] text-[#000000] border border-[#000000] px-1.5 py-0.5 text-[10px] font-courier font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.4)] whitespace-nowrap pointer-events-none">
                    {skill.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Status / Selected Display */}
        <div className="mt-auto bg-[#f4f3f3] bevel-sunken px-2 py-1 font-courier text-[10px] flex items-center justify-between text-[#1a1c1c]">
          <span className="font-bold text-[#006565] truncate max-w-[280px]">
            ACTIVE: {hoveredSkill ? skillsList.find((s) => s.id === hoveredSkill)?.name : selectedSkill ? skillsList.find((s) => s.id === selectedSkill)?.name : 'Hover icon di atas'}
          </span>
          <span className="text-[9px] text-[#6e7979] shrink-0">
            {hoveredSkill || selectedSkill ? '100% OPERATIONAL' : 'READY'}
          </span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mx-1 mb-1 px-1.5 py-0.5 bg-[#eeeeee] bevel-sunken flex items-center justify-between font-courier text-[9px] text-[#1a1c1c]">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
          Proficiency: Verified
        </span>
        <span className="text-[#6e7979] font-bold">{skillsList.length} DLL MODULES</span>
      </div>

      {/* Dialog Buttons: OK, Cancel, Apply */}
      <div className="px-2 pb-1.5 flex items-center justify-end gap-1.5 font-courier text-[10px] font-bold">
        <button
          onClick={() => {
            sound.click();
            onClose();
          }}
          className="w-16 px-2 py-0.5 bg-[#eeeeee] bevel-raised hover:bg-[#e8e8e8] active:bevel-sunken text-[#1a1c1c] cursor-pointer"
        >
          OK
        </button>
        <button
          onClick={() => {
            sound.click();
            onClose();
          }}
          className="w-16 px-2 py-0.5 bg-[#eeeeee] bevel-raised hover:bg-[#e8e8e8] active:bevel-sunken text-[#1a1c1c] cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="w-16 px-2 py-0.5 bg-[#eeeeee] bevel-raised hover:bg-[#e8e8e8] active:bevel-sunken text-[#1a1c1c] cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
