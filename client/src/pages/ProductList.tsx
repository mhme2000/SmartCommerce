import { useState, useMemo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/ProductCard';
import { getProductById, createProduct } from '@/data/productData';
import Papa from 'papaparse';

interface OutletContext {
  products: Product[];
}

export default function ProductList() {
  const { products } = useOutletContext<OutletContext>();

  const [codigoInput, setCodigoInput] = useState('');
  const [codigoFiltro, setCodigoFiltro] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [resultadoBusca, setResultadoBusca] = useState<Product[] | null>(null);
  const [csvFileName, setCsvFileName] = useState('');
  const [csvProdutos, setCsvProdutos] = useState<Array<{ produto: Product; selecionado: boolean; resultado?: 'sucesso' | 'falha'; mensagem?: string }>>([]);
  const [enviandoCsv, setEnviandoCsv] = useState(false);

  const produtosFiltrados = useMemo(() => {
    if (resultadoBusca) return resultadoBusca;
    return products;
  }, [resultadoBusca, products]);

  const handleFiltrar = async () => {
    setCodigoFiltro(codigoInput);
    const codigo = parseInt(codigoInput, 10);
    if (isNaN(codigo)) {
      alert('Digite apenas números no campo Código');
      setResultadoBusca([]);
      return;
    }
    try {
      setBuscando(true);
      const produto = await getProductById(codigo);
      setResultadoBusca(produto ? [produto] : []);
    } catch (e) {
      setResultadoBusca([]);
    } finally {
      setBuscando(false);
    }
  };

  const handleLimparFiltro = () => {
    setCodigoInput('');
    setCodigoFiltro('');
    setResultadoBusca(null);
  };

  const handleCsvChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isCsv = /\.csv$/i.test(file.name);
    if (!isCsv) {
      alert('Extensão de arquivo inválida');
      e.target.value = '';
      setCsvFileName('');
      setCsvProdutos([]);
      return;
    }
    setCsvFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[];
        const parsed = rows.map((r) => {
          const produto: Product = {
            id: Number(r.id ?? r.codigo ?? r.code ?? 0),
            name: String(r.name ?? r.nome ?? ''),
            description: String(r.description ?? r.descricao ?? ''),
            price: Number(r.price ?? r.preco ?? 0),
            category: String(r.category ?? r.categoria ?? ''),
            pictureUrl: String(r.pictureUrl ?? r.imagem ?? ''),
          };
          return { produto, selecionado: false };
        });
        setCsvProdutos(parsed);
      },
      error: () => {
        alert('Falha ao processar o arquivo');
        setCsvProdutos([]);
        setCsvFileName('');
      },
    });
  };

  const handleEnviarCsv = async () => {
    if (!csvProdutos.length) return;
    try {
      setEnviandoCsv(true);
      const updated = await Promise.all(
        csvProdutos.map(async (item) => {
          if (!item.selecionado) return item;
          try {
            await createProduct(item.produto);
            return { ...item, resultado: 'sucesso' as const, mensagem: 'Criado com sucesso' };
          } catch (e: any) {
            return { ...item, resultado: 'falha' as const, mensagem: e?.message || 'Falha ao criar' };
          }
        })
      );
      setCsvProdutos(updated);
    } finally {
      setEnviandoCsv(false);
    }
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
        <div className="flex flex-col gap-6">
          <div className="flex items-end gap-4">
            <div className="flex-1 max-w-md">
              <label htmlFor="csv" className="block text-sm font-medium text-gray-700 mb-2">
                Arquivo CSV
              </label>
              <input
                id="csv"
                type="file"
                accept=".csv"
                onChange={handleCsvChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {csvFileName && (
                <p className="text-xs text-gray-500 mt-1">{csvFileName}</p>
              )}
            </div>
            <button
              disabled={!csvProdutos.length || enviandoCsv}
              onClick={handleEnviarCsv}
              className="bg-purple-600 disabled:opacity-60 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Enviar
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-2">
                Código
              </label>
              <input
                id="codigo"
                type="text"
                value={codigoInput}
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={(e: { target: { value: any; }; }) => {
                  const onlyDigits = String(e.target.value).replace(/\D+/g, '');
                  setCodigoInput(onlyDigits);
                }}
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
                Buscar
              </button>
              <button
                onClick={handleLimparFiltro}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Limpar
              </button>
            </div>
          </div>

          {!!csvProdutos.length && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {csvProdutos.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Código: {item.produto.id}</span>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={item.selecionado}
                        onChange={(e) => {
                          const next = [...csvProdutos];
                          next[idx] = { ...item, selecionado: e.target.checked } as any;
                          setCsvProdutos(next);
                        }}
                      />
                      Selecionar
                    </label>
                  </div>
                  <img
                    src={item.produto.pictureUrl}
                    alt={item.produto.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&h=300";
                    }}
                  />
                  <h3 className="font-semibold text-gray-800 mb-1">{item.produto.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-2">{item.produto.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-blue-600">R$ {Number(item.produto.price || 0).toFixed(2)}</span>
                    <span className="text-gray-500">{item.produto.category}</span>
                  </div>
                  {item.resultado && (
                    <div className={`mt-2 text-sm ${item.resultado === 'sucesso' ? 'text-green-700' : 'text-red-700'}`}>
                      {item.mensagem}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      
      {buscando ? (
        <div className="text-center py-12 text-gray-500">Buscando...</div>
      ) : produtosFiltrados.length > 0 ? (
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
              : 'Não existem produtos cadastrados'}
          </p>
        </div>
      )}
    </div>
  );
}
