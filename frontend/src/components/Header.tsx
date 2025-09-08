import React, { useState } from 'react';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-gray-800 text-white p-5 z-10 top-0 relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Home Link */}
        <div className="flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2.5 no-underline text-white">
            <FaHome size={24} />
            <h1 className="text-xl sm:text-2xl m-0 text-white">Trang chủ</h1>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link to="/gioi-thieu" className="hover:underline text-white no-underline">
            Giới thiệu
          </Link>
          <Link to="/san-pham" className="hover:underline text-white no-underline">
            Sản phẩm
          </Link>
          <Link to="/csbh" className="hover:underline text-white no-underline">
            CSBH
          </Link>
          <Link to="/faq" className="hover:underline text-white no-underline">
            Câu hỏi thường gặp
          </Link>
          <Link to="/lien-he" className="hover:underline text-white no-underline">
            Liên hệ
          </Link>
        </nav>

        {/* Burger Icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 z-10 flex flex-col items-center gap-4 py-4 absolute top-full left-0 w-full border-t border-gray-700 transition-all duration-300">
          <Link
            to="/gioi-thieu"
            className="hover:underline text-white no-underline text-lg"
            onClick={toggleMenu}
          >
            Giới thiệu
          </Link>
          <Link
            to="/san-pham"
            className="hover:underline text-white no-underline text-lg"
            onClick={toggleMenu}
          >
            Sản phẩm
          </Link>
          <Link
            to="/csbh"
            className="hover:underline text-white no-underline text-lg"
            onClick={toggleMenu}
          >
            CSBH
          </Link>
          <Link
            to="/faq"
            className="hover:underline text-white no-underline text-lg"
            onClick={toggleMenu}
          >
            Câu hỏi thường gặp
          </Link>
          <Link
            to="/lien-he"
            className="hover:underline text-white no-underline text-lg"
            onClick={toggleMenu}
          >
            Liên hệ
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;