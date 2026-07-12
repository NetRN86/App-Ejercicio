export function playBeep(frequencyHz = 880) {
  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.connect(gain);
  gain.connect(audio.destination);
  oscillator.frequency.value = frequencyHz;
  gain.gain.value = 0.05;
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.12);
}

export function triggerVibration(pattern: number | number[] = 60) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}
