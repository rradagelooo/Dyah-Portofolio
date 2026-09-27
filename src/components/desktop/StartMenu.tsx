import React from 'react';
import { WindowId } from '../../types';
import { sound } from '../../services/soundEngine';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
  onRestart: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenWindow,
  onRestart,
}) => {
  if (!isOpen) return null;

  const handleItemClick = (id: WindowId) => {
    sound.chord();
    onOpenWindow(id);
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-11 left-1 z-50 w-64 bg-[#eeeeee] bevel-raised p-[3px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] select-none"
    >
      <div className="flex">
        {/* Windows 98 vertical banner */}
        <div className="w-8 bg-gradient-to-t from-[#008080] via-[#0040a0] to-[#000080] flex items-end justify-center py-3 select-none">
          <span className="font-courier text-white font-bold [writing-mode:vertical-rl] rotate-180 tracking-widest text-[13px]">
            RETRO<b className="text-[#ffd700]">98</b>
          </span>
        </div>

        {/* Menu Items */}
        <div className="flex-1 flex flex-col py-1 font-courier text-[12px] text-[#1a1c1c]">
          <button
            onClick={() => handleItemClick('win-profile')}
            className="flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#000080] hover:text-white w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006565] group-hover:text-white">
              account_box
            </span>
            <span>Tentang_Saya.txt</span>
          </button>

          <button
            onClick={() => handleItemClick('win-projects')}
            className="flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#000080] hover:text-white w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006565] group-hover:text-white">
              folder_special
            </span>
            <span>Proyek_Portfolio</span>
          </button>

          <button
            onClick={() => handleItemClick('win-skills')}
            className="flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#000080] hover:text-white w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#4b53bc] group-hover:text-white">
              memory
            </span>
            <span>Skills_Viewer.exe</span>
          </button>

          <button
            onClick={() => handleItemClick('win-contact')}
            className="flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#000080] hover:text-white w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006565] group-hover:text-white">
              mail
            </span>
            <span>Send_Mail.exe</span>
          </button>

          <button
            onClick={() => handleItemClick('win-audio')}
            className="flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#000080] hover:text-white w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#4b53bc] group-hover:text-white">
              album
            </span>
            <span>RetroPlayer.mp3</span>
          </button>

          <div className="h-[1.5px] bg-[#bdc9c8] my-1 mx-1" />

          <button
            onClick={() => handleItemClick('win-theme')}
            className="flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#000080] hover:text-white w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#005e97] group-hover:text-white">
              palette
            </span>
            <span>Theme_Settings.cpl</span>
          </button>

          <button
            onClick={() => handleItemClick('win-game')}
            className="flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#000080] hover:text-white w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ba1a1a] group-hover:text-white">
              sports_esports
            </span>
            <span>MiniGame.bas</span>
          </button>

          <div className="h-[1.5px] bg-[#bdc9c8] my-1 mx-1" />

          <button
            onClick={() => {
              sound.click();
              onRestart();
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-left hover:bg-[#ba1a1a] hover:text-white w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#6e7979] group-hover:text-white">
              power_settings_new
            </span>
            <span>Restart RetroOS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
