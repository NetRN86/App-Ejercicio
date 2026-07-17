import { Dumbbell, Play, Timer, Trophy } from 'lucide-react';
import { exercises } from '../data/exercises';
import { workoutSessions } from '../data/workouts';
import type { SessionId, UserSettings, WorkoutLog } from '../types';
import { ProgressBar } from '../components/ProgressBar';
import { SafetyNotice } from '../components/SafetyNotice';
import { countCompletedPlannedSessionsThisWeek, getAssignedDaysForSession, getNextPlannedEntry, getPlannedSessionsThisWeek } from '../utils/planning';

interface Props {
  logs: WorkoutLog[];
  settings: UserSettings;
  onStart: (sessionId: SessionId) => void;
  onNavigate: (page: string) => void;
}

function joinAssignedDays(days: string[]) {
  return days.length ? days.join(', ') : 'Sin programar';
}

export function HomePage({ logs, settings, onStart, onNavigate }: Props) {
  const nextPlan = getNextPlannedEntry(settings.weeklyPlan, logs);
  const nextSession = nextPlan ? workoutSessions.find((session) => session.id === nextPlan.sessionId) ?? null : null;
  const plannedThisWeek = getPlannedSessionsThisWeek(settings.weeklyPlan);
  const completedThisWeek = countCompletedPlannedSessionsThisWeek(settings.weeklyPlan, logs);
  const progressValue = plannedThisWeek ? (completedThisWeek / plannedThisWeek) * 100 : 0;
  const last = logs[0];
  const equipmentUsed = nextSession
    ? Array.from(new Set(
      nextSession.exerciseIds
        .map((id) => exercises.find((exercise) => exercise.id === id)?.equipment)
        .filter(Boolean),
    ))
    : [];
  const exerciseCount = nextSession?.exerciseIds.length ?? 0;

  return (
    <div className="page-stack">
      <section className="home-hero">
        <div>
          <span className="eyebrow">
            {nextPlan ? `${nextPlan.offsetDays === 0 ? 'Hoy' : 'Próxima sesión'} · ${nextPlan.day}` : 'Plan semanal'}
          </span>
          <h1>{nextSession ? `${nextSession.name} · ${nextSession.group}` : 'Configura tu semana'}</h1>
          <p>
            {nextSession
              ? `Rutina principiante en casa. Equipo: ${equipmentUsed.join(', ')}. Duración estimada: ${nextSession.estimatedMinutes}.`
              : 'Todavía no hay una sesión asignada en tu plan semanal. Ve a Ajustes y elige qué rutina quieres para cada día.'}
          </p>
          <button className="primary-action" type="button" onClick={() => (nextSession ? onStart(nextSession.id) : onNavigate('configuracion'))}>
            <Play aria-hidden="true" /> {nextSession ? 'Comenzar entrenamiento' : 'Configurar plan semanal'}
          </button>
        </div>
        <div className="hero-panel" aria-label="Resumen de la próxima sesión">
          <div><Timer aria-hidden="true" /><span>Día asignado</span><strong>{nextPlan?.day ?? 'Sin plan'}</strong></div>
          <div><Dumbbell aria-hidden="true" /><span>Ejercicios</span><strong>{nextSession ? exerciseCount : 0}</strong></div>
          <div><Trophy aria-hidden="true" /><span>Última sesión</span><strong>{last ? `${workoutSessions.find((session) => session.id === last.sessionId)?.group ?? last.sessionId} · ${new Date(last.date).toLocaleDateString('es-MX')}` : 'Aún sin registro'}</strong></div>
        </div>
      </section>

      <SafetyNotice />

      <section className="content-band">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Semana actual</span>
            <h2>Progreso del plan</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => onNavigate('progreso')}>Ver historial</button>
        </div>
        <ProgressBar value={progressValue} label={plannedThisWeek ? `${completedThisWeek} de ${plannedThisWeek} sesiones planeadas completadas` : 'No hay sesiones planeadas esta semana'} />
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
              <span>{joinAssignedDays(getAssignedDaysForSession(settings.weeklyPlan, session.id))}</span>
              <strong>{session.name}</strong>
              <small>{session.exerciseIds.length} ejercicios · {session.estimatedMinutes}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="content-band">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Plan semanal</span>
            <h2>Lo que harás en tu próxima sesión</h2>
          </div>
          <button type="button" className="ghost-button" onClick={() => onNavigate('rutina')}>Abrir rutina</button>
        </div>
        {nextSession ? (
          <div className="compact-list">
            {nextSession.exerciseIds.map((id, index) => {
              const exercise = exercises.find((item) => item.id === id);
              if (!exercise) return null;
              return <div key={id}><strong>{index + 1}. {exercise.name}</strong><span>{exercise.sets} series · {exercise.reps}</span></div>;
            })}
          </div>
        ) : (
          <p>Asigna al menos una sesión en Ajustes para ver aquí el siguiente entrenamiento planeado.</p>
        )}
      </section>
    </div>
  );
}
