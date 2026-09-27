import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../services/soundEngine';

interface SecretMiniGameProps {
  onClose: () => void;
}

export const SecretMiniGame: React.FC<SecretMiniGameProps> = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerX, setPlayerX] = useState(140);
  const [bullets, setBullets] = useState<{ x: number; y: number }[]>([]);
  const [invaders, setInvaders] = useState<{ id: number; x: number; y: number; alive: boolean }[]>([]);

  const gameLoopRef = useRef<number | null>(null);

  // Initialize invaders
  const initGame = () => {
    sound.chord();
    const rows = 3;
    const cols = 6;
    const list = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        list.push({
          id: r * cols + c,
          x: 25 + c * 42,
          y: 20 + r * 28,
          alive: true,
        });
      }
    }
    setInvaders(list);
    setBullets([]);
    setPlayerX(140);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Controls via Keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setPlayerX((prev) => Math.max(10, prev - 15));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setPlayerX((prev) => Math.min(270, prev + 15));
      } else if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        sound.click();
        setBullets((prev) => [...prev, { x: playerX + 10, y: 190 }]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerX]);

  // Main Game Loop
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      // Move bullets
      setBullets((prevBullets) =>
        prevBullets
          .map((b) => ({ ...b, y: b.y - 8 }))
          .filter((b) => b.y > 0)
      );

      // Check bullet-invader collision
      setInvaders((prevInvaders) => {
        return prevInvaders.map((inv) => {
          if (!inv.alive) return inv;
          // Check if any bullet hit this invader
          const hit = bullets.some(
            (b) => Math.abs(b.x - (inv.x + 12)) < 16 && Math.abs(b.y - (inv.y + 10)) < 14
          );
          if (hit) {
            sound.pop();
            setScore((s) => s + 100);
            return { ...inv, alive: false };
          }
          return inv;
        });
      });
    }, 50);

    gameLoopRef.current = interval as unknown as number;
    return () => clearInterval(interval);
  }, [bullets, gameOver]);

  // Check victory
  const allDead = invaders.length > 0 && invaders.every((i) => !i.alive);

  return (
    <div className="bg-[#eeeeee] p-2 flex flex-col items-center gap-2 select-none w-80 sm:w-88">
      {/* Score Header */}
      <div className="w-full bg-[#1a1c1c] text-[#39ff14] px-2 py-1 font-courier text-[11px] bevel-sunken flex justify-between items-center">
        <span>SCORE: {score}</span>
        <span>DEFENSE: 100%</span>
        <span>HIGH: 2400</span>
      </div>

      {/* Retro Canvas Box */}
      <div className="relative w-[300px] h-[220px] bg-black bevel-sunken overflow-hidden border border-[#bdc9c8]">
        {/* Invaders */}
        {invaders.map(
          (inv) =>
            inv.alive && (
              <div
                key={inv.id}
                style={{ left: `${inv.x}px`, top: `${inv.y}px` }}
                className="absolute text-yellow-400 font-bold text-[14px] leading-none transition-all duration-75"
              >
                👾
              </div>
            )
        )}

        {/* Bullets */}
        {bullets.map((b, idx) => (
          <div
            key={idx}
            style={{ left: `${b.x}px`, top: `${b.y}px` }}
            className="absolute w-1 h-3 bg-red-500 rounded-none shadow-[0_0_4px_#ff0000]"
          />
        ))}

        {/* Player Ship */}
        <div
          style={{ left: `${playerX}px`, top: '190px' }}
          className="absolute text-[20px] leading-none transition-all duration-75"
        >
          🚀
        </div>

        {/* Game State Overlay */}
        {allDead && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-[#39ff14] font-courier">
            <span className="text-[16px] font-bold">MISSION ACCOMPLISHED!</span>
            <span className="text-[11px] mt-1">ALL INVADERS PURGED</span>
            <button
              onClick={initGame}
              className="mt-3 px-3 py-1 bg-[#eeeeee] bevel-raised text-[#1a1c1c] text-[11px] font-bold active:bevel-sunken hover:bg-white cursor-pointer"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Tactile On-Screen Gamepad for Mobile/Touch */}
      <div className="flex items-center justify-between w-full px-2 font-courier text-[11px]">
        <div className="flex gap-1">
          <button
            onClick={() => setPlayerX((p) => Math.max(10, p - 20))}
            className="w-10 h-7 bg-[#eeeeee] bevel-raised active:bevel-sunken font-bold hover:bg-[#e8e8e8] cursor-pointer"
          >
            ◀
          </button>
          <button
            onClick={() => setPlayerX((p) => Math.min(270, p + 20))}
            className="w-10 h-7 bg-[#eeeeee] bevel-raised active:bevel-sunken font-bold hover:bg-[#e8e8e8] cursor-pointer"
          >
            ▶
          </button>
        </div>

        <button
          onClick={() => {
            sound.click();
            setBullets((prev) => [...prev, { x: playerX + 10, y: 190 }]);
          }}
          className="px-4 h-7 bg-[#eeeeee] bevel-raised active:bevel-sunken font-bold text-[#ba1a1a] hover:bg-[#e8e8e8] cursor-pointer"
        >
          FIRE [SPACE]
        </button>
      </div>

      <div className="text-[10px] font-courier text-[#6e7979]">
        Keyboard: [← / →] or [A / D] to Move | [SPACEBAR] to Fire
      </div>
    </div>
  );
};
