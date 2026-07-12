import { describe, expect, it } from 'vitest';
import { products } from '../data/products';

describe('products catalog', () => {
  it('has at least one product per category', () => {
    const categories = new Set(products.map((product) => product.category));
    expect(categories.size).toBeGreaterThan(1);
  });

  it('has unique ids', () => {
    const ids = products.map((product) => product.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every product has a positive reference price and a vendor link', () => {
    for (const product of products) {
      expect(product.priceReference).toBeGreaterThan(0);
      expect(product.vendorSearchUrl.startsWith('https://')).toBe(true);
    }
  });
});
