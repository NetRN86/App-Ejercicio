import { useMemo, useState } from 'react';
import { ExerciseCard } from '../components/ExerciseCard';
import { exercises } from '../data/exercises';

const filters = ['Todos', 'Biceps', 'Triceps', 'Hombros', 'Antebrazos', 'Piernas', 'Gluteos', 'Espalda', 'Peso corporal', 'Una mancuerna', 'Dos mancuernas'];

export function LibraryPage() {
  const [filter, setFilter] = useState('Todos');
  const filtered = useMemo(() => exercises.filter((exercise) => {
    if (filter === 'Todos') return true;
    if (filter === 'Peso corporal') return exercise.equipment === 'Peso corporal';
    if (filter === 'Una mancuerna') return exercise.equipment.startsWith('Una');
    if (filter === 'Dos mancuernas') return exercise.equipment.startsWith('Dos');
    return exercise.category === filter;
  }), [filter]);

  return (
    <div className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Técnica primero</span>
          <h1>Biblioteca de ejercicios</h1>
        </div>
      </div>
      <div className="segmented" role="tablist" aria-label="Filtros de ejercicios">
        {filters.map((item) => (
          <button key={item} type="button" role="tab" aria-selected={filter === item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>
      <div className="library-grid">
        {filtered.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} />)}
      </div>
    </div>
  );
}
