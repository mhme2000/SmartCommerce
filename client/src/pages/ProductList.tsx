import { useState, useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';

interface OutletContext {
  products: Product[];
}

export default function ProductList() {
  const { products } = useOutletContext<OutletContext>();

  const [codigoInput, setCodigoInput] = useState('');
  const [codigoFiltro, setCodigoFiltro] = useState('');

  const produtosFiltrados = useMemo(() => {
    if (!codigoFiltro.trim()) {
      return products;
    }
    const codigo = parseInt(codigoFiltro, 10);
    if (isNaN(codigo)) {
      return [];
    }
    return products.filter((p) => p.id === codigo);
  }, [codigoFiltro, products]);

  const handleFiltrar = () => {
    setCodigoFiltro(codigoInput);
  };

  const handleLimparFiltro = () => {
    setCodigoInput('');
    setCodigoFiltro('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Lista de Produtos</h2>
        <Link
          to="/novo"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Novo produto
        </Link>
      </div>

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
              onChange={(e: { target: { value: any; }; }) => setCodigoInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleFiltrar();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite o código do produto (ex: 123, 134, ...)"
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

      {/* Grid de produtos */}
      {produtosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtosFiltrados.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {codigoFiltro
              ? `Nenhum produto encontrado com o código "${codigoFiltro}".`
              : 'Digite um código no campo acima e clique em "Filtrar" para buscar um produto específico.'}
          </p>
        </div>
      )}
    </div>
  );
}
