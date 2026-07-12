import { ExternalLink } from 'lucide-react';
import { exercises } from '../data/exercises';
import type { Product } from '../types';

interface Props {
  product: Product;
}

const currencyFormatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

export function ProductCard({ product }: Props) {
  const exerciseNames = product.exerciseIds
    .map((id) => exercises.find((exercise) => exercise.id === id)?.name)
    .filter(Boolean);

  return (
    <article className="product-card">
      <div className="card-kicker">{product.category}</div>
      <h3>{product.name}</h3>
      <p className="product-price">{currencyFormatter.format(product.priceReference)} <span>precio de referencia</span></p>
      <div className="detail-grid">
        <div>
          <span>Te sirve para</span>
          <p>{exerciseNames.length > 0 ? exerciseNames.join(', ') : product.generalPurpose}</p>
        </div>
      </div>
      {product.note && <p className="product-note">{product.note}</p>}
      <a className="product-vendor-link" href={product.vendorSearchUrl} target="_blank" rel="noreferrer">
        Buscar en {product.vendorName} <ExternalLink size={16} aria-hidden />
      </a>
    </article>
  );
}
