import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Image {
  filename: string;
  path: string;
  name: string;
  description: string;
}

const Home: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/images");
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        setImages(data.slice(0, 3)); // Limit to 3 for featured section
        setLoading(false);
      } catch (err) {
        setError("Unable to load featured parts. Please try again later.");
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Welcome to Our Car Parts Catalogue
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 animate-fade-in">
            {/* Image */}
            <div className="lg:w-1/2">
              <img
                src="/company-intro.jpg"
                alt="Company Introduction"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-md"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
            </div>
            {/* Text */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                About Our Company
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Car Parts
          </h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading featured parts...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : images.length === 0 ? (
            <p className="text-center text-gray-600">
              No featured parts available yet. Check back soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div
                  key={image.filename}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 relative group"
                >
                  <img
                    src={`http://localhost:5000${image.path}`}
                    alt={image.name}
                    className="w-full h-48 sm:h-56 object-cover"
                    onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                  />
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center text-sm p-4">
                      {image.description}
                    </p>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {image.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Explore Our Full Range
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <Link
            to="/san-pham"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors"
          >
            Browse Catalogue
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;