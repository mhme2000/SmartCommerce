import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shadow-md">
      <h1 className="text-xl font-bold tracking-wide">🛍️ Produtos</h1>
      <ul className="flex gap-6 text-sm font-medium">
        <li>
          <Link to="/" className="hover:text-teal-400 transition-colors duration-200">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-teal-400 transition-colors duration-200">
            Produtos
          </Link>
        </li>
      </ul>
    </nav>
  );
}