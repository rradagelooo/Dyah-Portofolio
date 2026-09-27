import React, { useState } from 'react';
import { USER_PROFILE } from '../../data/portfolioData';
import { sound } from '../../services/soundEngine';

interface ContactWindowProps {
  onClose: () => void;
  onShowAlert: (title: string, message: string) => void;
}

export const ContactWindow: React.FC<ContactWindowProps> = ({ onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    sound.click();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const contactChannels = [
    {
      key: 'email',
      label: 'Direct Email',
      value: USER_PROFILE.email,
      icon: 'mail',
      color: '#006565',
      actionText: 'Copy',
      isLink: false,
    },
    {
      key: 'discord',
      label: 'Discord',
      value: USER_PROFILE.discord,
      icon: 'headset_mic',
      color: '#005e97',
      actionText: 'Copy ID',
      isLink: false,
    },
    {
      key: 'twitter',
      label: 'X (Twitter)',
      value: USER_PROFILE.twitter,
      icon: 'chat',
      color: '#4b53bc',
      actionText: 'Open',
      isLink: true,
      url: `https://x.com/${USER_PROFILE.twitter.replace('@', '')}`,
    },
    {
      key: 'instagram',
      label: 'Instagram',
      value: USER_PROFILE.instagram,
      icon: 'photo_camera',
      color: '#b83280',
      actionText: 'Open',
      isLink: true,
      url: `https://instagram.com/${USER_PROFILE.instagram.replace('@', '')}`,
    },
  ];

  return (
    <div className="flex flex-col flex-1 bg-[#eeeeee] w-84 sm:w-[490px]">
      {/* Menu Bar */}
      <div className="flex items-center gap-4 px-2 py-1 font-courier text-[12px] text-[#1a1c1c] bg-[#eeeeee] border-b border-[#bdc9c8]">
        <button
          onClick={() => sound.click()}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          Message
        </button>
        <button
          onClick={() => sound.click()}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          Channels
        </button>
        <button
          onClick={() => {
            sound.chord();
            alert('Contact & Transmission Channels - Station Alpha v98');
          }}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          Help
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-3 bg-white bevel-sunken m-1 flex flex-col gap-3 font-courier text-[11px]">
        <div className="flex items-center justify-between pb-1 border-b border-[#dadada]">
          <div className="flex items-center gap-1.5 font-bold text-[#1a1c1c]">
            <span className="material-symbols-outlined text-[16px] text-[#006565]">
              contact_mail
            </span>
            <span>HOW TO REACH ME // OFFICIAL CHANNELS</span>
          </div>
          <span className="text-[10px] text-[#006565] font-bold">● ONLINE</span>
        </div>

        <p className="text-[#3e4949] leading-relaxed text-[11px]">
          Let's connect! Feel free to reach out for project collaborations, job opportunities, or just a friendly tech chat:
        </p>

        {/* Grid of contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {contactChannels.map((c) => (
            <div
              key={c.key}
              className="p-2 bg-[#f4f3f3] bevel-raised flex items-center justify-between gap-2 hover:bg-[#eeeeee]"
            >
              <div className="flex items-center gap-2 truncate">
                <div
                  style={{ backgroundColor: c.color }}
                  className="w-7 h-7 bevel-sunken flex items-center justify-center shrink-0 text-white"
                >
                  <span className="material-symbols-outlined text-[16px]">{c.icon}</span>
                </div>
                <div className="truncate">
                  <span className="text-[9px] text-[#6e7979] block font-bold uppercase tracking-wider">
                    {c.label}
                  </span>
                  <span className="font-bold text-[#1a1c1c] text-[11px] truncate block">
                    {c.value}
                  </span>
                </div>
              </div>

              {c.isLink && c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  className="px-2 py-1 bg-[#eeeeee] bevel-raised hover:bg-[#000080] hover:text-white active:bevel-sunken text-[10px] font-bold shrink-0"
                >
                  {c.actionText} ➔
                </a>
              ) : (
                <button
                  onClick={() => handleCopy(c.value, c.key)}
                  className="px-2 py-1 bg-[#eeeeee] bevel-raised hover:bg-[#000080] hover:text-white active:bevel-sunken text-[10px] font-bold shrink-0 cursor-pointer"
                >
                  {copiedKey === c.key ? 'Copied!' : c.actionText}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Location & Status Notice */}
        <div className="p-2 bg-[#eeeeee] bevel-sunken flex items-center justify-between text-[10px] text-[#3e4949]">
          <span className="flex items-center gap-1 font-bold text-[#006565]">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            {USER_PROFILE.location} ({USER_PROFILE.remote})
          </span>
          <span>TIMEZONE: {USER_PROFILE.timezone}</span>
        </div>
      </div>

      {/* Status Bar & Close Button */}
      <div className="px-2 py-1.5 bg-[#eeeeee] flex items-center justify-between font-courier text-[11px] border-t border-[#bdc9c8]">
        <span className="text-[10px] text-[#6e7979]">
          TRANSMISSION CHANNELS: READY
        </span>
        <button
          onClick={() => {
            sound.click();
            onClose();
          }}
          className="px-4 py-1 bg-[#eeeeee] bevel-raised hover:bg-[#000080] hover:text-white active:bevel-sunken font-bold text-[#1a1c1c] cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
