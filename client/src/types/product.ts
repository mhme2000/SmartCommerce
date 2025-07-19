export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  id: number;
  product: Product;
}

export interface Filters {
  search: string;
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  brands: string[];
}

export type SortOption = 'relevance' | 'price-low' | 'price-high' | 'name';
