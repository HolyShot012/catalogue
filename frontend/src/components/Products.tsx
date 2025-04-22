import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Item[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [limit] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios
            .get(`http://localhost:3000/api/items?offset=${offset}&limit=${limit}`)
            .then((res) => {
                console.log('API Response:', res.data);
                setTotal(res.data.total);
                setProducts(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('API Error:', err);
                setError('Failed to fetch products');
                setLoading(false);
            });
    }, [offset, limit]);

    return (
        <main className="h-full p-10 flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Products</h1>
            <section className="w-full flex gap-8">
                <div className="flex-1 bg-white rounded-lg shadow-md p-6 max-h-[500px]">
                    <h2 className="text-xl font-bold mb-4">Filters</h2>
                    {/* Filter content can be added here */}
                </div>
                <div className="flex-3 flex flex-col">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-red-500 text-lg">{error}</div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-300 text-lg">No products found</div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                                            <p className="text-gray-600">{product.description}</p>
                                            <Link
                                                to={`/chi-tiet/${product.id}`}
                                                state={{ product }}
                                                className="mt-2 inline-block text-blue-500 hover:underline"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-4 mt-6">
                                <button
                                    onClick={() => setOffset(offset - limit)}
                                    className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed transition-colors duration-200"
                                    disabled={offset === 0}
                                >
                                    <HiChevronLeft className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={() => setOffset(offset + limit)}
                                    className="p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed transition-colors duration-200"
                                    disabled={offset + limit >= total}
                                >
                                    <HiChevronRight className="h-6 w-6" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Products;