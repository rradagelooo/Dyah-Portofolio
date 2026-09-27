import React from 'react';
import { sound } from '../../services/soundEngine';

interface SystemAlertModalProps {
  title: string;
  message: string;
  icon?: string;
  onClose: () => void;
}

export const SystemAlertModal: React.FC<SystemAlertModalProps> = ({
  title,
  message,
  icon = 'info',
  onClose,
}) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#eeeeee] bevel-raised p-[3px] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] w-full max-w-sm"
      >
        {/* Title Bar */}
        <div className="title-bar-active flex items-center justify-between px-2 py-1 text-white">
          <span className="font-courier text-[12px] font-bold tracking-wider">{title}</span>
          <button
            onClick={() => {
              sound.close();
              onClose();
            }}
            className="w-4 h-4 bg-[#eeeeee] bevel-raised text-[#1a1c1c] font-bold text-[9px] flex items-center justify-center active:bevel-sunken hover:bg-[#ba1a1a] hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Dialog Content */}
        <div className="p-3 bg-[#eeeeee] flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#008080] text-white flex items-center justify-center shrink-0 bevel-raised">
            <span className="material-symbols-outlined text-[24px]">{icon}</span>
          </div>

          <div className="flex-1 font-courier text-[11px] text-[#1a1c1c] whitespace-pre-line leading-relaxed">
            {message}
          </div>
        </div>

        {/* Buttons */}
        <div className="p-2 pt-0 flex justify-end">
          <button
            onClick={() => {
              sound.click();
              onClose();
            }}
            autoFocus
            className="w-20 py-1 bg-[#eeeeee] bevel-raised hover:bg-[#e8e8e8] active:bevel-sunken text-[#1a1c1c] font-courier text-[11px] font-bold cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
