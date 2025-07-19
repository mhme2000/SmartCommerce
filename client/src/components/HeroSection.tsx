import React from 'react';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Smartphones de Última Geração
        </h2>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Descubra os melhores celulares com tecnologia 5G
        </p>
        <Button 
          onClick={scrollToProducts}
          className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg font-semibold"
        >
          Ver Produtos
        </Button>
      </div>
    </section>
  );
};
