import { Dumbbell, Play, Timer, Trophy } from 'lucide-react';
import { exercises } from '../data/exercises';
import { workoutSessions } from '../data/workouts';
import type { SessionId, WorkoutLog } from '../types';
import { ProgressBar } from '../components/ProgressBar';
import { SafetyNotice } from '../components/SafetyNotice';

interface Props {
  logs: WorkoutLog[];
  onStart: (sessionId: SessionId) => void;
  onNavigate: (page: string) => void;
}

export function HomePage({ logs, onStart, onNavigate }: Props) {
  const lastIndex = workoutSessions.findIndex((session) => session.id === logs[0]?.sessionId);
  const nextSession = lastIndex === -1 ? workoutSessions[0] : workoutSessions[(lastIndex + 1) % workoutSessions.length];
  const equipmentUsed = Array.from(new Set(
    nextSession.exerciseIds
      .map((id) => exercises.find((exercise) => exercise.id === id)?.equipment)
      .filter(Boolean),
  ));
  const completedThisWeek = logs.filter((log) => Date.now() - new Date(log.date).getTime() < 7 * 86400000).length;
  const exerciseCount = nextSession.exerciseIds.length;
  const last = logs[0];

  return (
    <div className="page-stack">
      <section className="home-hero">
        <div>
          <span className="eyebrow">Próxima sesión · {nextSession.dayLabel}</span>
          <h1>{nextSession.name} · {nextSession.group}</h1>
          <p>Rutina principiante en casa. Equipo: {equipmentUsed.join(', ')}. Duración estimada: {nextSession.estimatedMinutes}.</p>
          <button className="primary-action" type="button" onClick={() => onStart(nextSession.id)}>
            <Play aria-hidden="true" /> Comenzar entrenamiento
          </button>
        </div>
        <div className="hero-panel" aria-label="Resumen de la proxima sesion">
          <div><Timer aria-hidden="true" /><span>Duración</span><strong>{nextSession.estimatedMinutes}</strong></div>
          <div><Dumbbell aria-hidden="true" /><span>Ejercicios</span><strong>{exerciseCount}</strong></div>
          <div><Trophy aria-hidden="true" /><span>Última sesión</span><strong>{last ? `${last.sessionId} · ${new Date(last.date).toLocaleDateString('es-MX')}` : 'Aún sin registro'}</strong></div>
        </div>
      </section>

      <SafetyNotice />

      <section className="content-band">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Semana actual</span>
            <h2>Progreso semanal</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => onNavigate('progreso')}>Ver historial</button>
        </div>
        <ProgressBar value={(completedThisWeek / workoutSessions.length) * 100} label={`${completedThisWeek} de ${workoutSessions.length} sesiones completadas`} />
      </section>

      <section className="content-band">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Elegir grupo muscular</span>
            <h2>Rutinas disponibles</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => onNavigate('rutina')}>Ver todas</button>
        </div>
        <div className="routine-choice-grid">
          {workoutSessions.map((session) => (
            <button
              key={session.id}
              type="button"
              className="routine-choice"
              aria-label={`Iniciar ${session.name} de ${session.group}, ${session.exerciseIds.length} ejercicios, ${session.estimatedMinutes}`}
              onClick={() => onStart(session.id)}
            >
              <span>{session.group}</span>
              <strong>{session.name}</strong>
              <small>{session.exerciseIds.length} ejercicios · {session.estimatedMinutes}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Rutina precargada</span>
            <h2>Lo que harás hoy</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => onNavigate('rutina')}>Abrir rutina</button>
        </div>
        <div className="compact-list">
          {nextSession.exerciseIds.map((id, index) => {
            const exercise = exercises.find((item) => item.id === id);
            if (!exercise) return null;
            return <div key={id}><strong>{index + 1}. {exercise.name}</strong><span>{exercise.sets} series · {exercise.reps}</span></div>;
          })}
        </div>
      </section>
    </div>
  );
}
