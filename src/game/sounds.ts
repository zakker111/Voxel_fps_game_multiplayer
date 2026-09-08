export class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    const initAudio = () => {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private playTone(frequency: number, duration: number, volume: number = 0.3, type: OscillatorType = 'sine') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private playNoise(duration: number, volume: number = 0.3) {
    if (!this.enabled || !this.audioContext) return;

    const bufferSize = this.audioContext.sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();

    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    source.start();
  }

  rifleShot() {
    this.playNoise(0.1, 0.4);
    this.playTone(150, 0.05, 0.3, 'square');
  }

  smgShot() {
    this.playNoise(0.08, 0.3);
    this.playTone(200, 0.03, 0.2, 'square');
  }

  hitMarker() {
    this.playTone(800, 0.1, 0.2, 'sine');
  }

  killSound() {
    this.playTone(600, 0.1, 0.3, 'sine');
    setTimeout(() => this.playTone(800, 0.1, 0.3, 'sine'), 100);
  }

  pickaxeHit() {
    this.playNoise(0.15, 0.2);
    this.playTone(300, 0.1, 0.2, 'triangle');
  }

  spadeHit() {
    this.playNoise(0.1, 0.15);
    this.playTone(250, 0.08, 0.15, 'triangle');
  }

  buildPlace() {
    this.playTone(400, 0.1, 0.2, 'sine');
    this.playTone(500, 0.1, 0.2, 'sine');
  }

  voxelBreak() {
    this.playNoise(0.2, 0.25);
    this.playTone(200, 0.15, 0.2, 'sawtooth');
  }

  collapse() {
    this.playNoise(0.5, 0.4);
    this.playTone(100, 0.3, 0.3, 'sawtooth');
  }

  jump() {
    this.playTone(300, 0.1, 0.1, 'sine');
  }

  death() {
    this.playTone(200, 0.3, 0.3, 'sawtooth');
    setTimeout(() => this.playTone(150, 0.3, 0.3, 'sawtooth'), 200);
  }

  respawn() {
    this.playTone(400, 0.1, 0.2, 'sine');
    setTimeout(() => this.playTone(600, 0.1, 0.2, 'sine'), 100);
    setTimeout(() => this.playTone(800, 0.1, 0.2, 'sine'), 200);
  }

  weaponSwitch() {
    this.playTone(500, 0.05, 0.15, 'sine');
  }
}
