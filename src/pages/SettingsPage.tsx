import { RotateCcw } from 'lucide-react';
import type { UserSettings } from '../types';

interface Props {
  settings: UserSettings;
  onChange: (settings: UserSettings) => void;
  onReset: () => void;
}

const allDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export function SettingsPage({ settings, onChange, onReset }: Props) {
  function toggleDay(day: string) {
    const selected = settings.trainingDays.includes(day);
    onChange({ ...settings, trainingDays: selected ? settings.trainingDays.filter((item) => item !== day) : [...settings.trainingDays, day] });
  }

  return (
    <div className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Ajustes locales</span>
          <h1>Configuración</h1>
        </div>
      </div>
      <section className="content-band settings-grid">
        <label>Días de entrenamiento</label>
        <div className="day-picker">
          {allDays.map((day) => <button key={day} type="button" className={settings.trainingDays.includes(day) ? 'selected' : ''} onClick={() => toggleDay(day)}>{day.slice(0, 3)}</button>)}
        </div>

        <label>Duración de descanso global: {settings.restAdjustmentSeconds >= 0 ? '+' : ''}{settings.restAdjustmentSeconds}s</label>
        <input type="range" min="-30" max="60" step="15" value={settings.restAdjustmentSeconds} onChange={(event) => onChange({ ...settings, restAdjustmentSeconds: Number(event.target.value) })} />

        <label><input type="checkbox" checked={settings.soundEnabled} onChange={(event) => onChange({ ...settings, soundEnabled: event.target.checked })} /> Sonido al terminar el descanso</label>
        <label><input type="checkbox" checked={settings.vibrationEnabled} onChange={(event) => onChange({ ...settings, vibrationEnabled: event.target.checked })} /> Vibración cuando el navegador lo permita</label>
        <label><input type="checkbox" checked={settings.showRecommendations} onChange={(event) => onChange({ ...settings, showRecommendations: event.target.checked })} /> Mostrar recomendaciones</label>

        <label>Tema</label>
        <div className="segmented compact">
          <button type="button" className={settings.theme === 'light' ? 'selected' : ''} onClick={() => onChange({ ...settings, theme: 'light' })}>Claro</button>
          <button type="button" className={settings.theme === 'dark' ? 'selected' : ''} onClick={() => onChange({ ...settings, theme: 'dark' })}>Oscuro</button>
        </div>

        <label>Tamaño de texto</label>
        <div className="segmented compact">
          <button type="button" className={settings.textSize === 'normal' ? 'selected' : ''} onClick={() => onChange({ ...settings, textSize: 'normal' })}>Normal</button>
          <button type="button" className={settings.textSize === 'large' ? 'selected' : ''} onClick={() => onChange({ ...settings, textSize: 'large' })}>Grande</button>
        </div>

        <button className="danger-button" type="button" onClick={onReset}><RotateCcw size={18} /> Reiniciar progreso</button>
      </section>
    </div>
  );
}
