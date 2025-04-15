import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
    title: string;
    links: {
        title: string;
        url: string;
    }[];
}
const footerList = [
    {
        title: "Company",
        links: [
            { title: "Home", url: "/" },
            { title: "Contact", url: "/lien-he" },
            { title: "CSBH", url: "/csbh" },
        ],
    },
    {
        title: "About us",
        links: [
            { title: "Our story", url: "/gioi-thieu" },
            { title: "Team", url: "/gioi-thieu" },
            { title: "FAQ", url: "/faq" },
        ],
    },
    {
        title: "Products",
        links: [
            { title: "Product 1", url: "/product-1" },
            { title: "Product 2", url: "/product-2" },
            { title: "Product 3", url: "/product-3" },
        ],
    },
]
const FooterComponent: React.FC<FooterProps> = ({ title, links }) => {
    return (
        <div>
            <h1 className="text-xl font-bold mb-4">{title}</h1>
            <ul className="space-y-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link to={`${link.url}`} className="hover:text-blue-600">{link.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )

}

const Footer: React.FC = () => {
    return (
        <footer className="p-5 flex flex-wrap justify-around gap-2.5 bg-gray-100">
            {footerList.map((item, index) => (
                <FooterComponent key={index} title={item.title} links={item.links} />
            ))}
        </footer>
    );
};

export default Footer;