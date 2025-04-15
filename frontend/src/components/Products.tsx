import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/items')
            .then((res) => {
                console.log('API Response:', res.data);
                setProducts(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('API Error:', err);
                setError('Failed to fetch products');
                setLoading(false);
            });
    }, []);

    return (
        <main className="h-full p-10 flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Products</h1>
                {loading ? (
                    <p className="text-lg">Loading products...</p>
                ) : error ? (
                    <p className="text-lg text-red-500">{error}</p>
                ) : products.length > 0 ? (
                    products.map((item) => (
                        <div key={item.id} className="border p-4 mb-4 rounded shadow-md">
                            <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-32 h-32 object-cover mb-2 mx-auto"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/128';
                                }}
                            />
                            <p className="text-lg mb-2">{item.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-lg">No products available</p>
                )}
            </div>
        </main>
    );
};

export default Products;