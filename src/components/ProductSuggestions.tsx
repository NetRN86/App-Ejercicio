import { ShoppingBag } from 'lucide-react';
import { getProductsForExercise } from '../data/products';

interface Props {
  exerciseId: string;
}

const currencyFormatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

export function ProductSuggestions({ exerciseId }: Props) {
  const products = getProductsForExercise(exerciseId);
  if (products.length === 0) return null;

  return (
    <details className="product-suggestions">
      <summary><ShoppingBag size={16} aria-hidden /> Equipo para este ejercicio</summary>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} <span>({currencyFormatter.format(product.priceReference)} ref.)</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
