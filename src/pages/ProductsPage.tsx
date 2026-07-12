import { useMemo, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

const filters = ['Todos', 'Mancuernas', 'Bandas', 'Accesorios', 'Superficie'];

export function ProductsPage() {
  const [filter, setFilter] = useState('Todos');
  const filtered = useMemo(
    () => products.filter((product) => filter === 'Todos' || product.category === filter),
    [filter],
  );

  return (
    <div className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Equipo recomendado</span>
          <h1>Productos para tu rutina</h1>
        </div>
      </div>
      <p className="product-disclaimer">
        Los precios son de referencia y pueden variar. Los enlaces te llevan a una búsqueda en el
        proveedor, no a un producto específico, para que compares opciones y envío a tu zona antes
        de comprar.
      </p>
      <div className="segmented" role="tablist" aria-label="Filtros de productos">
        {filters.map((item) => (
          <button key={item} type="button" role="tab" aria-selected={filter === item} className={filter === item ? 'selected' : ''} onClick={() => setFilter(item)}>{item}</button>
        ))}
      </div>
      <div className="library-grid">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}
