import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import picture from "../assets/temp.png";
import axios from "axios";
import { FaStar } from "react-icons/fa";

interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface Review {
  customerName: string;
  rating: number;
  reviewText: string;
}

const reviews: Review[] = [
  {
    customerName: "Nguyễn Văn A",
    rating: 5,
    reviewText: "Sản phẩm chất lượng, giá cả hợp lý. Tôi rất hài lòng với dịch vụ của Đại Lộc Phát!",
  },
  {
    customerName: "Trần Thị B",
    rating: 4,
    reviewText: "Giao hàng nhanh, sản phẩm đúng mô tả. Sẽ tiếp tục ủng hộ trong tương lai.",
  },
  {
    customerName: "Lê Minh C",
    rating: 5,
    reviewText: "Chất lượng tuyệt vời, đội ngũ hỗ trợ rất nhiệt tình. Rất đáng tin cậy!",
  },
  {
    customerName: "Phạm Ngọc D",
    rating: 4,
    reviewText: "Sản phẩm tốt, nhưng thời gian giao hàng có thể cải thiện thêm.",
  },
];

const CustomerReview: React.FC<Review> = ({ customerName, rating, reviewText }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start gap-4 border border-gray-200 transition-transform duration-300 hover:scale-105">
      {/* Customer Name */}
      <h3 className="text-lg font-semibold text-gray-900">{customerName}</h3>
      {/* Rating Stars */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            size={20}
            className={index < rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
      {/* Review Text */}
      <p className="text-gray-600 text-sm leading-relaxed">{reviewText}</p>
    </div>
  );
};

const Home: React.FC = () => {
  const [products, setProducts] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/items?limit=6')
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
    <main className="relative w-full left-0 top-0 flex flex-col min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r h-screen from-gray-700 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex justify-center items-center flex-col h-full">
          <h1 className="uppercase text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Đại Lộc Phát
          </h1>
          <p className="text-center sm:text-lg md:text-xl max-w-2xl mx-auto">
            Giá tận gốc, Sản phẩm chất lượng, Sản xuất theo nhu cầu
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
                src={picture}
                alt="Company Introduction"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-md"
                onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
              />
            </div>
            {/* Text */}
            <div className="lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Về chúng tôi
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Đại Lộc Phát chuyên cung cấp đa dạng hơn 1000 mặt hàng phụ tùng ô tô 
                như bơm nhớt, bơm nước, xi lanh, piston, séc măng, trục cam, trục cơ,
                 miểng dên, ron bộ, nắp sinh hàn, ruột sinh hàn, valve và git... Chúng 
                 tôi cam kết mang đến sản phẩm chất lượng cao, một số sản phẩm được bảo 
                 hành lên đến 2 năm. Với phương châm "Lấy hàng tận gốc – Giá cả hợp lý 
                 – Chất lượng đảm bảo", chúng tôi luôn nỗ lực đem đến cho khách hàng sự
                  an tâm tuyệt đối trong từng sản phẩm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Đánh giá khách hàng
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <CustomerReview
                key={index}
                customerName={review.customerName}
                rating={review.rating}
                reviewText={review.reviewText}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Phụ tùng bán chạy
          </h2>
          {loading ? (
            <p className="text-center text-gray-600">Đang tải...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600">
              Chưa có sản phẩm, kiểm tra lại sau!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div
                  key={item.name}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 sm:h-56 object-cover"
                    onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                  />
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:blur-xs cursor-pointer transition-opacity duration-300">
                    <p className="text-white text-center text-sm p-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {item.description}
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
            Khám phá nhiều mặt hàng thêm
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Khám phá thêm nhiều phụ tùng xe hơi chất lượng, giúp xe bạn vận hành êm ái và an toàn. Bấm vào đây để xem toàn bộ danh mục sản phẩm!
          </p>
          <Link
            to="/san-pham"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors"
          >
            Xem thêm!
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;