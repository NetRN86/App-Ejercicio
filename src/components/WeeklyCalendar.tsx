import { workoutSessions } from '../data/workouts';
import type { WorkoutLog, WeeklyPlanEntry } from '../types';
import { getWeekdayShortLabel, getWeeklyPlanStatus } from '../utils/planning';

interface Props {
  logs: WorkoutLog[];
  weeklyPlan: WeeklyPlanEntry[];
}

export function WeeklyCalendar({ logs, weeklyPlan }: Props) {
  const weekStatus = getWeeklyPlanStatus(weeklyPlan, logs);

  return (
    <div className="weekly-calendar" aria-label="Calendario del plan semanal">
      {weekStatus.map((entry) => {
        const session = entry.sessionId ? workoutSessions.find((item) => item.id === entry.sessionId) : null;
        const stateClass = entry.sessionId ? (entry.completed ? 'trained planned' : 'planned') : 'rest';

        return (
          <div key={entry.day} className={stateClass}>
            <span>{getWeekdayShortLabel(entry.day)}</span>
            <strong>{session?.group ?? 'Descanso'}</strong>
            <small>{entry.sessionId ? (entry.completed ? 'Hecho' : 'Pendiente') : 'Libre'}</small>
          </div>
        );
      })}
    </div>
  );
}
