export type ProductCategory = 'Mancuernas' | 'Bandas' | 'Accesorios' | 'Superficie';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  priceReference: number;
  currency: 'MXN';
  vendorName: string;
  vendorSearchUrl: string;
  usedFor: string[];
  note?: string;
}
