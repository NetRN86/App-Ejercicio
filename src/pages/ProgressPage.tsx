import { BarChart3, CalendarRange, Clock, ListChecks, Repeat } from 'lucide-react';
import { WeeklyCalendar } from '../components/WeeklyCalendar';
import { workoutSessions } from '../data/workouts';
import type { UserSettings, WorkoutLog } from '../types';
import { countActiveWeekStreak, getWeeklyCounts } from '../utils/progress';
import { countCompletedPlannedSessionsThisWeek, getPlannedSessionsThisWeek } from '../utils/planning';
import { formatDuration } from '../utils/timer';

export function ProgressPage({ logs, settings }: { logs: WorkoutLog[]; settings: UserSettings }) {
  const totalSets = logs.reduce((sum, log) => sum + log.completedSets.length, 0);
  const totalTime = logs.reduce((sum, log) => sum + log.durationSeconds, 0);
  const weeklyCounts = Object.entries(getWeeklyCounts(logs)).slice(-8);
  const streak = countActiveWeekStreak(logs);
  const maxCount = Math.max(1, ...weeklyCounts.map(([, count]) => count));
  const plannedThisWeek = getPlannedSessionsThisWeek(settings.weeklyPlan);
  const completedThisWeek = countCompletedPlannedSessionsThisWeek(settings.weeklyPlan, logs);

  return (
    <div className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Constancia sin métricas inventadas</span>
          <h1>Progreso</h1>
        </div>
      </div>
      <div className="stats-grid">
        <div><Repeat aria-hidden="true" /><span>Racha de semanas activas</span><strong>{streak}</strong></div>
        <div><CalendarRange aria-hidden="true" /><span>Plan de esta semana</span><strong>{completedThisWeek}/{plannedThisWeek || 0}</strong></div>
        <div><ListChecks aria-hidden="true" /><span>Total de sesiones</span><strong>{logs.length}</strong></div>
        <div><BarChart3 aria-hidden="true" /><span>Total de series</span><strong>{totalSets}</strong></div>
        <div><Clock aria-hidden="true" /><span>Tiempo acumulado</span><strong>{formatDuration(totalTime)}</strong></div>
      </div>
      <section className="content-band">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Semana actual</span>
            <h2>Plan y sesiones completadas</h2>
          </div>
        </div>
        <WeeklyCalendar logs={logs} weeklyPlan={settings.weeklyPlan} />
      </section>
      <section className="content-band">
        <h2>Constancia semanal</h2>
        <div className="bar-chart" aria-label="Gráfica simple de entrenamientos por semana">
          {weeklyCounts.length === 0 && <p>Aún no hay sesiones guardadas.</p>}
          {weeklyCounts.map(([week, count]) => (
            <div key={week}>
              <span style={{ height: `${Math.max(12, (count / maxCount) * 100)}%` }} />
              <strong>{count}</strong>
              <small>S{week.split('-')[1]}</small>
            </div>
          ))}
        </div>
      </section>
      <section className="content-band">
        <h2>Historial por fecha</h2>
        <div className="history-list">
          {logs.length === 0 && <p>No hay entrenamientos guardados todavía.</p>}
          {logs.map((log) => {
            const session = workoutSessions.find((item) => item.id === log.sessionId);
            const sessionLabel = session ? (session.name.includes(session.group) ? session.name : `${session.name} · ${session.group}`) : `Sesión ${log.sessionId}`;
            return (
              <article key={log.id}>
                <strong>{sessionLabel} · {new Date(log.date).toLocaleString('es-MX')}</strong>
                <span>{log.completedSets.length} series · esfuerzo {log.effort}/10 · {formatDuration(log.durationSeconds)}</span>
                {log.notes && <p>{log.notes}</p>}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
