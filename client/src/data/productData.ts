import { Product } from '@/types/product';
import { api } from '@/lib/api';

export async function getProducts(): Promise<Product[]> {
  const res = await api.get('/produtos');
  return res.data as Product[];
}

export async function getProductById(id: number): Promise<Product> {
  const res = await api.get(`/produtos/${id}`);
  return res.data as Product;
}

export async function createProduct(product: Product): Promise<Product> {
  const res = await api.post('/produtos', product);
  return res.data as Product;
}

export async function updateProduct(id: number, product: Product): Promise<Product> {
  const res = await api.put(`/produtos/${id}`, product);
  return res.data as Product;
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/produtos/${id}`);
}