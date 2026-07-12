import type { Product } from '../types';

/**
 * Precios de referencia, no garantizados ni actualizados en tiempo real.
 * Los enlaces llevan a una búsqueda en el sitio del proveedor, no a un
 * producto específico, para evitar apuntar a listados que cambian o dejan
 * de existir.
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
    usedFor: ['Curl de biceps con mancuernas', 'Curl martillo', 'Press de hombros con mancuernas'],
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
    usedFor: ['Progresar de peso cuando 5 kg se sienta ligero'],
  },
  {
    id: 'bandas-resistencia-set',
    name: 'Set de bandas de resistencia (varios niveles)',
    category: 'Bandas',
    priceReference: 350,
    currency: 'MXN',
    vendorName: 'Amazon México',
    vendorSearchUrl: 'https://www.amazon.com.mx/s?k=bandas+de+resistencia+set',
    usedFor: ['Calentamiento de hombros', 'Variaciones más ligeras de curl y press'],
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
    usedFor: ['Farmer\'s walk', 'Sostén isométrico de mancuernas'],
    note: 'Opcional: ayuda si las manos sudan o si el agarre se siente incómodo.',
  },
  {
    id: 'muñequeras-soporte',
    name: 'Muñequeras de soporte',
    category: 'Accesorios',
    priceReference: 180,
    currency: 'MXN',
    vendorName: 'Mercado Libre',
    vendorSearchUrl: 'https://listado.mercadolibre.com.mx/munequeras-de-soporte-gimnasio',
    usedFor: ['Press de hombros con mancuernas', 'Extensión de tríceps sobre la cabeza'],
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
    usedFor: ['Base estable para cualquier rutina en casa'],
  },
];
