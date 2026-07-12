import type { Exercise } from '../types';
import { ExerciseAnimation } from './ExerciseAnimation';
import { ProductSuggestions } from './ProductSuggestions';

interface Props {
  exercise: Exercise;
  compact?: boolean;
}

export function ExerciseCard({ exercise, compact = false }: Props) {
  return (
    <article className="exercise-card">
      <ExerciseAnimation type={exercise.animationType} label={exercise.name} />
      <div className="exercise-card-body">
        <div className="card-kicker">{exercise.category} · {exercise.equipment}</div>
        <h3>{exercise.name}</h3>
        <p><strong>{exercise.sets} series</strong> · {exercise.reps} · descanso {exercise.restSeconds}s</p>
        {exercise.warning && <p className="warning-text">{exercise.warning}</p>}
        {!compact && (
          <>
            <div className="detail-grid">
              <div><span>Músculos</span><p>{exercise.musclesWorked.join(', ')}</p></div>
              <div><span>Dificultad</span><p>{exercise.difficulty}</p></div>
              <div><span>Respiración</span><p>{exercise.breathing}</p></div>
            </div>
            <details>
              <summary>Instrucciones paso a paso</summary>
              <ol>{exercise.instructions.map((item) => <li key={item}>{item}</li>)}</ol>
            </details>
            <details>
              <summary>Técnica y errores frecuentes</summary>
              <p><strong>Consejos:</strong> {exercise.techniqueTips.join(' ')}</p>
              <p><strong>Evita:</strong> {exercise.commonMistakes.join(' ')}</p>
            </details>
            <details>
              <summary>Variaciones y seguridad</summary>
              <p><strong>Más fácil:</strong> {exercise.easierVariation}</p>
              <p><strong>Más difícil:</strong> {exercise.harderVariation}</p>
              <p><strong>Seguridad:</strong> {exercise.safetyNotes.join(' ')}</p>
            </details>
            <ProductSuggestions exerciseId={exercise.id} />
          </>
        )}
      </div>
    </article>
  );
}
