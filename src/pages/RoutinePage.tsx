import { exercises } from '../data/exercises';
import { workoutSessions } from '../data/workouts';
import { ExerciseCard } from '../components/ExerciseCard';
import type { SessionId } from '../types';

export function RoutinePage({ onStart }: { onStart: (sessionId: SessionId) => void }) {
  return (
    <div className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Brazos, piernas, espalda, core y pecho</span>
          <h1>Rutinas iniciales</h1>
        </div>
      </div>
      <div className="session-grid">
        {workoutSessions.map((session) => (
          <section className="content-band" key={session.id}>
            <div className="section-heading">
              <div>
                <span className="eyebrow">{session.group} · {session.dayLabel} · {session.estimatedMinutes}</span>
                <h2>{session.name}</h2>
              </div>
              <button type="button" className="primary-small" onClick={() => onStart(session.id)}>Iniciar</button>
            </div>
            <div className="card-list">
              {session.exerciseIds.map((id) => {
                const exercise = exercises.find((item) => item.id === id);
                return exercise ? <ExerciseCard key={id} exercise={exercise} compact /> : null;
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
