import { Outlet, Link, useLoaderData } from 'react-router-dom';
import { getProducts } from '@/data/productData';
import { Product } from '@/types/product';

export const portalLoader = async () => {
  const products = await getProducts();
  return { products };
};

export default function PortalLayout() {
  const { products } = useLoaderData() as { products: Product[] };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-semibold">Menu</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/" className="hover:underline">
            Produtos
          </Link>
          <Link to="/novo" className="hover:underline">
            Novo Produto
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-bold text-gray-900">Smart Commerce</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet context={{ products }} />
        </main>
      </div>
    </div>
  );
}
