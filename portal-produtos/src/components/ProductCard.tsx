import type { Product } from "../models/Product";

interface ProductCardProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    return (
        <li className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col justify-between">
            <div>
                <p className="font-semibold text-slate-900">{product.name}</p>
                <p className="mt-1 text-sm text-slate-600">R$ {product.price.toFixed(2)}</p>
            </div>
            <div className="mt-4 flex gap-2">
                <button
                    className="text-sm px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    onClick={() => onEdit(product)}
                >
                    Editar
                </button>
                <button
                    className="text-sm px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700 transition"
                    onClick={() => onDelete(product)}
                >
                    Excluir
                </button>
            </div>
        </li>
    );
}