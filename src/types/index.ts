export type WindowId =
  | 'win-projects'
  | 'win-audio'
  | 'win-profile'
  | 'win-skills'
  | 'win-contact'
  | 'win-theme'
  | 'win-game';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number | string;
  height: number | string;
}

export interface WindowState {
  id: WindowId;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  size?: WindowSize;
}

export interface Project {
  id: string;
  title: string;
  category: 'Frontend' | 'UI/UX Design';
  tag: string;
  tagColor: string;
  description: string;
  imageUrl: string;
  versionStatus: string;
  statusBadge: string;
  liveUrl?: string;
  repoUrl?: string;
  techStack: string[];
  features: string[];
  codeSnippet?: string;
  metrics?: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  percentage: number;
  status: string;
  description: string;
  segments: number;
}

export interface SkillTab {
  id: number;
  name: string;
  icon: string;
  headline: string;
  skills: SkillItem[];
  extraNote?: string;
}

export interface AudioTrack {
  id: number;
  title: string;
  artist: string;
  duration: string;
  bitrate: string;
  frequencies: number[];
  audioUrl?: string; // Optional real audio file URL (e.g. .mp3, .ogg, or /audio/song.mp3)
}

export interface ThemeConfig {
  wallpaper: string;
  pattern: 'tiled-grid' | 'clean' | 'dots';
  scanlines: boolean;
  soundEnabled: boolean;
}
