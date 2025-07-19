import { useState, useMemo } from 'react';
import { Filters, SortOption } from '@/types/product';
import { products } from '@/data/products';

export const useProducts = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    categories: [],
    priceRange: { min: 0, max: 5000 },
    brands: [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!product.name.toLowerCase().includes(searchLower) &&
            !product.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      if (filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) {
          return false;
        }
      }
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }

      if (filters.brands.length > 0) {
        const brand = getBrand(product.name);
        if (!filters.brands.includes(brand)) {
          return false;
        }
      }

      return true;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'relevance':
      default:
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const getBrand = (productName: string): string => {
    const nameLower = productName.toLowerCase();
    if (nameLower.includes('samsung')) return 'Samsung';
    if (nameLower.includes('motorola')) return 'Motorola';
    if (nameLower.includes('xiaomi')) return 'Xiaomi';
    return 'Other';
  };

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      categories: [],
      priceRange: { min: 0, max: 5000 },
      brands: [],
    });
  };

  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach(product => {
      brands.add(getBrand(product.name));
    });
    return Array.from(brands);
  }, []);

  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach(product => {
      categories.add(product.category);
    });
    return Array.from(categories);
  }, []);

  return {
    products: filteredAndSortedProducts,
    filters,
    sortBy,
    updateFilters,
    setSortBy,
    clearFilters,
    availableBrands,
    availableCategories,
  };
};
