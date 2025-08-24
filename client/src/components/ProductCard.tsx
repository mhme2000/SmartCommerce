import React, { useState } from 'react';
import { updateProduct, deleteProduct } from '@/data/productData';

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
  const [isEditing, setIsEditing] = useState(false);
  const [local, setLocal] = useState<Product>({ ...product });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
      {isEditing ? (
        <div className="space-y-2">
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={local.name}
            onChange={(e) => setLocal({ ...local, name: e.target.value })}
          />
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            rows={3}
            value={local.description}
            onChange={(e) => setLocal({ ...local, description: e.target.value })}
          />
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            type="number"
            step="0.01"
            value={local.price}
            onChange={(e) => setLocal({ ...local, price: Number(e.target.value) })}
          />
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={local.category}
            onChange={(e) => setLocal({ ...local, category: e.target.value })}
          />
          <input
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={local.pictureUrl}
            onChange={(e) => setLocal({ ...local, pictureUrl: e.target.value })}
          />
        </div>
      ) : (
        <>
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
          <div className="mt-1 text-sm text-gray-600">{product.category}</div>
        </>
      )}

      <div className="mt-4 flex gap-2">
        {isEditing ? (
          <>
            <button
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-60"
              onClick={async () => {
                try {
                  setSaving(true);
                  await updateProduct(local.id, local);
                  setIsEditing(false);
                  window.location.reload();
                } catch (e: any) {
                  alert(e?.message || 'Falha ao salvar');
                } finally {
                  setSaving(false);
                }
              }}
            >
              Salvar
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              onClick={() => {
                setLocal({ ...product });
                setIsEditing(false);
              }}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
            <button
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md disabled:opacity-60"
              onClick={async () => {
                const confirmDelete = window.confirm('Você quer mesmo excluir este produto?');
                if (!confirmDelete) return;
                try {
                  setDeleting(true);
                  await deleteProduct(product.id);
                  window.location.reload();
                } catch (e: any) {
                  alert(e?.message || 'Falha ao excluir');
                } finally {
                  setDeleting(false);
                }
              }}
            >
              Excluir
            </button>
          </>
        )}
      </div>
    </div>
  );
};