import React, { useRef } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { gsap } from 'gsap';

const Contact: React.FC = () => {
    return (
        <main className="flex items-center justify-center p-8">
            <div className="container mx-auto px-4">
                <ContactComponent1 />
                <hr />
                <ContactComponent2 />
            </div>
        </main>
    );
};

const input = [
    {
        label: "Họ tên",
        type: "text",
    },
    {
        label: "Địa chỉ Email",
        type: "email",
    },
    {
        label: "Số điện thoại",
        type: "tel",
    }
];

const ContactComponent1: React.FC = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X relative to button
        const y = e.clientY - rect.top;  // Mouse Y relative to button

        // Convert to percentage for radial gradient
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Animate radial gradient from mouse position
        gsap.to(button, {
            duration: 0.3,
            background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, #2563EB 0%, #6B7280 100%)`,
            ease: 'power2.out',
        });
    };

    const handleMouseLeave = () => {
        const button = buttonRef.current;
        if (!button) return;

        // Revert to original color
        gsap.to(button, {
            duration: 0.3,
            background: '#6B7280', // gray-500
            ease: 'power2.out',
        });
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 mb-8">
            <div className="p-8 bg-gradient-to-b from-gray-700 to-gray-900 text-white md:col-span-1">
                <h1 className="text-3xl font-bold mb-6">Liên hệ chúng tôi</h1>
                <p className="mb-6 text-[1.2rem]">Liên hệ với chúng tôi qua thông tin dưới đây:</p>
                <ul>
                    <ContactComponent1Item icon={MdEmail} text="hehehe@gmail.com" />
                    <ContactComponent1Item icon={FaPhoneAlt} text="SĐT: (090) 390-2070" />
                    <ContactComponent1Item icon={FaMapMarkerAlt} text="Địa chỉ: 149 Bùi Thanh Kiết, Tân Túc, Bình Chánh" />
                </ul>
            </div>
            <div className="p-10 md:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Liên lạc</h2>
                <form className="space-y-4">
                    {input.map((item, index) => (
                        <ContactComponent1Input key={index} label={item.label} type={item.type} />
                    ))}

                    <label className="block mb-1 text-sm font-bold text-[#05060f99] group-hover:text-[#05060fc2] transition-colors duration-300">
                        Lời nhắn
                    </label>
                    <textarea
                        rows={4}
                        className="w-full px-4 py-2 text-base bg-[#05060f0a] rounded-lg border-2 border-transparent focus:border-[#05060f] hover:border-[#05060f] transition-all duration-300 resize-none"
                    ></textarea>

                    <button
                        type="submit"
                        ref={buttonRef}
                        className="bg-gray-500 text-white px-6 py-2 rounded-md cursor-pointer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Gửi
                    </button>
                </form>
            </div>
        </section>
    );
};

interface ContactComponent1InputProps {
    label: string;
    type: string;
}

const ContactComponent1Input: React.FC<ContactComponent1InputProps> = ({ label, type }) => {
    return (
        <>
            <label className="block mb-1 text-sm font-bold text-[#05060f99] group-hover:text-[#05060fc2] transition-colors duration-300">
                {label}
            </label>
            <input
                type={type}
                className="w-full h-11 px-4 text-base bg-[#05060f0a] rounded-lg border-2 border-transparent focus:border-[#05060f] hover:border-[#05060f] transition-all duration-300"
            />
        </>
    );
};

interface ContactComponent1ItemProps {
    icon: React.ComponentType<{ size?: number | string; className?: string }>;
    text: string;
}

const ContactComponent1Item: React.FC<ContactComponent1ItemProps> = ({ icon: Icon, text }) => {
    return (
        <li className="flex items-start md:items-center gap-4 mb-8">
            <div className="flex-shrink-0 flex justify-center items-center w-fit h-fit p-3 md:p-4 border border-white rounded-full">
                <Icon size={20} />
            </div>
            <span className='text-[1.1rem] break-words'>{text}</span>
        </li>
    );
};

const ContactComponent2: React.FC = () => {
    return (
        <section className="h-fit w-full p-5">
            <h1 className="text-3xl font-bold mb-6 text-center">Địa điểm</h1>
            <div className='h-[60vh]'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1215.2833664050092!2d106.57579719543595!3d10.685160925956964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317532f49dcbfd31%3A0x1dedf750f21656b5!2zMTQ5IELDuWkgVGhhbmggS2hp4bq_dCwgVFQuIFTDom4gVMO6YywgQsOsbmggQ2jDoW5oLCBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1746524211608!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </section>
    );
};

export default Contact;