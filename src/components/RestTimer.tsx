import { Minus, Pause, Play, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatDuration } from '../utils/timer';

interface Props {
  seconds: number;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  onComplete: () => void;
  onRecordRest: (seconds: number) => void;
}

export function RestTimer({ seconds, soundEnabled, vibrationEnabled, onComplete, onRecordRest }: Props) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setRemaining(seconds);
    setRunning(true);
  }, [seconds]);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const id = window.setInterval(() => setRemaining((value) => value - 1), 1000);
    return () => window.clearInterval(id);
  }, [running, remaining]);

  useEffect(() => {
    if (remaining !== 0) return;
    onRecordRest(seconds);
    if (soundEnabled) {
      const audio = new AudioContext();
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.frequency.value = 740;
      gain.gain.value = 0.05;
      oscillator.start();
      oscillator.stop(audio.currentTime + 0.18);
    }
    if (vibrationEnabled && navigator.vibrate) navigator.vibrate([120, 60, 120]);
    onComplete();
  }, [remaining, onComplete, onRecordRest, seconds, soundEnabled, vibrationEnabled]);

  return (
    <section className="rest-timer" aria-live="polite">
      <span>Descanso</span>
      <strong>{formatDuration(remaining)}</strong>
      <div className="timer-actions">
        <button type="button" className="icon-button" onClick={() => setRemaining((value) => Math.max(0, value - 15))} aria-label="Reducir descanso 15 segundos" title="-15 s"><Minus size={18} /></button>
        <button type="button" className="icon-button" onClick={() => setRunning((value) => !value)} aria-label={running ? 'Pausar descanso' : 'Reanudar descanso'} title={running ? 'Pausar' : 'Reanudar'}>{running ? <Pause size={18} /> : <Play size={18} />}</button>
        <button type="button" className="icon-button" onClick={() => setRemaining((value) => value + 15)} aria-label="Agregar descanso 15 segundos" title="+15 s"><Plus size={18} /></button>
      </div>
    </section>
  );
}
