import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-5">
            <div className="flex items-center gap-2.5">
                <Link to="/" className="flex items-center gap-2.5 no-underline text-inherit">
                    <FaHome size={24} />
                    <h1 className="text-2xl m-0">Trang chủ</h1>
                </Link>
            </div>
            <nav className="flex gap-4">
                <Link to="/gioi-thieu" className="hover:underline">Giới thiệu</Link>
                <Link to="/san-pham" className="hover:underline">Sản phẩm</Link>
                <Link to="/csbh" className="hover:underline">CSBH</Link>
                <Link to="/faq" className="hover:underline">Câu hỏi thường gặp</Link>
                <Link to="/lien-he" className="hover:underline">Liên hệ</Link>
            </nav>
        </header>
    );
};

export default Header;