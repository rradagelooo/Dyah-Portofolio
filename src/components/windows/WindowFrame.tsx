import React, { useRef, useState, useEffect } from 'react';
import { sound } from '../../services/soundEngine';

interface WindowFrameProps {
  id: string;
  title: string;
  icon?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  zIndex: number;
  initialX: number;
  initialY: number;
  width?: string | number;
  maxWidth?: string;
  children: React.ReactNode;
  menuBar?: React.ReactNode;
  statusBar?: React.ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  title,
  icon = 'folder_zip',
  isOpen,
  isMinimized,
  isMaximized,
  isActive,
  zIndex,
  initialX,
  initialY,
  width,
  maxWidth = 'max-w-4xl',
  children,
  menuBar,
  statusBar,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
}) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isMobileScreen, setIsMobileScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, posX: initialX, posY: initialY });

  // Deteksi jika ukuran layar berubah (misal dari desktop ke mobile atau saat HP diputar)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPos({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  if (!isOpen || isMinimized) return null;

  // Di layar HP otomatis full screen agar pas & tidak terpotong ke samping
  const effectiveMaximized = isMaximized || isMobileScreen;

  const handleMouseDown = (e: React.MouseEvent) => {
    // Ignore if clicking on control buttons
    if ((e.target as HTMLElement).closest('button')) return;
    onFocus();
    if (effectiveMaximized) return;

    isDraggingRef.current = true;
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: pos.x,
      posY: pos.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = moveEvent.clientX - dragStartRef.current.mouseX;
      const dy = moveEvent.clientY - dragStartRef.current.mouseY;
      const newX = Math.max(10, Math.min(window.innerWidth - 120, dragStartRef.current.posX + dx));
      const newY = Math.max(45, Math.min(window.innerHeight - 80, dragStartRef.current.posY + dy));
      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const dynamicMaxHeight = effectiveMaximized
    ? '100%'
    : pos.y <= 0
    ? '100%'
    : `calc(100% - ${pos.y}px)`;

  return (
    <div
      onClick={onFocus}
      style={{
        zIndex,
        left: effectiveMaximized ? '0px' : `${pos.x}px`,
        top: effectiveMaximized ? '0px' : `${pos.y}px`,
        width: effectiveMaximized ? '100%' : (width || 'auto'),
        height: effectiveMaximized ? '100%' : 'auto',
        maxWidth: effectiveMaximized ? '100%' : (width ? (typeof width === 'string' ? width : `${width}px`) : undefined),
        maxHeight: dynamicMaxHeight,
      }}
      className={`absolute bg-[#eeeeee] bevel-raised p-[3px] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.45)] select-none flex flex-col min-h-0 ${
        effectiveMaximized ? 'w-full h-full' : maxWidth
      }`}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={() => {
          sound.click();
          onToggleMaximize();
        }}
        className={`flex items-center justify-between px-1.5 py-1 text-white cursor-move select-none shrink-0 ${
          isActive ? 'title-bar-active' : 'title-bar-inactive'
        }`}
      >
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="material-symbols-outlined text-[15px] shrink-0 text-white">
            {icon}
          </span>
          <span className="font-courier text-[12px] font-bold tracking-wider truncate">
            {title}
          </span>
        </div>

        {/* Window control buttons */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.click();
              onMinimize();
            }}
            title="Minimize"
            className="w-4 h-4 bg-[#eeeeee] bevel-raised text-[#1a1c1c] flex items-center justify-center font-bold text-[9px] active:bevel-sunken hover:bg-[#e8e8e8]"
          >
            _
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.click();
              onToggleMaximize();
            }}
            title={effectiveMaximized ? 'Restore' : 'Maximize'}
            className="w-4 h-4 bg-[#eeeeee] bevel-raised text-[#1a1c1c] flex items-center justify-center font-bold text-[9px] active:bevel-sunken hover:bg-[#e8e8e8]"
          >
            {effectiveMaximized ? '❐' : '□'}
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.close();
              onClose();
            }}
            title="Close"
            className="w-4 h-4 bg-[#eeeeee] bevel-raised text-[#1a1c1c] flex items-center justify-center font-bold text-[9px] active:bevel-sunken hover:bg-[#ba1a1a] hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu Bar if present */}
      {menuBar}

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-auto flex flex-col">{children}</div>

      {/* Status Bar if present */}
      {statusBar}
    </div>
  );
};