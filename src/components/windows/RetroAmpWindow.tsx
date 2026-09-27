import React, { useState, useEffect, useRef } from 'react';
import { AUDIO_TRACKS } from '../../data/portfolioData';
import { sound } from '../../services/soundEngine';
import { AudioTrack } from '../../types';

export const RetroAmpWindow: React.FC = () => {
  const [tracks, setTracks] = useState<AudioTrack[]>(() => {
    return [...AUDIO_TRACKS];
  });
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(75);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [durationSecs, setDurationSecs] = useState(210);
  const [barHeights, setBarHeights] = useState<number[]>([40, 75, 60, 90, 50, 80, 35, 70, 45, 65]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Auto-resume playback on first user click if browser blocked initial autoplay
  useEffect(() => {
    const handleFirstGesture = () => {
      if (audioRef.current && isPlaying && currentTrack.audioUrl) {
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [isPlaying, currentTrack.audioUrl]);

  // Sync volume with real HTML Audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle Play / Pause for real Audio element or simulated track
  useEffect(() => {
    if (!audioRef.current) return;

    if (currentTrack.audioUrl) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Browser autoplay policy might require direct user gesture
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, currentTrack.audioUrl]);

  // Switch track source
  useEffect(() => {
    if (audioRef.current && currentTrack.audioUrl) {
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrackIndex, currentTrack.audioUrl]);

  // Animated equalizer
  useEffect(() => {
    if (!isPlaying) {
      setBarHeights([10, 10, 10, 10, 10, 10, 10, 10, 10, 10]);
      return;
    }

    const interval = setInterval(() => {
      setBarHeights(
        Array.from({ length: 10 }, () => Math.floor(Math.random() * 85) + 15)
      );
    }, 180);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Timer increment (if no real audio duration, fallback to simulator)
  useEffect(() => {
    if (!isPlaying || currentTrack.audioUrl) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => (prev >= durationSecs ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, durationSecs, currentTrack.audioUrl]);

  // Real audio time updates
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setSecondsElapsed(Math.floor(audioRef.current.currentTime));
      if (!isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
        setDurationSecs(Math.floor(audioRef.current.duration));
      }
    }
  };

  const handleAudioEnded = () => {
    handleNext();
  };

  const formatTime = (secs: number) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePlayPause = () => {
    sound.click();
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    sound.click();
    setIsPlaying(false);
    setSecondsElapsed(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleNext = () => {
    sound.click();
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setSecondsElapsed(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    sound.click();
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setSecondsElapsed(0);
    setIsPlaying(true);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    sound.click();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
    setVolume(pct);
  };

  // Upload custom song from local file (.mp3, .wav, .ogg)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      sound.chord();
      const localAudioUrl = URL.createObjectURL(file);
      const newTrack: AudioTrack = {
        id: Date.now(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'My Audio File',
        duration: 'Custom',
        bitrate: '320 KBPS',
        frequencies: [60, 80, 70, 90, 85, 75, 65, 80, 70, 60],
        audioUrl: localAudioUrl,
      };

      setTracks((prev) => [newTrack, ...prev]);
      setCurrentTrackIndex(0);
      setSecondsElapsed(0);
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-2 bg-[#eeeeee] flex flex-col gap-2 select-none w-72 sm:w-84">
      {/* Hidden real audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />

      {/* Green LCD Display Chassis */}
      <div className="bg-black bevel-sunken p-2 flex flex-col gap-1 border-2 border-[#dadada]">
        <div className="flex items-center justify-between text-[#39ff14] font-courier text-[10px]">
          <span className={isPlaying ? 'animate-pulse' : 'opacity-60'}>● STEREO</span>
          <span className="tabular-nums">
            {formatTime(secondsElapsed)} / {currentTrack.audioUrl ? formatTime(durationSecs) : currentTrack.duration}
          </span>
          <span>{currentTrack.bitrate}</span>
        </div>

        {/* Scrolling Marquee Title */}
        <div className="overflow-hidden whitespace-nowrap bg-[#001800] p-1 bevel-sunken">
          <div className="text-[#39ff14] font-courier text-[12px] font-bold tracking-widest inline-block animate-marquee">
            ♪ {currentTrack.title} ~ {currentTrack.artist} ~ Station Alpha 98.4 FM ~
          </div>
        </div>

        {/* Visualizer Equalizer Bars */}
        <div className="flex items-end justify-between h-8 pt-1 gap-1 px-1">
          {barHeights.map((h, i) => {
            const barColor =
              i === 2 || i === 8
                ? 'bg-[#e0e0ff]'
                : i === 5
                ? 'bg-[#ffd700]'
                : 'bg-[#39ff14]';
            return (
              <div
                key={i}
                className={`w-full ${barColor} transition-all duration-150`}
                style={{ height: `${h}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Tactile Media Controls */}
      <div className="grid grid-cols-5 gap-1 font-courier text-[11px] font-bold">
        <button
          onClick={handlePrev}
          title="Previous Track"
          className="h-7 bg-[#eeeeee] bevel-raised active:bevel-sunken flex items-center justify-center hover:bg-[#e8e8e8] cursor-pointer"
        >
          ⏮
        </button>
        <button
          onClick={handlePlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
          className="h-7 bg-[#eeeeee] bevel-raised active:bevel-sunken flex items-center justify-center text-[#006565] font-extrabold hover:bg-[#e8e8e8] cursor-pointer"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          onClick={() => {
            sound.click();
            setIsPlaying(false);
          }}
          title="Pause"
          className="h-7 bg-[#eeeeee] bevel-raised active:bevel-sunken flex items-center justify-center hover:bg-[#e8e8e8] cursor-pointer"
        >
          ⏸
        </button>
        <button
          onClick={handleStop}
          title="Stop"
          className="h-7 bg-[#eeeeee] bevel-raised active:bevel-sunken flex items-center justify-center text-[#ba1a1a] hover:bg-[#e8e8e8] cursor-pointer"
        >
          ⏹
        </button>
        <button
          onClick={handleNext}
          title="Next Track"
          className="h-7 bg-[#eeeeee] bevel-raised active:bevel-sunken flex items-center justify-center hover:bg-[#e8e8e8] cursor-pointer"
        >
          ⏭
        </button>
      </div>

      {/* Volume Deck */}
      <div className="flex items-center gap-2 px-1 font-courier text-[10px] text-[#1a1c1c]">
        <span className="font-bold">VOL:</span>
        <div
          onClick={handleVolumeClick}
          title="Click to adjust volume"
          className="flex-1 h-3 bg-white bevel-sunken relative cursor-pointer"
        >
          <div className="h-full bg-[#006565]" style={{ width: `${volume}%` }} />
        </div>
        <span className="font-bold tabular-nums w-8 text-right">{volume}%</span>
      </div>

      {/* Track Selector Dropdown & Eject/Load Button */}
      <div className="flex items-center gap-1 font-courier text-[10px]">
        <select
          value={currentTrackIndex}
          onChange={(e) => {
            sound.click();
            setCurrentTrackIndex(Number(e.target.value));
            setSecondsElapsed(0);
            setIsPlaying(true);
          }}
          className="flex-1 bg-white bevel-sunken px-1 py-0.5 text-[#1a1c1c] text-[10px] font-courier focus:outline-none truncate"
        >
          {tracks.map((t, idx) => (
            <option key={t.id} value={idx}>
              {idx + 1}. {t.title}
            </option>
          ))}
        </select>

        {/* Load MP3 / Audio Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/mp3,audio/wav,audio/ogg,audio/mpeg"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => {
            sound.click();
            fileInputRef.current?.click();
          }}
          title="Buka file audio MP3/WAV/OGG dari komputermu"
          className="px-2 py-0.5 bg-[#eeeeee] bevel-raised hover:bg-[#000080] hover:text-white active:bevel-sunken flex items-center gap-1 text-[10px] font-bold text-[#1a1c1c] cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[13px]">eject</span>
          <span>Open MP3</span>
        </button>
      </div>
    </div>
  );
};
