import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  title: string;
  links: { title: string; url: string }[];
}

const footerList = [
  {
    title: "Công ty",
    links: [
      { title: "Trang chủ", url: "/" },
      { title: "Sản phẩm", url: "/san-pham" },
      { title: "Liên hệ", url: "/lien-he" },
    ],
  },
  {
    title: "Về chúng tôi",
    links: [
      { title: "Giới thiệu", url: "/gioi-thieu" },
      { title: "Câu hỏi thường gặp", url: "/faq" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { title: "Chính sách bán hàng", url: "/csbh" },
      { title: "Hỗ trợ khách hàng", url: "/lien-he" },
    ],
  },
  {
    title: "Kết nối",
    links: [
      { title: "Facebook", url: "https://facebook.com" },
      { title: "Zalo", url: "https://zalo.me" },
      { title: "SĐT: +9999999999", url: "tel:+9999999999" },
    ],
  },
  {
    title: "Thông tin liên hệ",
    links: [
      { title: "Email: seele@gmail.com", url: "mailto:seele@gmail.com" },
      { title: "SĐT: +0903 902 070", url: "tel:+0903902070" },
      { title: "+0918 727 816", url: "tel:+0918727816" },
      { title: "Address: 149 Bùi Thanh Kiết, Tân Túc, Bình Chánh", url: "https://www.google.co.in/maps/place/149+B%C3%B9i+Thanh+Khi%E1%BA%BFt,+TT.+T%C3%A2n+T%C3%BAc,+B%C3%ACnh+Ch%C3%A1nh,+H%E1%BB%93+Ch%C3%AD+Minh,+Vietnam/@10.6851609,106.5757972,18.69z/data=!4m6!3m5!1s0x317532f49dcbfd31:0x1dedf750f21656b5!8m2!3d10.6852757!4d106.5762474!16s%2Fg%2F11l6fdn6gf?entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D" },
    ],
  },
];

const FooterComponent: React.FC<FooterProps> = ({ title, links }) => {
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const shouldScrollToTop = !["Kết nối", "Thông tin liên hệ"].includes(title);

  return (
    <div className="flex-1 min-w-[200px] mb-6">
      <h1 className="text-xl font-bold text-white mb-4">{title}</h1>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.url}
              className="text-white hover:text-blue-600 hover:underline text-base"
              onClick={shouldScrollToTop ? handleLinkClick : undefined}
            >
              {title === "Thông tin liên hệ" && link.title === "+0918 727 816" ? (
                <span className="pl-[2.3rem]">{link.title}</span>
              ) : (
                link.title
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="p-8 bg-gray-800 text-white flex flex-wrap justify-around gap-6 z-20">
      {footerList.map((item, index) => (
        <FooterComponent key={index} title={item.title} links={item.links} />
      ))}
    </footer>
  );
};

export default Footer;