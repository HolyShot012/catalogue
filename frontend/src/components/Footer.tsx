import React from "react";

interface FooterProps {
    title: string;
    links: string[];
}
const FooterComponent: React.FC<FooterProps> = ({ title, links }) => {
    return (
        <div>
            <h1 className="text-xl font-bold mb-4">{title}</h1>
            <ul className="space-y-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <a href="#" className="hover:text-blue-600">{link}</a>
                    </li>
                ))}
            </ul>
        </div>
    )

}

const Footer: React.FC = () => {
    return (
        <footer className="p-5 flex flex-wrap justify-around gap-2.5 bg-gray-100">
            <FooterComponent title="Company" links={["Home", "Contact", "Careers"]} />
            <FooterComponent title="About us" links={["Our story", "Team", "FAQ"]} />
            <FooterComponent title="Products" links={["Product 1", "Product 2", "Product 3"]} />
        </footer>
    );
};

export default Footer;