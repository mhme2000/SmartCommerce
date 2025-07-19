import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart, Zap, Heart, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    onClose();
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    onClose();
    openCart();
  };

  const handleAddToWishlist = () => {
    if (!isWishlisted) {
      addToWishlist(product);
    }
  };

  const getFeatures = () => {
    const features = [];
    if (product.name.toLowerCase().includes('amoled')) features.push('Tela AMOLED');
    if (product.name.toLowerCase().includes('5g')) features.push('Conectividade 5G');
    if (product.name.toLowerCase().includes('50mp')) features.push('Câmera 50MP');
    if (product.name.toLowerCase().includes('128gb')) features.push('128GB armazenamento');
    if (product.name.toLowerCase().includes('256gb')) features.push('256GB armazenamento');
    if (product.name.toLowerCase().includes('8gb')) features.push('8GB RAM');
    return features;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Detalhes do Produto</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <img
              src={product.pictureUrl}
              alt={product.name}
              className="w-full rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600";
              }}
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              {product.name.toLowerCase().includes('5g') && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">5G</Badge>
              )}
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 ml-2">
                Em Estoque
              </Badge>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              {product.name}
            </h2>

            <div className="flex items-center mb-4">
              <div className="flex text-amber-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <Star className="h-4 w-4" />
              </div>
              <span className="text-slate-600 ml-2">(4.2) • 1.234 avaliações</span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <p className="text-slate-600 text-sm mt-1">
                Em até 12x de {formatPrice(product.price / 12)} sem juros
              </p>
            </div>

            {/* Features */}
            {getFeatures().length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Características Principais:</h3>
                <ul className="text-slate-600 space-y-1 text-sm">
                  {getFeatures().map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantidade:</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold text-lg min-w-[2rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button onClick={handleAddToCart} className="w-full" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              <Button onClick={handleBuyNow} className="w-full bg-green-600 hover:bg-green-700" size="lg">
                <Zap className="h-5 w-5 mr-2" />
                Comprar Agora
              </Button>
              <Button 
                onClick={handleAddToWishlist} 
                variant="outline" 
                className="w-full" 
                size="lg"
                disabled={isWishlisted}
              >
                <Heart className="h-5 w-5 mr-2" />
                {isWishlisted ? 'Nos Favoritos' : 'Adicionar aos Favoritos'}
              </Button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-4">Descrição do Produto</h3>
          <p className="text-slate-600 leading-relaxed">
            {product.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
