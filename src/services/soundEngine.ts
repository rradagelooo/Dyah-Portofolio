/**
 * Retro 98 Synthesizer Sound Engine using standard Web Audio API.
 * Produces authentic mechanical clicks, chord dialog chimes, start menu pops, and 56k modem SFX.
 */

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(state: boolean): void {
    this.muted = state;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (!this.muted) {
      this.click();
    }
    return this.muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  // Crisp mechanical tactile button click
  public click(): void {
    if (this.muted) return;
    try {
      const c = this.getContext();
      if (!c) return;
      const now = c.currentTime;

      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(c.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Audio error ignored safely
    }
  }

  // Windows 98 Start Menu pop sound
  public pop(): void {
    if (this.muted) return;
    try {
      const c = this.getContext();
      if (!c) return;
      const now = c.currentTime;

      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.05);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(c.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio error ignored safely
    }
  }

  // Classic Windows 98 Open Window / Chord Chime (C5, E5, G5, C6)
  public chord(): void {
    if (this.muted) return;
    try {
      const c = this.getContext();
      if (!c) return;
      const now = c.currentTime;

      const chordNotes = [
        { f: 523.25, t: 0.00, dur: 0.28 }, // C5
        { f: 659.25, t: 0.04, dur: 0.26 }, // E5
        { f: 783.99, t: 0.08, dur: 0.32 }, // G5
        { f: 1046.50, t: 0.12, dur: 0.38 }, // C6
      ];

      chordNotes.forEach((note) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, now + note.t);

        gain.gain.setValueAtTime(0, now + note.t);
        gain.gain.linearRampToValueAtTime(0.14, now + note.t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.dur);

        osc.connect(gain);
        gain.connect(c.destination);

        osc.start(now + note.t);
        osc.stop(now + note.t + note.dur);
      });
    } catch {
      // Audio error ignored safely
    }
  }

  // Window close descending tone (E5 -> A4)
  public close(): void {
    if (this.muted) return;
    try {
      const c = this.getContext();
      if (!c) return;
      const now = c.currentTime;

      const notes = [
        { f: 659.25, t: 0.00, dur: 0.12 }, // E5
        { f: 440.00, t: 0.06, dur: 0.16 }, // A4
      ];

      notes.forEach((note) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, now + note.t);

        gain.gain.setValueAtTime(0, now + note.t);
        gain.gain.linearRampToValueAtTime(0.12, now + note.t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.dur);

        osc.connect(gain);
        gain.connect(c.destination);

        osc.start(now + note.t);
        osc.stop(now + note.t + note.dur);
      });
    } catch {
      // Audio error ignored safely
    }
  }

  // Warning buzz / error sound
  public error(): void {
    if (this.muted) return;
    try {
      const c = this.getContext();
      if (!c) return;
      const now = c.currentTime;

      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.setValueAtTime(120, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(c.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Audio error ignored safely
    }
  }

  // Dial-up 56K packet transmission simulation
  public modem(): void {
    if (this.muted) return;
    try {
      const c = this.getContext();
      if (!c) return;
      const now = c.currentTime;

      // Dual frequencies burst
      const freqs = [941, 1336, 1209, 1477, 2100];
      freqs.forEach((freq, idx) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.07 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * 0.07);

        osc.connect(gain);
        gain.connect(c.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + (idx + 1) * 0.07);
      });
    } catch {
      // Audio error ignored safely
    }
  }
}

export const sound = new RetroAudioEngine();
