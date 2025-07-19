import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">
      <img
        src={product.pictureUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300";
        }}
      />
      
      <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
        {product.name}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {product.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-blue-600">
          {formatPrice(product.price)}
        </span>
        <span className="text-xs text-gray-500">
          Código: {product.id}
        </span>
      </div>
    </div>
  );
};