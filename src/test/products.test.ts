import { describe, expect, it } from 'vitest';
import { exercises } from '../data/exercises';
import { getProductsForExercise, products } from '../data/products';

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

  it('every exerciseIds reference points to a real exercise', () => {
    const exerciseIds = new Set(exercises.map((exercise) => exercise.id));
    for (const product of products) {
      for (const exerciseId of product.exerciseIds) {
        expect(exerciseIds.has(exerciseId)).toBe(true);
      }
    }
  });

  it('a product without exerciseIds has a generalPurpose explanation', () => {
    for (const product of products) {
      if (product.exerciseIds.length === 0) {
        expect(product.generalPurpose).toBeTruthy();
      }
    }
  });

  it('getProductsForExercise returns only products linked to that exercise', () => {
    const forBicepsCurl = getProductsForExercise('biceps-curl');
    expect(forBicepsCurl.some((product) => product.id === 'mancuernas-5kg-par')).toBe(true);
    expect(forBicepsCurl.some((product) => product.id === 'tapete-ejercicio')).toBe(false);
  });
});
