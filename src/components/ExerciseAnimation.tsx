import { Pause, Play, RotateCcw, Snail } from 'lucide-react';
import { useState } from 'react';
import type { AnimationType } from '../types';

interface Props {
  type: AnimationType;
  label: string;
}

const movementCopy: Record<AnimationType, string> = {
  'biceps-curl': 'Sube las mancuernas sin mover los codos hacia adelante. Baja lentamente y mantén el abdomen firme.',
  'hammer-curl': 'Mantén las palmas enfrentadas y mueve solo los antebrazos.',
  'shoulder-press': 'Empuja sobre la cabeza sin arquear la espalda y baja con control.',
  'overhead-triceps': 'Dobla y extiende los codos manteniéndolos apuntando al frente.',
  'farmers-walk': 'Camina erguido con pasos cortos y agarre firme.',
  'alternating-curl': 'Sube un brazo por vez mientras el otro permanece quieto.',
  'reverse-curl': 'Palmas hacia abajo, munecas rectas y subida controlada.',
  'lateral-raise': 'Eleva los brazos hacia los lados hasta altura de hombros sin impulso.',
  'triceps-kickback': 'Con el codo fijo, extiende el antebrazo hacia atras.',
  'isometric-hold': 'Sostén las mancuernas con postura alta y respiración constante.',
};

export function ExerciseAnimation({ type, label }: Props) {
  const [playing, setPlaying] = useState(true);
  const [slow, setSlow] = useState(false);
  const [version, setVersion] = useState(0);
  const className = `animation-scene motion-${type} ${playing ? 'is-playing' : 'is-paused'} ${slow ? 'is-slow' : ''}`;

  return (
    <figure className="exercise-animation" aria-label={`Animacion del ejercicio ${label}`}>
      <svg key={version} className={className} viewBox="0 0 260 220" role="img" aria-labelledby={`${type}-title ${type}-desc`}>
        <title id={`${type}-title`}>{label}</title>
        <desc id={`${type}-desc`}>Figura simplificada con posición inicial, final y flechas de movimiento.</desc>
        <rect x="8" y="8" width="244" height="204" rx="16" className="scene-bg" />
        <path className="arrow arrow-main" d="M200 66 C224 78 226 116 204 130" />
        <path className="arrow-head" d="M202 120 l5 13 l10 -9" />
        <circle cx="130" cy="50" r="18" className="body" />
        <path d="M130 68 L130 126" className="body-line" />
        <path d="M108 92 L130 80 L152 92" className="arm upper-arm" />
        <path d="M108 92 L92 132" className="arm forearm left-forearm" />
        <path d="M152 92 L168 132" className="arm forearm right-forearm" />
        <path d="M130 126 L106 176" className="leg" />
        <path d="M130 126 L154 176" className="leg" />
        <rect x="82" y="128" width="22" height="12" rx="4" className="dumbbell left-weight" />
        <rect x="156" y="128" width="22" height="12" rx="4" className="dumbbell right-weight" />
        <circle cx="58" cy="38" r="6" className="start-dot" />
        <text x="70" y="43" className="state-label">inicio</text>
        <circle cx="178" cy="38" r="6" className="end-dot" />
        <text x="190" y="43" className="state-label">final</text>
      </svg>
      <figcaption>{movementCopy[type]}</figcaption>
      <div className="animation-controls" aria-label="Controles de animacion">
        <button type="button" className="icon-button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pausar animacion' : 'Reproducir animacion'} title={playing ? 'Pausar' : 'Reproducir'}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button type="button" className={`icon-button ${slow ? 'is-active' : ''}`} onClick={() => setSlow((value) => !value)} aria-label="Alternar cámara lenta" title="Camara lenta">
          <Snail size={18} />
        </button>
        <button type="button" className="icon-button" onClick={() => setVersion((value) => value + 1)} aria-label="Reiniciar animacion" title="Reiniciar">
          <RotateCcw size={18} />
        </button>
      </div>
    </figure>
  );
}
