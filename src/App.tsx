import { BookOpen, CalendarDays, Gamepad2, Home, ListChecks, PlayCircle, Settings, ShoppingBag } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { PracticePage } from './pages/PracticePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProgressPage } from './pages/ProgressPage';
import { RoutinePage } from './pages/RoutinePage';
import { SettingsPage } from './pages/SettingsPage';
import { WorkoutPage } from './pages/WorkoutPage';
import { getSettings, getWorkoutLogs, resetAllProgress, saveSettings, saveWorkoutLog } from './services/storage';
import type { SessionId, UserSettings, WorkoutLog } from './types';

type Page = 'inicio' | 'rutina' | 'entrenamiento' | 'biblioteca' | 'practica' | 'productos' | 'progreso' | 'configuracion';

const navItems: Array<{ id: Page; label: string; icon: LucideIcon }> = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'rutina', label: 'Rutina', icon: CalendarDays },
  { id: 'entrenamiento', label: 'Entrenar', icon: PlayCircle },
  { id: 'biblioteca', label: 'Biblioteca', icon: BookOpen },
  { id: 'practica', label: 'Practicar', icon: Gamepad2 },
  { id: 'productos', label: 'Productos', icon: ShoppingBag },
  { id: 'progreso', label: 'Progreso', icon: ListChecks },
  { id: 'configuracion', label: 'Ajustes', icon: Settings },
];

export function App() {
  const [page, setPage] = useState<Page>('inicio');
  const [activeSession, setActiveSession] = useState<SessionId>('A');
  const [logs, setLogs] = useState<WorkoutLog[]>(() => getWorkoutLogs());
  const [settings, setSettings] = useState<UserSettings>(() => getSettings());

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.dataset.text = settings.textSize;
    saveSettings(settings);
  }, [settings]);

  function startWorkout(sessionId: SessionId) {
    setActiveSession(sessionId);
    setPage('entrenamiento');
  }

  function finishWorkout(log: WorkoutLog) {
    setLogs(saveWorkoutLog(log));
    setPage('progreso');
  }

  function resetProgress() {
    const ok = window.confirm('¿Quieres borrar el historial y el entrenamiento activo?');
    if (!ok) return;
    resetAllProgress();
    setLogs([]);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <span>Rutina en casa</span>
          <strong>Guía de ejercicio principiante</strong>
        </div>
      </header>
      <main>
        {page === 'inicio' && <HomePage logs={logs} settings={settings} onStart={startWorkout} onNavigate={(target) => setPage(target as Page)} />}
        {page === 'rutina' && <RoutinePage settings={settings} onStart={startWorkout} />}
        {page === 'entrenamiento' && <WorkoutPage sessionId={activeSession} settings={settings} onFinish={finishWorkout} onExit={() => setPage('inicio')} />}
        {page === 'biblioteca' && <LibraryPage />}
        {page === 'practica' && <PracticePage settings={settings} />}
        {page === 'productos' && <ProductsPage />}
        {page === 'progreso' && <ProgressPage logs={logs} settings={settings} />}
        {page === 'configuracion' && <SettingsPage settings={settings} onChange={setSettings} onReset={resetProgress} />}
      </main>
      <nav className="bottom-nav" aria-label="Navegacion principal">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} type="button" className={page === item.id ? 'active' : ''} onClick={() => setPage(item.id)} aria-current={page === item.id ? 'page' : undefined}>
              <Icon size={19} aria-hidden />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
