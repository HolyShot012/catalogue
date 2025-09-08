import React, { useState } from "react";
import { Link } from "react-router-dom";

const CSBH: React.FC = () => {
  // State to track which section is expanded
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    privacy: false,
    terms: false,
    returns: false,
  });

  // Toggle expansion for a section
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Chính Sách Bảo Hành
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Tại Đại Lộc Phát, chúng tôi xây dựng chính sách bảo hành rõ ràng và minh bạch để khách hàng yên tâm khi sử dụng sản phẩm.
          </p>
        </header>

        {/* Policy Sections */}
        <section className="space-y-6">
          {/* Privacy Policy */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <button
              onClick={() => toggleSection("privacy")}
              className="w-full bg-gray-800 text-white text-left px-6 py-4 flex justify-between items-center hover:bg-gray-900 transition-colors"
            >
              <h2 className="text-lg sm:text-xl font-semibold">
                Privacy Policy
              </h2>
              <span className="text-xl">
                {expandedSections.privacy ? "−" : "+"}
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedSections.privacy
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur.
                </p>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-4">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum. Sed ut
                  perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </p>
              </div>
            </div>
          </div>

          {/* Terms of Service */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <button
              onClick={() => toggleSection("terms")}
              className="w-full bg-gray-800 text-white text-left px-6 py-4 flex justify-between items-center hover:bg-gray-900 transition-colors"
            >
              <h2 className="text-lg sm:text-xl font-semibold">
                Terms of Service
              </h2>
              <span className="text-xl">
                {expandedSections.terms ? "−" : "+"}
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedSections.terms
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                  ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis.
                </p>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-4">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                  aut fugit, sed quia consequuntur magni dolores eos qui ratione
                  voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                  ipsum quia dolor sit amet.
                </p>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <button
              onClick={() => toggleSection("returns")}
              className="w-full bg-gray-800 text-white text-left px-6 py-4 flex justify-between items-center hover:bg-gray-900 transition-colors"
            >
              <h2 className="text-lg sm:text-xl font-semibold">
                Return Policy
              </h2>
              <span className="text-xl">
                {expandedSections.returns ? "−" : "+"}
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedSections.returns
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  tellus elementum sagittis vitae et leo duis ut diam. Nunc sed
                  blandit libero volutpat sed cras ornare arcu.
                </p>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mt-4">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
            Có câu hỏi?
          </h2>
          <p className="text-gray-700 text-sm sm:text-base mb-6">
          Đừng ngần ngại liên hệ với chúng tôi, đội ngũ Đại Lộc Phát luôn sẵn sàng hỗ trợ bạn mọi lúc!
          </p>
          <Link
            to="/lien-he"
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors"
          >
            Liên hệ hỗ trợ
          </Link>
        </section>
      </div>
    </main>
  );
};

export default CSBH;