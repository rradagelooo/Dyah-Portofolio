import React from 'react';
import { ThemeConfig } from '../../types';
import { sound } from '../../services/soundEngine';

interface ThemeCplWindowProps {
  theme: ThemeConfig;
  onUpdateTheme: (updates: Partial<ThemeConfig>) => void;
  onClose: () => void;
  onShowAlert: (title: string, message: string) => void;
}

export const ThemeCplWindow: React.FC<ThemeCplWindowProps> = ({
  theme,
  onUpdateTheme,
  onShowAlert,
}) => {
  const wallpapers = [
    { label: 'Classic Teal', color: '#008080' },
    { label: 'Royal Navy', color: '#3b6ea5' },
    { label: 'Matrix Gray', color: '#555555' },
    { label: 'Pine Green', color: '#2b5543' },
    { label: 'Retro Burgundy', color: '#6b2c45' },
  ];

  const handleApply = () => {
    sound.chord();
    onShowAlert('DESKTOP THEME CPL', 'Display settings updated! Wallpaper palette and rasterizer reloaded.');
  };

  return (
    <div className="p-2 bg-[#eeeeee] flex flex-col gap-2 font-courier text-[11px] w-72">
      <span className="font-bold text-[#1a1c1c] text-[10px] uppercase">
        Wallpaper Palette:
      </span>

      {/* Color Palettes Grid */}
      <div className="grid grid-cols-5 gap-1 p-1 bg-white bevel-sunken">
        {wallpapers.map((w) => (
          <button
            key={w.color}
            onClick={() => {
              sound.click();
              onUpdateTheme({ wallpaper: w.color });
            }}
            title={w.label}
            style={{ backgroundColor: w.color }}
            className={`h-7 bevel-raised active:bevel-sunken cursor-pointer transition-none ${
              theme.wallpaper === w.color ? 'ring-2 ring-white scale-95' : ''
            }`}
          />
        ))}
      </div>

      {/* Pattern Selector */}
      <div className="flex items-center justify-between text-[11px] text-[#1a1c1c]">
        <label className="font-bold" htmlFor="theme-pattern">
          Pattern:
        </label>
        <select
          id="theme-pattern"
          value={theme.pattern}
          onChange={(e) => {
            sound.click();
            onUpdateTheme({ pattern: e.target.value as ThemeConfig['pattern'] });
          }}
          className="bg-white bevel-sunken px-2 py-0.5 text-[#1a1c1c] font-courier text-[10px] focus:outline-none"
        >
          <option value="tiled-grid">Tiled Grid</option>
          <option value="clean">Solid Color</option>
          <option value="dots">Subtle Dot Matrix</option>
        </select>
      </div>

      {/* CRT Scanline Toggle */}
      <div className="flex items-center justify-between text-[11px] text-[#1a1c1c]">
        <span className="font-bold">CRT Scanline Effect:</span>
        <button
          onClick={() => {
            sound.click();
            onUpdateTheme({ scanlines: !theme.scanlines });
          }}
          className="px-2 py-0.5 bg-[#eeeeee] bevel-raised active:bevel-sunken font-bold text-[10px] hover:bg-[#e8e8e8]"
        >
          {theme.scanlines ? '[X] ENABLED' : '[ ] DISABLED'}
        </button>
      </div>

      {/* Bottom Apply */}
      <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#bdc9c8] text-[10px]">
        <span className="text-[#6e7979]">Status: Active</span>
        <button
          onClick={handleApply}
          className="px-3 py-1 bg-[#eeeeee] bevel-raised font-bold text-[#1a1c1c] active:bevel-sunken hover:bg-[#000080] hover:text-white cursor-pointer"
        >
          Apply Theme
        </button>
      </div>
    </div>
  );
};
