import React, { useEffect, useState } from "react"
import axios from "axios"
const Home: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        axios.get('http://localhost:3000/api/items')
            .then((res) => {
                console.log('API Response:', res.data);
                setProducts(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('API Error:', err);
                setError('Failed to fetch products');
                setLoading(false);
            }
            )
    }, [])
    console.log(products)
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold underline">Home Page</h1>
        </main>
    )
}

export default Home 