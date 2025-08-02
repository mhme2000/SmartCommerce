import { Product } from '@/types/product';
import { products as initialProducts } from './products';

let productData: Product[] = [...initialProducts];

export function getProducts(): Product[] {
  return productData;
}

export function addProduct(product: Product) {
  productData = [...productData, product];
}