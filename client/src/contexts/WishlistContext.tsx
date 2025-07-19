import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { WishlistItem, Product } from '@/types/product';

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] };

interface WishlistContextType {
  state: WishlistState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: number) => boolean;
  getItemCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.some(item => item.product.id === action.payload.id);
      if (exists) return state;
      
      return {
        ...state,
        items: [...state.items, { id: Date.now(), product: action.payload }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
      };
    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
  });

  useEffect(() => {
    const savedWishlist = localStorage.getItem('techshop-wishlist');
    if (savedWishlist) {
      try {
        const wishlistData = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: wishlistData });
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('techshop-wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId: number) => {
    return state.items.some(item => item.product.id === productId);
  };

  const getItemCount = () => {
    return state.items.length;
  };

  const value: WishlistContextType = {
    state,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    getItemCount,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
