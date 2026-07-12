import { ExternalLink } from 'lucide-react';
import type { Product } from '../types';

interface Props {
  product: Product;
}

const currencyFormatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

export function ProductCard({ product }: Props) {
  return (
    <article className="product-card">
      <div className="card-kicker">{product.category}</div>
      <h3>{product.name}</h3>
      <p className="product-price">{currencyFormatter.format(product.priceReference)} <span>precio de referencia</span></p>
      <div className="detail-grid">
        <div><span>Te sirve para</span><p>{product.usedFor.join(', ')}</p></div>
      </div>
      {product.note && <p className="product-note">{product.note}</p>}
      <a className="product-vendor-link" href={product.vendorSearchUrl} target="_blank" rel="noreferrer">
        Buscar en {product.vendorName} <ExternalLink size={16} aria-hidden />
      </a>
    </article>
  );
}
