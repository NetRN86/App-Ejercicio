import type { Product } from '../types';

/**
 * Precios de referencia, no garantizados ni actualizados en tiempo real.
 * Los enlaces llevan a una búsqueda en el sitio del proveedor, no a un
 * producto específico, para evitar apuntar a listados que cambian o dejan
 * de existir. `exerciseIds` referencia ids reales de src/data/exercises.ts
 * (no texto libre) para poder cruzar productos con ejercicios de forma
 * confiable.
 */
export const products: Product[] = [
  {
    id: 'mancuernas-5kg-par',
    name: 'Par de mancuernas de 5 kg',
    category: 'Mancuernas',
    priceReference: 450,
    currency: 'MXN',
    vendorName: 'Mercado Libre',
    vendorSearchUrl: 'https://listado.mercadolibre.com.mx/mancuernas-5-kg-par',
    exerciseIds: ['biceps-curl', 'hammer-curl', 'shoulder-press', 'alternating-curl', 'reverse-curl', 'lateral-raise', 'romanian-deadlift', 'reverse-lunge', 'calf-raise', 'isometric-hold', 'farmers-walk', 'one-arm-row', 'bent-over-row', 'pullover', 'reverse-fly', 'floor-press', 'squeeze-press', 'floor-fly', 'chest-squeeze-hold'],
    note: 'Ya lo usas en la rutina actual; este es solo un ejemplo de dónde conseguirlo si te faltan.',
  },
  {
    id: 'mancuernas-ajustables',
    name: 'Set de mancuernas ajustables (2.5 a 15 kg)',
    category: 'Mancuernas',
    priceReference: 1800,
    currency: 'MXN',
    vendorName: 'Mercado Libre',
    vendorSearchUrl: 'https://listado.mercadolibre.com.mx/mancuernas-ajustables',
    exerciseIds: [],
    generalPurpose: 'Progresar de peso cuando 5 kg se sienta ligero, en cualquier ejercicio con mancuernas.',
  },
  {
    id: 'bandas-resistencia-set',
    name: 'Set de bandas de resistencia (varios niveles)',
    category: 'Bandas',
    priceReference: 350,
    currency: 'MXN',
    vendorName: 'Amazon México',
    vendorSearchUrl: 'https://www.amazon.com.mx/s?k=bandas+de+resistencia+set',
    exerciseIds: [],
    generalPurpose: 'Calentamiento de hombros y variaciones más ligeras de curl y press.',
    note: 'Buena opción si te falta peso en las mancuernas o quieres variar el estímulo.',
  },
  {
    id: 'guantes-entrenamiento',
    name: 'Guantes de entrenamiento con agarre',
    category: 'Accesorios',
    priceReference: 250,
    currency: 'MXN',
    vendorName: 'Amazon México',
    vendorSearchUrl: 'https://www.amazon.com.mx/s?k=guantes+de+entrenamiento+gimnasio',
    exerciseIds: ['farmers-walk', 'isometric-hold', 'one-arm-row', 'bent-over-row'],
    note: 'Opcional: ayuda si las manos sudan o si el agarre se siente incómodo.',
  },
  {
    id: 'munequeras-soporte',
    name: 'Muñequeras de soporte',
    category: 'Accesorios',
    priceReference: 180,
    currency: 'MXN',
    vendorName: 'Mercado Libre',
    vendorSearchUrl: 'https://listado.mercadolibre.com.mx/munequeras-de-soporte-gimnasio',
    exerciseIds: ['shoulder-press', 'overhead-triceps'],
    note: 'Útil si sientes molestia en la muñeca al extender el brazo con peso sobre la cabeza.',
  },
  {
    id: 'tapete-ejercicio',
    name: 'Tapete de ejercicio antideslizante',
    category: 'Superficie',
    priceReference: 400,
    currency: 'MXN',
    vendorName: 'Amazon México',
    vendorSearchUrl: 'https://www.amazon.com.mx/s?k=tapete+de+ejercicio+antideslizante',
    exerciseIds: ['glute-bridge', 'goblet-squat', 'superman-hold', 'dead-bug', 'bird-dog', 'side-plank', 'russian-twist', 'hollow-hold', 'knee-pushup', 'floor-press', 'squeeze-press', 'floor-fly', 'chest-squeeze-hold'],
    generalPurpose: 'Base estable y cómoda para cualquier rutina en casa, sobre todo ejercicios en el piso.',
  },
];

export function getProductsForExercise(exerciseId: string): Product[] {
  return products.filter((product) => product.exerciseIds.includes(exerciseId));
}
