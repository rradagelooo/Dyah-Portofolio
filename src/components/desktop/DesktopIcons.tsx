import React, { useState } from 'react';
import { WindowId } from '../../types';
import { sound } from '../../services/soundEngine';

interface DesktopIconsProps {
  onOpenWindow: (id: WindowId) => void;
  onOpenRecycleBin: () => void;
}

interface DesktopIconItem {
  id: string;
  windowId?: WindowId;
  label: string;
  icon: string;
  action?: () => void;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({
  onOpenWindow,
  onOpenRecycleBin,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const icons: DesktopIconItem[] = [
    {
      id: 'icon-about',
      windowId: 'win-profile',
      label: 'About Me',
      icon: 'badge',
    },
    {
      id: 'icon-projects',
      windowId: 'win-projects',
      label: 'Projects',
      icon: 'folder_special',
    },
    {
      id: 'icon-skills',
      windowId: 'win-skills',
      label: 'Skills',
      icon: 'save',
    },
    {
      id: 'icon-contact',
      windowId: 'win-contact',
      label: 'Contact',
      icon: 'mail',
    },
    {
      id: 'icon-audio',
      windowId: 'win-audio',
      label: 'Retro Amp',
      icon: 'headphones',
    },
    {
      id: 'icon-trash',
      label: 'Recycle Bin',
      icon: 'delete',
      action: onOpenRecycleBin,
    },
  ];

  const handleIconClick = (item: DesktopIconItem) => {
    sound.click();
    setSelectedId(item.id);
  };

  const handleIconDoubleClick = (item: DesktopIconItem) => {
    sound.chord();
    if (item.action) {
      item.action();
    } else if (item.windowId) {
      onOpenWindow(item.windowId);
    }
  };

  return (
    <div
      onClick={() => setSelectedId(null)}
      className="absolute top-12 left-3 flex flex-col gap-4 z-10 w-24 select-none"
    >
      {icons.map((item) => {
        const isSelected = selectedId === item.id;
        return (
          <div
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              handleIconClick(item);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleIconDoubleClick(item);
            }}
            className="flex flex-col items-center p-1 cursor-pointer group rounded-none"
          >
            {/* 3D Beveled Icon Container */}
            <div
              className={`w-12 h-12 bg-[#eeeeee] bevel-raised flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.3)] group-active:bevel-sunken ${
                isSelected ? 'ring-1 ring-white bg-[#e0e0ff]' : ''
              }`}
            >
              <span
                className={`material-symbols-outlined text-[30px] ${
                  isSelected ? 'text-[#000080]' : 'text-[#006565]'
                }`}
              >
                {item.icon}
              </span>
            </div>

            {/* Icon Label */}
            <span
              className={`mt-1 px-1 font-courier text-[11px] font-bold text-center tracking-tight line-clamp-1 border ${
                isSelected
                  ? 'bg-[#000080] text-white border-dotted border-white'
                  : 'bg-[#008080]/80 text-white border-transparent group-hover:bg-[#000080]'
              }`}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
