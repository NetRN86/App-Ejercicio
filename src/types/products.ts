export type ProductCategory = 'Mancuernas' | 'Bandas' | 'Accesorios' | 'Superficie';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  priceReference: number;
  currency: 'MXN';
  vendorName: string;
  vendorSearchUrl: string;
  /** ids reales de src/data/exercises.ts, no nombres en texto libre. */
  exerciseIds: string[];
  generalPurpose?: string;
  note?: string;
}
