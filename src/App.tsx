/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WindowId, WindowState, ThemeConfig, Project } from './types';
import { sound } from './services/soundEngine';
import { TopBar } from './components/desktop/TopBar';
import { Taskbar } from './components/desktop/Taskbar';
import { StartMenu } from './components/desktop/StartMenu';
import { DesktopIcons } from './components/desktop/DesktopIcons';
import { WindowFrame } from './components/windows/WindowFrame';
import { ProjectsWindow } from './components/windows/ProjectsWindow';
import { ProfileWindow } from './components/windows/ProfileWindow';
import { SkillsWindow } from './components/windows/SkillsWindow';
import { RetroAmpWindow } from './components/windows/RetroAmpWindow';
import { ContactWindow } from './components/windows/ContactWindow';
import { ThemeCplWindow } from './components/windows/ThemeCplWindow';
import { SecretMiniGame } from './components/windows/SecretMiniGame';
import { ProjectDetailModal } from './components/windows/ProjectDetailModal';
import { SystemAlertModal } from './components/desktop/SystemAlertModal';

export default function App() {
  const [theme, setTheme] = useState<ThemeConfig>({
    wallpaper: '#008080',
    pattern: 'tiled-grid',
    scanlines: true,
    soundEnabled: true,
  });

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>('win-audio');
  const [maxZIndex, setMaxZIndex] = useState(40);

  // Selected project for detailed modal preview
  const [selectedProject, setSelectedProject] = useState<{
    project: Project;
    mode: 'demo' | 'code' | 'preview';
  } | null>(null);

  // System alert modal
  const [alertInfo, setAlertInfo] = useState<{ title: string; message: string; icon?: string } | null>(null);

  // Initial window state definitions - RetroAmp opens automatically on launch
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200;

    return {
      'win-projects': {
        id: 'win-projects',
        title: 'C:\\PORTFOLIO\\PROJECTS.EXE',
        iconName: 'folder_zip',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 20,
        position: { x: isMobile ? 8 : 115, y: isMobile ? 8 : 8 }
      },
      'win-audio': {
        id: 'win-audio',
        title: 'RETRO_AMP.EXE',
        iconName: 'headphones',
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 35,
        position: { x: isMobile ? 8 : Math.max(480, screenW - 350), y: isMobile ? 8 : 50 },
      },
      'win-profile': {
        id: 'win-profile',
        title: 'ABOUT_ME.TXT - SYSTEM PROFILE [DYAH]',
        iconName: 'badge',
        isOpen: false, // Opened via icon / start menu / navbar
        isMinimized: false,
        isMaximized: false,
        zIndex: 35,
        position: { x: isMobile ? 8 : Math.max(20, Math.floor((screenW - 680) / 2)), y: 8 },
      },
      'win-skills': {
        id: 'win-skills',
        title: 'PROPERTIES: SKILLS.DLL',
        iconName: 'memory',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 25,
       position: { x: isMobile ? 8 : 220, y: isMobile ? 8 : 8 },
      },
      'win-contact': {
        id: 'win-contact',
        title: 'CONTACT & TRANSMISSION CHANNELS (COM1:)',
        iconName: 'contact_mail',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 26,
        position: { x: isMobile ? 8 : 240, y: isMobile ? 12 : 12 }, 
      },
      'win-theme': {
        id: 'win-theme',
        title: 'DESKTOP_THEME.CPL',
        iconName: 'palette',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 22,
        position: { x: isMobile ? 12 : Math.max(380, screenW - 310), y: isMobile ? 380 : 380 },
      },
      'win-game': {
        id: 'win-game',
        title: 'MINIGAME.BAS - SPACE INVADERS 98',
        iconName: 'sports_esports',
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 36,
        position: { x: isMobile ? 12 : Math.max(30, Math.floor((screenW - 360) / 2)), y: 100 },
      },
    };
  });

  // Focus window and bring to front
  const bringToFront = (id: WindowId, playSound = true) => {
    if (playSound) sound.click();
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setActiveWindowId(id);

    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const openWindow = (id: WindowId) => {
    sound.chord();
    bringToFront(id, false);
  };

  const toggleWindow = (id: WindowId) => {
    const win = windows[id];
    if (!win) return;

    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      bringToFront(id);
    } else if (activeWindowId === id) {
      // Minimize
      sound.close();
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isMinimized: true },
      }));
      setActiveWindowId(null);
    } else {
      bringToFront(id);
    }
  };

  const closeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleMaximizeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
  };

  const handleRestart = () => {
    sound.chord();
    setAlertInfo({
      title: 'RESTARTING RETRO_OS 98',
      message: 'System Alpha reboot initiated.\nReloading shell interface and memory buffers...',
      icon: 'restart_alt',
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleOpenRecycleBin = () => {
    sound.chord();
    setAlertInfo({
      title: 'RECYCLE BIN',
      message: 'The Recycle Bin contains 0 deleted items.\nYour system drive has 1.42 GB available storage.',
      icon: 'delete',
    });
  };

  // Close start menu when clicking on desktop
  const handleDesktopClick = () => {
    if (isStartMenuOpen) {
      sound.close();
      setIsStartMenuOpen(false);
    }
  };

  // Synchronize document body background with wallpaper
  useEffect(() => {
    document.body.style.backgroundColor = theme.wallpaper;
  }, [theme.wallpaper]);

  return (
    <div
      onClick={handleDesktopClick}
      style={{ backgroundColor: theme.wallpaper }}
      className="relative w-full h-screen h-[100dvh] overflow-hidden select-none font-sans"
    >
      {/* Background Pattern */}
      {theme.pattern === 'tiled-grid' && (
        <div className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
      )}
      {theme.pattern === 'dots' && (
        <div className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
      )}

      {/* CRT Scanline Overlay Effect */}
      {theme.scanlines && (
        <div className="pointer-events-none absolute inset-0 z-40 crt-scanlines opacity-35" />
      )}

      {/* TOP NAVIGATION BAR */}
      <TopBar onOpenWindow={openWindow} activePath="desktop" />

      {/* DESKTOP CANVAS WORKSPACE */}
     <main className="relative w-full h-[calc(100vh-80px)] mt-10">
        {/* DESKTOP SHORTCUT ICONS */}
        <DesktopIcons
          onOpenWindow={openWindow}
          onOpenRecycleBin={handleOpenRecycleBin}
        />

        {/* 1. PROJECTS WINDOW */}
        <WindowFrame
          id="win-projects"
          title={windows['win-projects'].title}
          icon={windows['win-projects'].iconName}
          isOpen={windows['win-projects'].isOpen}
          isMinimized={windows['win-projects'].isMinimized}
          isMaximized={windows['win-projects'].isMaximized}
          isActive={activeWindowId === 'win-projects'}
          zIndex={windows['win-projects'].zIndex}
          initialX={windows['win-projects'].position.x}
          initialY={windows['win-projects'].position.y}
          width="min(860px, calc(100vw - 7.5rem))"
          maxWidth="max-w-4xl"
          onFocus={() => bringToFront('win-projects')}
          onClose={() => closeWindow('win-projects')}
          onMinimize={() => minimizeWindow('win-projects')}
          onToggleMaximize={() => toggleMaximizeWindow('win-projects')}
        >
          <ProjectsWindow
            onSelectProject={(project, mode) => {
              setSelectedProject({ project, mode });
            }}
          />
        </WindowFrame>

        {/* 2. RETRO AMP MUSIC PLAYER */}
        <WindowFrame
          id="win-audio"
          title={windows['win-audio'].title}
          icon={windows['win-audio'].iconName}
          isOpen={windows['win-audio'].isOpen}
          isMinimized={windows['win-audio'].isMinimized}
          isMaximized={windows['win-audio'].isMaximized}
          isActive={activeWindowId === 'win-audio'}
          zIndex={windows['win-audio'].zIndex}
          initialX={windows['win-audio'].position.x}
          initialY={windows['win-audio'].position.y}
          width="auto"
          maxWidth="max-w-xs sm:max-w-xs"
          onFocus={() => bringToFront('win-audio')}
          onClose={() => closeWindow('win-audio')}
          onMinimize={() => minimizeWindow('win-audio')}
          onToggleMaximize={() => toggleMaximizeWindow('win-audio')}
        >
          <RetroAmpWindow />
        </WindowFrame>

        {/* 3. ABOUT ME / PROFILE WINDOW */}
        <WindowFrame
          id="win-profile"
          title={windows['win-profile'].title}
          icon={windows['win-profile'].iconName}
          isOpen={windows['win-profile'].isOpen}
          isMinimized={windows['win-profile'].isMinimized}
          isMaximized={windows['win-profile'].isMaximized}
          isActive={activeWindowId === 'win-profile'}
          zIndex={windows['win-profile'].zIndex}
          initialX={windows['win-profile'].position.x}
          initialY={windows['win-profile'].position.y}
          width="min(620px, calc(100vw - 2rem))"
          maxWidth="max-w-xl"
          onFocus={() => bringToFront('win-profile')}
          onClose={() => closeWindow('win-profile')}
          onMinimize={() => minimizeWindow('win-profile')}
          onToggleMaximize={() => toggleMaximizeWindow('win-profile')}
        >
          <ProfileWindow />
        </WindowFrame>

        {/* 4. PROPERTIES: SKILLS.DLL */}
        <WindowFrame
          id="win-skills"
          title={windows['win-skills'].title}
          icon={windows['win-skills'].iconName}
          isOpen={windows['win-skills'].isOpen}
          isMinimized={windows['win-skills'].isMinimized}
          isMaximized={windows['win-skills'].isMaximized}
          isActive={activeWindowId === 'win-skills'}
          zIndex={windows['win-skills'].zIndex}
          initialX={windows['win-skills'].position.x}
          initialY={windows['win-skills'].position.y}
          width="calc(100vw - 2rem)"
          maxWidth="max-w-md"
          onFocus={() => bringToFront('win-skills')}
          onClose={() => closeWindow('win-skills')}
          onMinimize={() => minimizeWindow('win-skills')}
          onToggleMaximize={() => toggleMaximizeWindow('win-skills')}
        >
          <SkillsWindow
            onClose={() => closeWindow('win-skills')}
            onShowAlert={(title, message) => setAlertInfo({ title, message, icon: 'verified' })}
          />
        </WindowFrame>

        {/* 5. CONTACT - SEND MESSAGE */}
        <WindowFrame
          id="win-contact"
          title={windows['win-contact'].title}
          icon={windows['win-contact'].iconName}
          isOpen={windows['win-contact'].isOpen}
          isMinimized={windows['win-contact'].isMinimized}
          isMaximized={windows['win-contact'].isMaximized}
          isActive={activeWindowId === 'win-contact'}
          zIndex={windows['win-contact'].zIndex}
          initialX={windows['win-contact'].position.x}
          initialY={windows['win-contact'].position.y}
          width="calc(100vw - 2rem)"
          maxWidth="max-w-lg"
          onFocus={() => bringToFront('win-contact')}
          onClose={() => closeWindow('win-contact')}
          onMinimize={() => minimizeWindow('win-contact')}
          onToggleMaximize={() => toggleMaximizeWindow('win-contact')}
        >
          <ContactWindow
            onClose={() => closeWindow('win-contact')}
            onShowAlert={(title, message) => setAlertInfo({ title, message, icon: 'mark_email_read' })}
          />
        </WindowFrame>

        {/* 6. DESKTOP THEME CONTROL PANEL */}
        <WindowFrame
          id="win-theme"
          title={windows['win-theme'].title}
          icon={windows['win-theme'].iconName}
          isOpen={windows['win-theme'].isOpen}
          isMinimized={windows['win-theme'].isMinimized}
          isMaximized={windows['win-theme'].isMaximized}
          isActive={activeWindowId === 'win-theme'}
          zIndex={windows['win-theme'].zIndex}
          initialX={windows['win-theme'].position.x}
          initialY={windows['win-theme'].position.y}
          width="auto"
          maxWidth="max-w-xs"
          onFocus={() => bringToFront('win-theme')}
          onClose={() => closeWindow('win-theme')}
          onMinimize={() => minimizeWindow('win-theme')}
          onToggleMaximize={() => toggleMaximizeWindow('win-theme')}
        >
          <ThemeCplWindow
            theme={theme}
            onUpdateTheme={(updates) => setTheme((prev) => ({ ...prev, ...updates }))}
            onClose={() => closeWindow('win-theme')}
            onShowAlert={(title, message) => setAlertInfo({ title, message, icon: 'palette' })}
          />
        </WindowFrame>

        {/* 7. SPACE INVADERS MINIGAME */}
        <WindowFrame
          id="win-game"
          title={windows['win-game'].title}
          icon={windows['win-game'].iconName}
          isOpen={windows['win-game'].isOpen}
          isMinimized={windows['win-game'].isMinimized}
          isMaximized={windows['win-game'].isMaximized}
          isActive={activeWindowId === 'win-game'}
          zIndex={windows['win-game'].zIndex}
          initialX={windows['win-game'].position.x}
          initialY={windows['win-game'].position.y}
          width="auto"
          maxWidth="max-w-sm"
          onFocus={() => bringToFront('win-game')}
          onClose={() => closeWindow('win-game')}
          onMinimize={() => minimizeWindow('win-game')}
          onToggleMaximize={() => toggleMaximizeWindow('win-game')}
        >
          <SecretMiniGame onClose={() => closeWindow('win-game')} />
        </WindowFrame>
      </main>

      {/* START MENU POPUP */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenWindow={openWindow}
        onRestart={handleRestart}
      />

      {/* FIXED BOTTOM TASKBAR */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        isStartMenuOpen={isStartMenuOpen}
        onToggleStartMenu={() => {
          sound.pop();
          setIsStartMenuOpen(!isStartMenuOpen);
        }}
        onToggleWindow={toggleWindow}
        onOpenWindow={openWindow}
        onShowAlert={(title, message) => setAlertInfo({ title, message, icon: 'lan' })}
      />

      {/* PROJECT DETAILS / CODE INSPECTOR MODAL */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject.project}
          mode={selectedProject.mode}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* SYSTEM ALERT MODAL */}
      {alertInfo && (
        <SystemAlertModal
          title={alertInfo.title}
          message={alertInfo.message}
          icon={alertInfo.icon}
          onClose={() => setAlertInfo(null)}
        />
      )}
    </div>
  );
}
