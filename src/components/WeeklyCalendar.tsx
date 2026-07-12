import type { WorkoutLog } from '../types';

const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

export function WeeklyCalendar({ logs }: { logs: WorkoutLog[] }) {
  const trainedDays = new Set(logs.slice(0, 20).map((log) => new Date(log.date).getDay()));
  const mapIndex = [1, 2, 3, 4, 5, 6, 0];
  return (
    <div className="weekly-calendar" aria-label="Calendario de dias entrenados">
      {days.map((day, index) => {
        const trained = trainedDays.has(mapIndex[index]);
        return (
          <div key={day} className={trained ? 'trained' : ''}>
            <span>{day}</span>
            <strong>{trained ? 'Hecho' : 'Libre'}</strong>
          </div>
        );
      })}
    </div>
  );
}
