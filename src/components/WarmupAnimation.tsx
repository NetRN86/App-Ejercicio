import type { WarmupMotion } from '../types';

interface Props {
  motion: WarmupMotion;
  label: string;
}

function StandingLegs() {
  return (
    <>
      <path d="M130 126 L106 176" className="leg" />
      <path d="M130 126 L154 176" className="leg" />
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

function RotateArrow({ cx, cy, r = 20 }: { cx: number; cy: number; r?: number }) {
  const startX = cx;
  const startY = cy - r;
  const endX = cx - r * 0.7;
  const endY = cy - r * 0.7;
  return (
    <g className="joint-rotate-arrow" style={{ transformOrigin: `${cx}px ${cy}px` }}>
      <path d={`M ${startX} ${startY} A ${r} ${r} 0 1 1 ${endX} ${endY}`} className="arrow" />
      <polygon points={`${endX - 7},${endY - 3} ${endX + 5},${endY - 8} ${endX + 2},${endY + 7}`} className="joint-arrow-head" />
      <circle cx={cx} cy={cy} r="5" className="joint-dot" />
    </g>
  );
}

const movementCopy: Record<WarmupMotion, string> = {
  'rotate-shoulders': 'Traza circulos amplios con los hombros, sin forzar.',
  'rotate-elbows': 'Dobla y extiende los codos con suavidad.',
  'rotate-wrists': 'Gira las munecas lento en ambos sentidos.',
  'rotate-hips': 'Dibuja circulos con la cadera, sin dolor.',
  'rotate-knees-ankles': 'Flexiona rodillas y gira tobillos con control.',
  'rotate-scapula': 'Lleva los omoplatos atras, abajo y adelante.',
  'rotate-torso': 'Gira el torso de lado a lado con la cadera estable.',
  'leg-swing': 'Balancea una pierna al frente y atras con control.',
  squat: 'Baja la cadera como si te sentaras y sube con control.',
  'calf-raise': 'Sube y baja los talones sin rebotar.',
  hinge: 'Lleva la cadera atras con la espalda larga.',
  row: 'Lleva el codo hacia atras apretando el omoplato.',
  'cat-cow': 'Alterna arquear y redondear la columna.',
  breathe: 'Inhala expandiendo el abdomen y exhala apretando suave.',
  reach: 'Extiende brazo y pierna contrarios con la zona lumbar estable.',
  bridge: 'Eleva y baja la cadera sin perder las costillas abajo.',
  'side-hold': 'Sostén la linea del costado sin colapsar el hombro.',
  'chest-opener': 'Abre y cierra los brazos frente al pecho.',
  'wall-press': 'Acerca y aleja el pecho de la pared con control.',
  'floor-press-warmup': 'Simula el press con recorrido corto y hombros estables.',
  pace: 'Repite el primer ejercicio con menos rango y mucha calma.',
};

function pose(motion: WarmupMotion) {
  switch (motion) {
    case 'rotate-shoulders':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <StandingLegs />
          <RotateArrow cx={108} cy={80} r={18} />
          <RotateArrow cx={152} cy={80} r={18} />
        </>
      );
    case 'rotate-elbows':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M108 92 L130 80 L152 92" className="arm" />
          <StandingLegs />
          <RotateArrow cx={108} cy={92} r={14} />
          <RotateArrow cx={152} cy={92} r={14} />
        </>
      );
    case 'rotate-wrists':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M108 92 L96 128" className="arm" />
          <path d="M152 92 L164 128" className="arm" />
          <StandingLegs />
          <RotateArrow cx={96} cy={132} r={12} />
          <RotateArrow cx={164} cy={132} r={12} />
        </>
      );
    case 'rotate-hips':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M130 126 L100 176" className="leg" />
          <path d="M130 126 L160 176" className="leg" />
          <RotateArrow cx={130} cy={126} r={28} />
        </>
      );
    case 'rotate-knees-ankles':
      return (
        <>
          <path d="M130 68 L130 122" className="body-line" />
          <path d="M130 122 L112 150 L108 176" className="leg" />
          <path d="M130 122 L150 150 L154 176" className="leg" />
          <RotateArrow cx={108} cy={176} r={14} />
          <RotateArrow cx={154} cy={176} r={14} />
        </>
      );
    case 'rotate-scapula':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M108 88 L130 96 L152 88" className="arm" />
          <StandingLegs />
          <RotateArrow cx={112} cy={82} r={14} />
          <RotateArrow cx={148} cy={82} r={14} />
        </>
      );
    case 'rotate-torso':
      return (
        <>
          <circle cx="130" cy="66" r="16" className="body" />
          <g className="warmup-twist">
            <path d="M130 82 L130 126" className="body-line" />
            <path d="M130 96 L104 108" className="arm" />
            <path d="M130 96 L156 108" className="arm" />
          </g>
          <StandingLegs />
        </>
      );
    case 'leg-swing':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M130 80 L104 118" className="arm" />
          <path d="M130 80 L156 118" className="arm" />
          <path d="M130 126 L154 176" className="leg swing-anchor" />
          <path d="M130 126 L106 176" className="leg swing-leg" />
        </>
      );
    case 'squat':
      return (
        <>
          <g className="warmup-squat-body">
            <path d="M130 68 L130 116" className="body-line" />
            <path d="M112 90 L118 106 L130 110 L142 106 L148 90" className="arm" />
          </g>
          <path d="M130 126 L106 150 L112 178" className="leg" />
          <path d="M130 126 L154 150 L148 178" className="leg" />
        </>
      );
    case 'calf-raise':
      return (
        <>
          <g className="warmup-calf-body">
            <path d="M130 68 L130 126" className="body-line" />
            <path d="M130 80 L108 128" className="arm" />
            <path d="M130 80 L152 128" className="arm" />
            <StandingLegs />
          </g>
        </>
      );
    case 'hinge':
      return (
        <>
          <g className="warmup-hinge-body">
            <circle cx="176" cy="72" r="18" className="body" />
            <path d="M130 126 L168 88" className="body-line" />
            <path d="M166 90 L148 138" className="arm" />
            <path d="M174 92 L158 140" className="arm" />
          </g>
          <path d="M130 126 L118 176" className="leg" />
          <path d="M130 126 L142 176" className="leg" />
        </>
      );
    case 'row':
      return (
        <>
          <g className="warmup-hinge-body">
            <circle cx="176" cy="72" r="18" className="body" />
            <path d="M130 126 L168 88" className="body-line" />
            <path d="M166 90 L148 120" className="arm warmup-row-arm" />
          </g>
          <path d="M130 126 L118 176" className="leg" />
          <path d="M130 126 L142 176" className="leg" />
        </>
      );
    case 'cat-cow':
      return (
        <g className="warmup-cat-cow">
          <QuadrupedBase />
        </g>
      );
    case 'breathe':
      return (
        <g className="warmup-breathe" style={{ transformOrigin: '130px 100px' }}>
          <circle cx="130" cy="66" r="16" className="body" />
          <path d="M130 82 L130 126" className="body-line" />
          <path d="M130 96 L106 118" className="arm" />
          <path d="M130 96 L154 118" className="arm" />
          <StandingLegs />
        </g>
      );
    case 'reach':
      return (
        <>
          <SupineBase />
          <path d="M92 144 L74 110" className="arm left-arm" />
          <path d="M136 144 L164 116" className="arm right-arm" />
          <path d="M116 144 L88 110" className="leg left-leg" />
          <path d="M136 144 L170 162" className="leg right-leg" />
        </>
      );
    case 'bridge':
      return (
        <>
          <line x1="24" y1="176" x2="236" y2="176" className="ground-line" />
          <circle cx="60" cy="150" r="16" className="body" />
          <g className="warmup-bridge-hip">
            <path d="M76 150 L150 150" className="body-line" />
            <path d="M150 150 L150 120 L178 150" className="leg" />
          </g>
        </>
      );
    case 'side-hold':
      return (
        <>
          <line x1="24" y1="176" x2="236" y2="176" className="ground-line" />
          <g className="warmup-hold">
            <circle cx="98" cy="114" r="15" className="body" />
            <path d="M98 128 L126 144 L162 144" className="body-line" />
            <path d="M92 130 L74 168" className="arm" />
            <path d="M162 144 L190 164" className="leg" />
          </g>
        </>
      );
    case 'chest-opener':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M130 92 L112 104" className="arm warmup-open-left" />
          <path d="M130 92 L148 104" className="arm warmup-open-right" />
          <StandingLegs />
        </>
      );
    case 'wall-press':
      return (
        <>
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M110 88 L96 60" className="arm warmup-press-left" />
          <path d="M150 88 L164 60" className="arm warmup-press-right" />
          <StandingLegs />
        </>
      );
    case 'floor-press-warmup':
      return (
        <>
          <SupineBase />
          <path d="M126 144 L118 112" className="arm warmup-press-left" />
          <path d="M146 144 L154 112" className="arm warmup-press-right" />
        </>
      );
    case 'pace':
      return (
        <g className="warmup-hold">
          <path d="M130 68 L130 126" className="body-line" />
          <path d="M130 80 L108 128" className="arm" />
          <path d="M130 80 L152 128" className="arm" />
          <StandingLegs />
        </g>
      );
    default:
      return null;
  }
}

export function WarmupAnimation({ motion, label }: Props) {
  return (
    <figure className="exercise-animation warmup-animation" aria-label={`Animacion de calentamiento: ${label}`}>
      <svg className={`animation-scene warmup-motion-${motion} is-playing`} viewBox="0 0 260 220" role="img" aria-labelledby={`warmup-${motion}-title`}>
        <title id={`warmup-${motion}-title`}>{label}</title>
        {!['reach', 'bridge', 'side-hold', 'cat-cow', 'rotate-torso', 'hinge', 'row', 'floor-press-warmup'].includes(motion) && <circle cx="130" cy="50" r="18" className="body" />}
        {pose(motion)}
      </svg>
      <figcaption>{movementCopy[motion]}</figcaption>
    </figure>
  );
}
