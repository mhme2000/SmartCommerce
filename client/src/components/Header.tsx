import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, Menu, Smartphone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useProducts } from '@/hooks/useProducts';

export const Header: React.FC = () => {
  const { toggleCart, getItemCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();
  const { filters, updateFilters } = useProducts();
  const [searchValue, setSearchValue] = useState(filters.search);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    updateFilters({ search: value });
  };

  const cartItemCount = getItemCount();
  const wishlistItemCount = getWishlistCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Smartphone className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-slate-800">TechShop</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar produtos, marcas..."
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistItemCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-amber-500 text-white text-xs"
                >
                  {wishlistItemCount}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative" onClick={toggleCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
};
