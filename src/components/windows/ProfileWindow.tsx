import React, { useState } from 'react';
import { USER_PROFILE } from '../../data/portfolioData';
import { sound } from '../../services/soundEngine';

interface ProfileWindowProps {
  onOpenContact?: () => void;
}

export const ProfileWindow: React.FC<ProfileWindowProps> = () => {
  const [avatarError, setAvatarError] = useState(false);

 const handleDownloadResume = () => {
    sound.chord();
    if ((USER_PROFILE as any).resumeUrl) {
      window.open((USER_PROFILE as any).resumeUrl, '_blank');
      return;
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-[#eeeeee]">
      {/* Notepad Menu Bar */}
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
          Search
        </button>
        <button
          onClick={() => {
            sound.chord();
            alert('About Me - RetroOS System Profile Reader v98');
          }}
          className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer underline"
        >
          Help
        </button>
      </div>

      {/* Main Profile Body */}
      <div className="p-3 bg-white bevel-sunken m-1 flex flex-col gap-3 max-h-[520px] overflow-y-auto">
        {/* Header Banner / Author Card */}
        <div className="flex flex-col sm:flex-row gap-3 items-start bg-[#eeeeee] p-2 bevel-raised">
          {/* Pixel Avatar */}
          <div className="w-24 h-24 bg-[#eeeeee] bevel-raised p-1 flex-shrink-0 mx-auto sm:mx-0 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            <div className="w-full h-full bg-[#008080] bevel-sunken overflow-hidden">
              {!avatarError ? (
                <img
                  src={USER_PROFILE.avatarUrl}
                  alt={USER_PROFILE.name}
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#004f4f] flex flex-col items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[36px]">account_circle</span>
                </div>
              )}
            </div>
          </div>

          {/* Info Details */}
          <div className="flex flex-col flex-1 w-full">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <h2 className="font-courier text-lg sm:text-xl text-[#1a1c1c] font-bold tracking-tight">
                {USER_PROFILE.name}
              </h2>
              <span className="font-inter text-[11px] px-2 py-0.5 bg-white bevel-sunken text-[#006565] font-bold">
                ● {USER_PROFILE.status}
              </span>
            </div>
            <p className="font-courier text-[12px] text-[#006565] font-bold uppercase tracking-wider mt-0.5">
              {USER_PROFILE.title}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 font-inter text-[11px]">
              <span className="bg-[#f4f3f3] px-2 py-0.5 bevel-raised text-[#006565] font-bold">
                🟢 {USER_PROFILE.availability}
              </span>
              <span className="bg-[#f4f3f3] px-2 py-0.5 bevel-raised text-[#1a1c1c]">
                📍 {USER_PROFILE.location}
              </span>
              <span className="bg-[#f4f3f3] px-2 py-0.5 bevel-raised text-[#3e4949]">
                ⏰ {USER_PROFILE.timezone}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Bio / Manifesto Box */}
        <div className="bg-[#f4f3f3] bevel-sunken p-3 font-courier text-[12px] text-[#1a1c1c] leading-relaxed flex flex-col gap-2">
          <div className="flex items-center gap-1 font-bold text-[#006565] text-[11px] pb-1 border-b border-[#dadada]">
            <span className="material-symbols-outlined text-[15px]">description</span>
            <span>SYSTEM_BIO.TXT [EXECUTIVE SUMMARY]</span>
          </div>
          <p>{USER_PROFILE.bio}</p>
          <p className="text-[#3e4949] text-[11px]">{USER_PROFILE.subBio}</p>
        </div>

        {/* Action Buttons: Resume, GitHub, LinkedIn */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-courier text-[11px] font-bold">
          <button
            onClick={handleDownloadResume}
            className="py-2.5 px-2 bg-[#eeeeee] bevel-raised hover:bg-[#e8e8e8] text-[#1a1c1c] flex items-center justify-center gap-1.5 active:bevel-sunken shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#006565]">download</span>
            <span>Resume</span>
          </button>

          <a
            href={USER_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click()}
            className="py-2.5 px-2 bg-[#eeeeee] bevel-raised hover:bg-[#000080] hover:text-white text-[#1a1c1c] flex items-center justify-center gap-1.5 active:bevel-sunken shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">code</span>
            <span>GitHub Profile</span>
          </a>

          <a
            href={USER_PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click()}
            className="py-2.5 px-2 bg-[#eeeeee] bevel-raised hover:bg-[#000080] hover:text-white text-[#1a1c1c] flex items-center justify-center gap-1.5 active:bevel-sunken shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">work</span>
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>

      {/* Footnote Status Bar */}
      <div className="px-2 py-1 bg-[#eeeeee] text-[#6e7979] font-courier text-[10px] flex justify-between items-center border-t border-[#bdc9c8]">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
          SECURITY: VERIFIED PROFILE
        </span>
        <span>PROFILE_REVISION: 1998.10.4 // 680x520</span>
      </div>
    </div>
  );
};
