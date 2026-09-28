import React, { useState } from 'react';
import { Project } from '../../types';
import { sound } from '../../services/soundEngine';

interface ProjectDetailModalProps {
  project: Project;
  mode: 'demo' | 'code' | 'preview';
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  mode,
  onClose,
}) => {
  // States for interactive demos
  const [synthWave, setSynthWave] = useState<'sine' | 'triangle' | 'square' | 'sawtooth'>('sawtooth');
  const [synthFreq, setSynthFreq] = useState(440);
  const [cartItems, setCartItems] = useState([
    { name: 'Vintage 1998 Mouse Pad', price: 9.99, qty: 1 },
    { name: '16MB SDRAM Expansion Kit', price: 29.50, qty: 2 },
  ]);
  const [receiptPrinted, setReceiptPrinted] = useState(false);
  const [voxelHeight, setVoxelHeight] = useState(6);

  const cartTotal = cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-3 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#eeeeee] bevel-raised p-[3px] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.6)] w-full max-w-xl max-h-[90vh] flex flex-col"
      >
        {/* Title Bar */}
        <div className="title-bar-active flex items-center justify-between px-2 py-1 text-white">
          <div className="flex items-center gap-1.5 font-courier text-[12px] font-bold">
            <span className="material-symbols-outlined text-[15px]">
              {mode === 'code' ? 'code' : 'smart_display'}
            </span>
            <span>
              {project.title} - {mode === 'code' ? 'SOURCE CODE INSPECTOR' : 'RUN DEMO'}
            </span>
          </div>
          <button
            onClick={() => {
              sound.close();
              onClose();
            }}
            className="w-4 h-4 bg-[#eeeeee] bevel-raised text-[#1a1c1c] font-bold text-[9px] flex items-center justify-center active:bevel-sunken hover:bg-[#ba1a1a] hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3 bg-white bevel-sunken m-1 overflow-y-auto flex-1 flex flex-col gap-3 font-courier text-[11px]">
          {/* Header Summary */}
          <div className="flex items-start justify-between border-b border-[#dadada] pb-2">
            <div>
              <h3 className="font-bold text-[14px] text-[#1a1c1c]">{project.title}</h3>
              <p className="text-[#3e4949] text-[11px] mt-0.5">{project.description}</p>
            </div>
            <span
              style={{ backgroundColor: project.tagColor }}
              className="text-white text-[10px] font-bold px-1.5 py-0.5"
            >
              {project.tag}
            </span>
          </div>

          {/* CODE INSPECTOR VIEW */}
          {mode === 'code' && (
            <div className="flex flex-col gap-2">
              <span className="font-bold text-[#1a1c1c]">Source Architecture Snippet:</span>
              <pre className="bg-[#1a1c1c] text-[#93f2f2] p-2.5 bevel-sunken text-[11px] overflow-x-auto leading-relaxed">
                {project.codeSnippet || '// Source implementation clean and compiled'}
              </pre>

              <div className="mt-2">
                <span className="font-bold text-[#1a1c1c] block mb-1">Key Engineering Specs:</span>
                <ul className="list-disc pl-4 space-y-1 text-[#3e4949]">
                  {project.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* INTERACTIVE DEMO VIEW */}
          {mode !== 'code' && (
            <div className="flex flex-col gap-3">
              {project.id === 'cybersynth' && (
                <div className="flex flex-col gap-2 bg-[#f4f3f3] p-2.5 bevel-sunken">
                  <div className="flex justify-between items-center text-[#006565] font-bold">
                    <span>OSCILLOSCOPE RENDERER [GLSL SHADER]</span>
                    <span className="animate-pulse">● 60 FPS</span>
                  </div>

                  {/* Interactive Oscilloscope Canvas simulation */}
                  <div className="h-28 bg-black bevel-sunken relative overflow-hidden flex items-center justify-center">
                    <svg className="w-full h-full text-[#39ff14]" viewBox="0 0 300 100">
                      <path
                        d={`M 0,50 Q 75,${50 - synthFreq / 10} 150,50 T 300,50`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="absolute bottom-1 right-2 text-[#39ff14] text-[9px]">
                      {synthWave.toUpperCase()} @ {synthFreq}Hz
                    </span>
                  </div>

                  {/* Waveform Selector */}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold">Oscillator:</span>
                    {(['sine', 'triangle', 'square', 'sawtooth'] as const).map((w) => (
                      <button
                        key={w}
                        onClick={() => {
                          sound.click();
                          setSynthWave(w);
                        }}
                        className={`px-2 py-0.5 bevel-raised text-[10px] cursor-pointer ${
                          synthWave === w ? 'bg-[#000080] text-white font-bold' : 'bg-[#eeeeee]'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>

                  {/* Frequency Slider */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Pitch ({synthFreq}Hz):</span>
                    <input
                      type="range"
                      min={120}
                      max={880}
                      value={synthFreq}
                      onChange={(e) => setSynthFreq(Number(e.target.value))}
                      className="flex-1 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {project.id === 'pixelcommerce' && (
                <div className="flex flex-col gap-2 bg-[#f4f3f3] p-2.5 bevel-sunken">
                  <div className="flex justify-between items-center font-bold text-[#4b53bc]">
                    <span>VINTAGE STORE CHECKOUT WORKFLOW</span>
                    <span>SESSION: #ORD-984</span>
                  </div>

                  {/* Simulated Cart Items */}
                  <div className="bg-white bevel-sunken p-2 flex flex-col gap-1.5">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px]">
                        <span>
                          {item.qty}x {item.name}
                        </span>
                        <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-[#dadada] pt-1 flex justify-between font-bold text-[11px] text-[#1a1c1c]">
                      <span>ORDER TOTAL:</span>
                      <span className="text-[#006565]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {receiptPrinted ? (
                    <div className="bg-amber-50 p-2 bevel-sunken text-emerald-800 text-[10px] font-bold">
                      ✓ RECEIPT DISPATCHED VIA THERMAL PRINTER! WEBHOOK VERIFIED.
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        sound.chord();
                        setReceiptPrinted(true);
                      }}
                      className="py-1 px-3 bg-[#eeeeee] bevel-raised active:bevel-sunken hover:bg-[#000080] hover:text-white font-bold cursor-pointer text-center"
                    >
                      Process Transaction &amp; Print Receipt
                    </button>
                  )}
                </div>
              )}

              {project.id === 'voxelworld' && (
                <div className="flex flex-col gap-2 bg-[#f4f3f3] p-2.5 bevel-sunken">
                  <div className="flex justify-between items-center font-bold text-[#005e97]">
                    <span>PROCEDURAL VOXEL HEIGHTMAP GENERATOR</span>
                    <span>WASM NOISE ENGINE</span>
                  </div>

                  {/* Simulated 3D Isometric Preview */}
                  <div className="h-28 bg-[#1a1c1c] bevel-sunken flex items-center justify-center p-2">
                    <div className="grid grid-cols-6 gap-1">
                      {Array.from({ length: 18 }).map((_, idx) => (
                        <div
                          key={idx}
                          style={{
                            height: `${(idx % voxelHeight) * 5 + 14}px`,
                            backgroundColor: idx % 2 === 0 ? '#008080' : '#4b53bc',
                          }}
                          className="w-5 bevel-raised shadow-sm transition-all duration-200"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold">Elevation Multiplier:</span>
                    <input
                      type="range"
                      min={2}
                      max={8}
                      value={voxelHeight}
                      onChange={(e) => setVoxelHeight(Number(e.target.value))}
                      className="flex-1 cursor-pointer"
                    />
                    <span className="font-bold">{voxelHeight}x</span>
                  </div>
                </div>
              )}

              {/* Technical features */}
              <div>
                <span className="font-bold text-[#1a1c1c] block mb-1">Architecture Highlights:</span>
                <ul className="list-disc pl-4 space-y-1 text-[#3e4949]">
                  {project.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#eeeeee] border-t border-[#808080]">
          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click?.()}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#eeeeee] bevel-raised hover:bg-[#d4d0c8] active:bevel-sunken text-[#1a1c1c] text-xs font-bold no-underline cursor-pointer leading-none"
              >
                <span className="material-symbols-outlined text-[13px]">code</span>
                <span>GitHub Repo</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click?.()}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#000080] text-white bevel-raised hover:bg-[#1084d0] active:bevel-sunken text-xs font-bold no-underline cursor-pointer leading-none"
              >
                <span>Live Demo</span>
                <span className="text-[11px]">↗</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              sound.close();
              onClose();
            }}
            className="inline-flex items-center justify-center px-4 py-1.5 bg-[#eeeeee] bevel-raised hover:bg-[#000080] hover:text-white active:bevel-sunken text-[#1a1c1c] text-xs font-bold cursor-pointer leading-none"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
};