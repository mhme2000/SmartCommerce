import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../models/Product';
import EditProductCard from '../components/EditProductCard';
import { api } from '../services/api';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [addProduct, setAddProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState<File | null>(null);

    const fetchProducts = () => {
        api.get<Product[]>("/product")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Erro ao buscar produtos:", err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreate = (product: Product) => {
        api.post<Product>('/product', product)
            .then((response) => {
                product = response.data;
                setProducts(prev => [product, ...prev]);
            })
            .catch(err => console.log('Erro ao criar o produto:', err))
        setAddProduct(null);
    }

    const handleUpdate = (product: Product) => {
        api.put(`/product/${product.id}`, product)
        setProducts(prev =>
            prev.map(p => (p.id === product.id ? product : p))
        );
        setEditingProduct(null);
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
    };

    const handleDelete = (product: Product) => {
        const confirm = window.confirm(`Deseja excluir o produto "${product.name}"?`);
        if (confirm) {
            api.delete(`/product/${product.id}`)
                .then(() => {
                    setProducts(prev => prev.filter(p => p.id !== product.id));
                })
                .catch(err => console.error("Erro ao excluir produto:", err));
        }
    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    const handleUpload = async () => {
        if (!file) {
            return alert("Selecione um arquivo primeiro!");
        }

        const form = new FormData();
        form.append("file", file);

        api.post("/product/upload", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                alert("Importação concluída com sucesso!");
                fetchProducts();
                setFile(null);
            })
            .catch(err => console.log("Não foi possível realizar a importação do arquivo .CSV", err));
            

    };

    const handleDownloadLayout = async () => {
        try {
            const response = await api.get("/product/download-layout", {
                responseType: "blob"
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");

            a.href = url;
            a.download = "layout.csv";

            document.body.appendChild(a);

            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Erro ao baixar o layout CSV", err);
            alert("Não foi possível baixar o layout CSV");
        }
    }

    return (
        <section className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">Nossos Produtos</h2>
            <button
                onClick={handleDownloadLayout}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50 mr-1"
            >
                📁 Download layout .CSV
            </button>
            <label className="inline-block bg-blue-600 text-white px-5 py-2 rounded cursor-pointer hover:bg-blue-700 transition mb-6">
                📁 Importar .CSV
                <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
            <button
                onClick={handleUpload}
                disabled={!file}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 ml-1"
            >
                Enviar
            </button>
            <label
                onClick={() => setAddProduct({ id: 0, name: '', price: 0 })}
                className="inline-block bg-red-600 text-white px-5 py-2 rounded cursor-pointer hover:bg-red-700 transition ml-3 mb-6"
            >
                ➕ Criar Produto
            </label>
            {loading ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <li key={idx} className="animate-pulse bg-slate-100 rounded-lg h-28" />
                    ))}
                </ul>
            ) : products.length === 0 ? (
                <div className="text-center text-slate-600">Nenhum produto cadastrado.</div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((_prod) => (
                        <ProductCard
                            key={_prod.id}
                            product={_prod}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </ul>
            )}

            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <EditProductCard
                            product={editingProduct}
                            onSave={handleUpdate}
                            onCancel={() => setEditingProduct(null)}
                        />
                    </div>
                </div>
            )}

            {addProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <EditProductCard
                            product={addProduct}
                            onSave={handleCreate}
                            onCancel={() => setAddProduct(null)}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}