import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

export const Home: React.FC = () => {
  const [codigoInput, setCodigoInput] = useState('');
  const [codigoFiltro, setCodigoFiltro] = useState('');

  const produtosFiltrados = useMemo(() => {
    if (!codigoFiltro.trim()) {
      return products;
    }
    
    const codigo = parseInt(codigoFiltro);
    if (isNaN(codigo)) {
      return [];
    }
    
    return products.filter(product => product.id === codigo);
  }, [codigoFiltro]);

  const handleFiltrar = () => {
    setCodigoFiltro(codigoInput);
  };

  const handleLimparFiltro = () => {
    setCodigoInput('');
    setCodigoFiltro('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFiltrar();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Portal de Produtos</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-2">
                Código
              </label>
              <input
                id="codigo"
                type="text"
                value={codigoInput}
                onChange={(e) => setCodigoInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite o código do produto (ex: 123, 134, 135...)"
              />
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleFiltrar}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Filtrar
              </button>
              <button
                onClick={handleLimparFiltro}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Produtos {produtosFiltrados.length > 0 && `(${produtosFiltrados.length} encontrado${produtosFiltrados.length !== 1 ? 's' : ''})`}
          </h2>
          
          {produtosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {produtosFiltrados.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {codigoFiltro ? 
                  `Nenhum produto encontrado com o código "${codigoFiltro}". Códigos disponíveis: 123, 134, 135, 141, 145, 167, 189, 204` : 
                  'Digite um código no campo acima e clique em "Filtrar" para buscar um produto específico.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};