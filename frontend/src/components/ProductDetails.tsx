import React from 'react';
import { useLocation, Link } from 'react-router-dom';

interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
}

const ProductDetails: React.FC = () => {
    const { state } = useLocation();
    const product = state?.product as Item | undefined;
    console.log(product);

    if (!product) {
        return (
            <main className="h-full p-10 flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Product Details</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-600 text-lg">Product not found</div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen p-4 sm:p-10 bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Product Details</h1>
            <section className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full max-w-5xl">
                <div className="w-full sm:w-1/2">
                    <div className="relative aspect-square max-w-md mx-auto">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
                <div className="w-full sm:w-1/2 space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold">{product.name}</h2>
                    <p className="text-gray-600">Size: Product Size</p>
                    <Link
                        to="/lien-he"
                        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
            <section className="w-full max-w-5xl mt-10">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-600">{product.description}</p>
            </section>
        </main>
    );
};

export default ProductDetails;