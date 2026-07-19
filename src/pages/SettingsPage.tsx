import { Download, RotateCcw, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { workoutSessions } from '../data/workouts';
import { applyBackup, BackupValidationError, downloadBackup, parseBackupFile } from '../utils/backup';
import type { UserSettings, Weekday } from '../types';

interface Props {
  settings: UserSettings;
  onChange: (settings: UserSettings) => void;
  onReset: () => void;
}

export function SettingsPage({ settings, onChange, onReset }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  function updatePlanDay(day: Weekday, nextSessionId: string) {
    onChange({
      ...settings,
      weeklyPlan: settings.weeklyPlan.map((entry) => (
        entry.day === day ? { ...entry, sessionId: nextSessionId ? (nextSessionId as typeof entry.sessionId) : null } : entry
      )),
    });
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = parseBackupFile(String(reader.result));
        const ok = window.confirm('Esto reemplaza tu historial, práctica y ajustes actuales con los del archivo. ¿Continuar?');
        if (!ok) return;
        applyBackup(payload);
        setImportMessage({ kind: 'ok', text: 'Respaldo restaurado. Recargando la app...' });
        window.setTimeout(() => window.location.reload(), 1200);
      } catch (error) {
        const text = error instanceof BackupValidationError ? error.message : 'No se pudo leer el archivo.';
        setImportMessage({ kind: 'error', text });
      }
    };
    reader.onerror = () => setImportMessage({ kind: 'error', text: 'No se pudo leer el archivo.' });
    reader.readAsText(file);
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
        <label>Plan semanal</label>
        <div className="plan-grid" aria-label="Plan semanal editable">
          {settings.weeklyPlan.map((entry) => (
            <label key={entry.day} className="plan-row">
              <span>{entry.day}</span>
              <select value={entry.sessionId ?? ''} onChange={(event) => updatePlanDay(entry.day, event.target.value)}>
                <option value="">Descanso</option>
                {workoutSessions.map((session) => (
                  <option key={session.id} value={session.id}>{session.name} · {session.group}</option>
                ))}
              </select>
            </label>
          ))}
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

      <section className="content-band">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Fuera de este dispositivo</span>
            <h2>Respaldo de tu progreso</h2>
          </div>
        </div>
        <p>
          Tu historial, tus ajustes y tus intentos de práctica solo viven en este navegador. Descarga
          un respaldo antes de cambiar de teléfono o borrar datos del navegador.
        </p>
        <div className="action-row">
          <button type="button" className="ghost-button" onClick={downloadBackup}><Download size={18} /> Descargar respaldo</button>
          <button type="button" className="ghost-button" onClick={handleImportClick}><Upload size={18} /> Restaurar desde archivo</button>
          <input ref={fileInputRef} type="file" accept="application/json" onChange={handleFileSelected} hidden />
        </div>
        {importMessage && <p className={importMessage.kind === 'error' ? 'warning-text' : ''}>{importMessage.text}</p>}
      </section>
    </div>
  );
}
