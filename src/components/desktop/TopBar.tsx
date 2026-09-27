import React, { useState } from 'react';
import { sound } from '../../services/soundEngine';
import { WindowId } from '../../types';
import { USER_PROFILE } from '../../data/portfolioData';

interface TopBarProps {
  onOpenWindow: (id: WindowId) => void;
  activePath: string;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenWindow, activePath }) => {
  const [avatarError, setAvatarError] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 h-10 bg-[#eeeeee] border-b border-[#bdc9c8] z-50 flex items-center justify-between px-3 select-none">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-tr from-[#000080] via-[#008080] to-[#ffb000] bevel-raised-sm p-0.5">
          <span className="material-symbols-outlined text-[16px] text-white">desktop_windows</span>
        </div>
        <span className="font-courier text-[13px] font-bold tracking-tight text-[#1a1c1c]">
          RetroOS v98 <span className="text-[#006565]">[Station Alpha]</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden sm:flex items-center gap-1 font-courier text-[12px]">
        <button
          onClick={() => {
            sound.click();
          }}
          className={`px-3 py-0.5 transition-none text-left ${
            activePath === 'desktop'
              ? 'bg-white text-[#1a1c1c] font-bold bevel-sunken-sm'
              : 'text-[#3e4949] hover:text-[#1a1c1c] hover:bg-[#e8e8e8]'
          }`}
        >
          Desktop
        </button>

        <button
          onClick={() => {
            sound.chord();
            onOpenWindow('win-profile');
          }}
          className="px-3 py-0.5 text-[#3e4949] hover:text-[#1a1c1c] hover:bg-[#e8e8e8] transition-none"
        >
          My Documents
        </button>

        <button
          onClick={() => {
            sound.chord();
            onOpenWindow('win-theme');
          }}
          className="px-3 py-0.5 text-[#3e4949] hover:text-[#1a1c1c] hover:bg-[#e8e8e8] transition-none"
        >
          Control Panel
        </button>
      </nav>

      {/* Profile Avatar & Quick Link */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            sound.chord();
            onOpenWindow('win-profile');
          }}
          title={`User Profile: ${USER_PROFILE.name} [Click to view]`}
          className="w-7 h-7 bg-[#006565] bevel-raised-sm flex items-center justify-center cursor-pointer hover:brightness-110 active:bevel-sunken-sm overflow-hidden p-0.5"
        >
          {!avatarError ? (
            <img
              src={USER_PROFILE.avatarUrl}
              alt={USER_PROFILE.name}
              referrerPolicy="no-referrer"
              onError={() => setAvatarError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-white text-[16px]">person</span>
          )}
        </button>
      </div>
    </header>
  );
};
