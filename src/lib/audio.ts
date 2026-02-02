export interface AudioState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
}

export function createAudioPlayer(src: string): HTMLAudioElement {
  const audio = new Audio(src)
  audio.preload = 'metadata'
  return audio
}

export function playAudio(audio: HTMLAudioElement, volume = 0.5): Promise<void> {
  audio.volume = volume
  return audio.play()
}

export function pauseAudio(audio: HTMLAudioElement): void {
  audio.pause()
}

export function setAudioVolume(audio: HTMLAudioElement, volume: number): void {
  audio.volume = Math.max(0, Math.min(1, volume))
}

export function getAudioProgress(audio: HTMLAudioElement): number {
  if (audio.duration === 0) return 0
  return (audio.currentTime / audio.duration) * 100
}

export function seekAudio(audio: HTMLAudioElement, percentage: number): void {
  audio.currentTime = (percentage / 100) * audio.duration
}
