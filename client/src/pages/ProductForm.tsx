import { useState } from 'react';
import { useRevalidator } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '@/data/productData';
import { Product } from '@/types/product';

export default function ProductForm() {
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [form, setForm] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    category: '',
    pictureUrl: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'id' ? Number(value) : value,
    }));
  };

  const handleCreate = () => {
    if (!form.id || !form.name) {
      alert('ID e Nome são obrigatórios');
      return;
    }
    addProduct(form);
    revalidator.revalidate();
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Cadastrar Novo Produto</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="id">
            ID
          </label>
          <input
            id="id"
            name="id"
            type="number"
            value={form.id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="description">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="price">
            Preço
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="category">
            Categoria
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="pictureUrl">
            URL da Imagem
          </label>
          <input
            id="pictureUrl"
            name="pictureUrl"
            type="text"
            value={form.pictureUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
        >
          Criar
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
