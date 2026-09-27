import React, { useState, useEffect } from 'react';
import { WindowId, WindowState } from '../../types';
import { sound } from '../../services/soundEngine';

interface TaskbarProps {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  isStartMenuOpen: boolean;
  onToggleStartMenu: () => void;
  onToggleWindow: (id: WindowId) => void;
  onOpenWindow: (id: WindowId) => void;
  onShowAlert: (title: string, message: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  isStartMenuOpen,
  onToggleStartMenu,
  onToggleWindow,
  onShowAlert,
}) => {
  const [timeStr, setTimeStr] = useState<string>('12:00:00');
  const [isMuted, setIsMuted] = useState<boolean>(sound.isMuted());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${h}:${m}:${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleNetworkClick = () => {
    sound.chord();
    onShowAlert(
      'DIAL-UP NETWORKING STATUS',
      'Device: US Robotics 56K V.90 FaxModem (COM1)\nSpeed: 56,600 bps\nCompression: V.42bis / MNP5\nStatus: Connected to Station Alpha Backbone Gateway.\nLatency: ~28ms. All subsystems normal.'
    );
  };

  // List of taskbar windows to show
  const taskbarItems: { id: WindowId; label: string; icon: string; color: string }[] = [
    { id: 'win-projects', label: 'Projects.exe', icon: 'folder_zip', color: '#006565' },
    { id: 'win-skills', label: 'Skills.exe', icon: 'memory', color: '#4b53bc' },
    { id: 'win-profile', label: 'About_Me', icon: 'badge', color: '#005e97' },
    { id: 'win-contact', label: 'Contact.exe', icon: 'mail', color: '#006565' },
    { id: 'win-audio', label: 'Retro_Amp', icon: 'headphones', color: '#4b53bc' },
    { id: 'win-theme', label: 'Theme.cpl', icon: 'palette', color: '#005e97' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-10 bg-[#eeeeee] bevel-raised z-50 flex items-center justify-between px-1 select-none">
      {/* Left side: Start Button & Task Items */}
      <div className="flex items-center gap-1.5 h-full py-0.5 overflow-hidden flex-1">
        {/* START BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleStartMenu();
          }}
          type="button"
          className={`h-full px-2.5 flex items-center gap-1.5 font-courier text-[13px] text-[#1a1c1c] font-bold transition-none cursor-pointer ${
            isStartMenuOpen
              ? 'bg-[#ffffff] bevel-sunken font-extrabold translate-x-[1px] translate-y-[1px]'
              : 'bg-[#eeeeee] bevel-raised hover:bg-[#e8e8e8] active:bevel-sunken'
          }`}
        >
          {/* Windows 98 4-color flag badge */}
          <div className="w-4 h-4 grid grid-cols-2 grid-rows-2 gap-[1px] p-[1px] bg-black">
            <div className="bg-[#ff0000]" />
            <div className="bg-[#00aa00]" />
            <div className="bg-[#0000ff]" />
            <div className="bg-[#ffff00]" />
          </div>
          <span className="tracking-wider uppercase">START</span>
        </button>

        <div className="w-[1.5px] h-6 bg-[#bdc9c8] mx-0.5" />

        {/* TASKBAR WINDOW BUTTONS */}
        <div className="flex items-center gap-1 overflow-x-auto flex-1 no-scrollbar">
          {taskbarItems.map((item) => {
            const win = windows[item.id];
            if (!win || !win.isOpen) return null;
            const isActive = activeWindowId === item.id && !win.isMinimized;

            return (
              <button
                key={item.id}
                onClick={() => onToggleWindow(item.id)}
                title={win.title}
                className={`h-7 px-2 flex items-center gap-1.5 text-[#1a1c1c] font-courier text-[11px] max-w-[145px] shrink-0 truncate transition-none ${
                  isActive
                    ? 'bg-[#ffffff] bevel-sunken font-bold translate-x-[0.5px] translate-y-[0.5px]'
                    : 'bg-[#eeeeee] bevel-raised hover:bg-[#e8e8e8] active:bevel-sunken'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right side: System Tray */}
      <div className="flex items-center gap-1.5 h-full py-0.5 shrink-0 pl-1">
        <div className="h-7 px-2 bg-[#eeeeee] bevel-sunken flex items-center gap-1.5 font-courier text-[11px]">
          {/* Speaker / SFX Mute */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Sound FX: Muted (Click to enable)' : 'Sound FX: Active (Click to mute)'}
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px] text-[#3e4949]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
            <span
              className={`text-[9px] px-1 bevel-sunken ${
                isMuted
                  ? 'bg-[#e3e2e2] text-[#6e7979]'
                  : 'bg-[#008080] text-[#ffffff] font-bold'
              }`}
            >
              {isMuted ? 'MUTE' : 'SFX ON'}
            </span>
          </button>

          {/* Network icon */}
          <button
            onClick={handleNetworkClick}
            title="Dial-up / LAN Connected (56.6k) [Click for details]"
            className="flex items-center cursor-pointer hover:opacity-80"
          >
            <span className="material-symbols-outlined text-[15px] text-[#006565]">lan</span>
          </button>

          <div className="w-[1px] h-4 bg-[#bdc9c8]" />

          {/* Digital Clock */}
          <span className="text-[#1a1c1c] font-bold tabular-nums tracking-wide">{timeStr}</span>

          {/* Date stamp */}
          <span className="text-[10px] text-[#3e4949] hidden sm:inline tabular-nums">
            24/10/98
          </span>
        </div>
      </div>
    </footer>
  );
};
