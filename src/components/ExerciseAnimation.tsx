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
  'goblet-squat': 'Baja la cadera como si te sentaras y sube empujando el piso con los talones.',
  'romanian-deadlift': 'Lleva la cadera hacia atras con espalda larga y vuelve apretando gluteos.',
  'reverse-lunge': 'Da un paso atras, baja con control y regresa empujando con la pierna delantera.',
  'calf-raise': 'Sube los talones lentamente, pausa arriba y baja sin rebotar.',
  'glute-bridge': 'Eleva la cadera apretando gluteos y baja con control.',
  'one-arm-row': 'Lleva el codo hacia la cadera sin girar el torso y baja con control.',
  'bent-over-row': 'Rema con ambos codos hacia atras manteniendo la espalda larga.',
  'pullover': 'Lleva la mancuerna hacia atras con control y vuelve sin arquear la espalda.',
  'reverse-fly': 'Abre los brazos hacia los lados con movimiento corto y limpio.',
  'superman-hold': 'Eleva pecho, brazos y piernas unos centimetros y sosten respirando.',
  'dead-bug': 'Extiende brazo y pierna contrarios manteniendo la espalda baja estable.',
  'bird-dog': 'Alarga brazo y pierna opuestos sin mover la cadera.',
  'side-plank': 'Eleva la cadera y sosten la linea del costado sin colapsar el hombro.',
  'russian-twist': 'Gira el torso de lado a lado con rango corto y controlado.',
  'hollow-hold': 'Mantén costillas abajo mientras sostienes hombros y piernas elevadas.',
  'knee-pushup': 'Baja el pecho con control y empuja el suelo sin dejar caer la cadera.',
  'floor-press': 'Empuja las mancuernas desde el pecho y baja hasta tocar suave el suelo.',
  'squeeze-press': 'Aprieta las mancuernas entre si durante todo el press.',
  'floor-fly': 'Abre los brazos en arco y cierra abrazando el pecho.',
  'chest-squeeze-hold': 'Aprieta la mancuerna frente al pecho y sosten la tension con respiracion tranquila.',
};

function StandingLegs() {
  return (
    <>
      <path d="M130 126 L106 176" className="leg" />
      <path d="M130 126 L154 176" className="leg" />
    </>
  );
}

function SideDumbbells() {
  return (
    <>
      <path d="M130 80 L108 128" className="arm left-arm" />
      <path d="M130 80 L152 128" className="arm right-arm" />
      <rect x="98" y="128" width="20" height="12" rx="4" className="dumbbell left-weight" />
      <rect x="142" y="128" width="20" height="12" rx="4" className="dumbbell right-weight" />
    </>
  );
}

function SupineBase() {
  return (
    <>
      <line x1="24" y1="176" x2="236" y2="176" className="ground-line" />
      <circle cx="60" cy="144" r="16" className="body" />
      <path d="M76 144 L136 144" className="body-line" />
      <path d="M136 144 L162 172" className="leg" />
      <path d="M116 144 L92 172" className="leg" />
    </>
  );
}

function QuadrupedBase() {
  return (
    <>
      <line x1="32" y1="176" x2="236" y2="176" className="ground-line" />
      <circle cx="160" cy="92" r="16" className="body" />
      <path d="M148 102 L118 118 L96 130" className="body-line" />
      <path d="M100 132 L84 172" className="leg" />
      <path d="M126 120 L140 172" className="leg" />
      <path d="M114 120 L84 126" className="arm" />
    </>
  );
}

function pose(type: AnimationType) {
  switch (type) {
    case 'biceps-curl':
    case 'hammer-curl':
    case 'alternating-curl':
    case 'reverse-curl':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M108 92 L130 80 L152 92" className="arm upper-arm" />
          <path d="M108 92 L92 132" className="arm forearm left-forearm" />
          <path d="M152 92 L168 132" className="arm forearm right-forearm" />
          <StandingLegs />
          <rect x="82" y="128" width="22" height="12" rx="4" className="dumbbell left-weight" />
          <rect x="156" y="128" width="22" height="12" rx="4" className="dumbbell right-weight" />
        </>
      );
    case 'shoulder-press':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M110 86 L96 58" className="arm forearm left-forearm" />
          <path d="M150 86 L164 58" className="arm forearm right-forearm" />
          <StandingLegs />
          <rect x="86" y="50" width="20" height="12" rx="4" className="dumbbell left-weight" />
          <rect x="158" y="50" width="20" height="12" rx="4" className="dumbbell right-weight" />
        </>
      );
    case 'overhead-triceps':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M120 78 L112 62" className="arm left-forearm" />
          <path d="M140 78 L148 62" className="arm right-forearm" />
          <StandingLegs />
          <rect x="118" y="56" width="24" height="12" rx="4" className="dumbbell single-weight" />
        </>
      );
    case 'lateral-raise':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M130 80 L104 120" className="arm left-arm" />
          <path d="M130 80 L156 120" className="arm right-arm" />
          <StandingLegs />
          <rect x="94" y="116" width="20" height="12" rx="4" className="dumbbell left-weight" />
          <rect x="146" y="116" width="20" height="12" rx="4" className="dumbbell right-weight" />
        </>
      );
    case 'triceps-kickback':
      return (
        <>
          <circle cx="156" cy="60" r="18" className="body kickback-head" />
          <path d="M130 126 L152 76" className="body-line kickback-torso" />
          <path d="M152 76 L120 108" className="arm" />
          <path d="M148 100 L130 92" className="arm forearm right-forearm" />
          <StandingLegs />
          <rect x="112" y="86" width="20" height="12" rx="4" className="dumbbell single-weight" />
        </>
      );
    case 'farmers-walk':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <SideDumbbells />
          <path d="M130 126 L106 176" className="leg front-leg" />
          <path d="M130 126 L154 176" className="leg back-leg" />
        </>
      );
    case 'isometric-hold':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <SideDumbbells />
          <StandingLegs />
        </>
      );
    case 'goblet-squat':
      return (
        <>
          <g className="squat-body">
            <path d="M130 68 L130 116" className="body-line" />
            <path d="M112 90 L118 106 L130 110 L142 106 L148 90" className="arm" />
            <rect x="118" y="100" width="24" height="12" rx="4" className="dumbbell single-weight" />
          </g>
          <path d="M130 126 L106 150 L112 178" className="leg" />
          <path d="M130 126 L154 150 L148 178" className="leg" />
        </>
      );
    case 'romanian-deadlift':
      return (
        <>
          <g className="hinge-body">
            <circle cx="176" cy="72" r="18" className="body" />
            <path d="M130 126 L168 88" className="body-line" />
            <path d="M166 90 L148 138" className="arm left-arm" />
            <path d="M174 92 L158 140" className="arm right-arm" />
            <rect x="138" y="136" width="20" height="12" rx="4" className="dumbbell left-weight" />
            <rect x="150" y="138" width="20" height="12" rx="4" className="dumbbell right-weight" />
          </g>
          <path d="M130 126 L118 176" className="leg" />
          <path d="M130 126 L142 176" className="leg" />
        </>
      );
    case 'reverse-lunge':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <SideDumbbells />
          <path d="M130 126 L112 146 L118 178" className="leg front-leg" />
          <path d="M130 126 L156 148 L172 168" className="leg back-leg" />
        </>
      );
    case 'calf-raise':
      return (
        <>
          <g className="calf-body">
            <path d="M130 68 L130 126" className="body-line" />
            <SideDumbbells />
            <StandingLegs />
          </g>
        </>
      );
    case 'glute-bridge':
      return (
        <>
          <line x1="24" y1="176" x2="236" y2="176" className="ground-line" />
          <circle cx="60" cy="150" r="16" className="body" />
          <g className="bridge-hip">
            <path d="M76 150 L150 150" className="body-line" />
            <rect x="140" y="142" width="24" height="12" rx="4" className="dumbbell single-weight" />
            <path d="M150 150 L150 120 L178 150" className="leg" />
          </g>
        </>
      );
    case 'one-arm-row':
      return (
        <>
          <circle cx="168" cy="70" r="18" className="body" />
          <path d="M132 132 L156 86" className="body-line" />
          <path d="M132 132 L104 162" className="arm left-arm" />
          <path d="M156 88 L130 96" className="arm forearm right-forearm" />
          <path d="M132 132 L116 176" className="leg" />
          <path d="M132 132 L154 176" className="leg" />
          <rect x="112" y="90" width="20" height="12" rx="4" className="dumbbell right-weight" />
        </>
      );
    case 'bent-over-row':
      return (
        <>
          <g className="hinge-body">
            <circle cx="176" cy="72" r="18" className="body" />
            <path d="M130 126 L168 88" className="body-line" />
            <path d="M166 90 L148 120" className="arm forearm left-forearm" />
            <path d="M174 92 L158 122" className="arm forearm right-forearm" />
            <rect x="138" y="118" width="18" height="12" rx="4" className="dumbbell left-weight" />
            <rect x="152" y="120" width="18" height="12" rx="4" className="dumbbell right-weight" />
          </g>
          <path d="M130 126 L118 176" className="leg" />
          <path d="M130 126 L142 176" className="leg" />
        </>
      );
    case 'pullover':
      return (
        <>
          <SupineBase />
          <path d="M136 144 L114 110" className="arm forearm left-forearm" />
          <path d="M136 144 L158 110" className="arm forearm right-forearm" />
          <rect x="118" y="100" width="24" height="12" rx="4" className="dumbbell left-weight" />
          <rect x="142" y="100" width="24" height="12" rx="4" className="dumbbell right-weight" />
        </>
      );
    case 'reverse-fly':
      return (
        <>
          <g className="hinge-body">
            <circle cx="176" cy="72" r="18" className="body" />
            <path d="M130 126 L168 88" className="body-line" />
            <path d="M166 90 L144 118" className="arm upper-arm left-arm" />
            <path d="M174 92 L156 120" className="arm upper-arm right-arm" />
            <rect x="136" y="118" width="18" height="12" rx="4" className="dumbbell left-weight" />
            <rect x="150" y="120" width="18" height="12" rx="4" className="dumbbell right-weight" />
          </g>
          <path d="M130 126 L118 176" className="leg" />
          <path d="M130 126 L142 176" className="leg" />
        </>
      );
    case 'superman-hold':
      return (
        <>
          <line x1="24" y1="176" x2="236" y2="176" className="ground-line" />
          <circle cx="78" cy="144" r="15" className="body" />
          <path d="M92 144 L140 136" className="body-line" />
          <path d="M140 136 L176 122" className="arm" />
          <path d="M122 140 L92 166" className="leg" />
          <path d="M138 138 L170 162" className="leg" />
        </>
      );
    case 'dead-bug':
      return (
        <>
          <SupineBase />
          <path d="M92 144 L74 110" className="arm left-arm" />
          <path d="M136 144 L164 116" className="arm right-arm" />
          <path d="M116 144 L88 110" className="leg left-leg" />
          <path d="M136 144 L170 162" className="leg right-leg" />
        </>
      );
    case 'bird-dog':
      return (
        <>
          <QuadrupedBase />
          <path d="M114 120 L64 108" className="arm left-arm" />
          <path d="M126 120 L176 108" className="leg right-leg" />
        </>
      );
    case 'side-plank':
      return (
        <>
          <line x1="24" y1="176" x2="236" y2="176" className="ground-line" />
          <circle cx="98" cy="114" r="15" className="body" />
          <path d="M98 128 L126 144 L162 144" className="body-line" />
          <path d="M92 130 L74 168" className="arm left-arm" />
          <path d="M162 144 L190 164" className="leg right-leg" />
        </>
      );
    case 'russian-twist':
      return (
        <>
          <line x1="24" y1="176" x2="236" y2="176" className="ground-line" />
          <circle cx="132" cy="96" r="16" className="body" />
          <g className="twist-body">
            <path d="M132 112 L126 148" className="body-line" />
            <path d="M126 124 L96 138" className="arm left-arm" />
            <path d="M126 124 L154 138" className="arm right-arm" />
          </g>
          <path d="M126 148 L94 176" className="leg left-leg" />
          <path d="M126 148 L160 176" className="leg right-leg" />
        </>
      );
    case 'hollow-hold':
      return (
        <>
          <line x1="24" y1="176" x2="236" y2="176" className="ground-line" />
          <circle cx="78" cy="134" r="15" className="body" />
          <path d="M92 134 L138 126" className="body-line" />
          <path d="M104 130 L74 104" className="arm left-arm" />
          <path d="M138 126 L184 112" className="leg right-leg" />
        </>
      );
    case 'knee-pushup':
      return (
        <>
          <line x1="24" y1="176" x2="236" y2="176" className="ground-line" />
          <circle cx="180" cy="88" r="16" className="body" />
          <g className="pushup-body">
            <path d="M168 98 L126 120 L84 146" className="body-line" />
            <path d="M132 118 L118 146" className="arm left-arm" />
            <path d="M146 112 L132 142" className="arm right-arm" />
          </g>
          <path d="M84 146 L64 176" className="leg" />
          <path d="M108 136 L132 176" className="leg" />
        </>
      );
    case 'floor-press':
      return (
        <>
          <SupineBase />
          <path d="M126 144 L118 112" className="arm forearm left-forearm" />
          <path d="M146 144 L154 112" className="arm forearm right-forearm" />
          <rect x="108" y="102" width="18" height="12" rx="4" className="dumbbell left-weight" />
          <rect x="154" y="102" width="18" height="12" rx="4" className="dumbbell right-weight" />
        </>
      );
    case 'squeeze-press':
      return (
        <>
          <SupineBase />
          <path d="M130 144 L130 112" className="arm forearm left-forearm" />
          <path d="M142 144 L142 112" className="arm forearm right-forearm" />
          <rect x="126" y="100" width="16" height="12" rx="4" className="dumbbell left-weight" />
          <rect x="142" y="100" width="16" height="12" rx="4" className="dumbbell right-weight" />
        </>
      );
    case 'floor-fly':
      return (
        <>
          <SupineBase />
          <path d="M130 144 L102 118" className="arm left-arm" />
          <path d="M142 144 L170 118" className="arm right-arm" />
          <rect x="90" y="112" width="18" height="12" rx="4" className="dumbbell left-weight" />
          <rect x="170" y="112" width="18" height="12" rx="4" className="dumbbell right-weight" />
        </>
      );
    case 'chest-squeeze-hold':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M118 90 L130 104 L142 90" className="arm" />
          <StandingLegs />
          <rect x="118" y="96" width="24" height="12" rx="4" className="dumbbell single-weight" />
        </>
      );
    default:
      return null;
  }
}

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
        {!['triceps-kickback', 'glute-bridge', 'romanian-deadlift', 'bent-over-row', 'reverse-fly', 'one-arm-row', 'superman-hold', 'pullover', 'dead-bug', 'bird-dog', 'side-plank', 'russian-twist', 'hollow-hold', 'knee-pushup', 'floor-press', 'squeeze-press', 'floor-fly'].includes(type) && <circle cx="130" cy="50" r="18" className="body" />}
        {pose(type)}
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
