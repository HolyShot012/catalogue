import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Contact: React.FC = () => {
    return (
        <main className=" flex items-center justify-center p-8">
            <div className="container mx-auto px-4">
                <ContactComponent1 />
                <hr />
                <ContactComponent2 />
            </div>
        </main>
    );
};

const ContactComponent1: React.FC = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 mb-8">
            <div className="p-8 bg-blue-500 text-white md:col-span-1 ">
                <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                <p className="mb-6 text-[1.2rem]">Feel free to contact us using the information below:</p>
                <ul>
                    <ContactComponent1Item icon={MdEmail} text="123 Main St, Anytown, USA" />
                    <ContactComponent1Item icon={FaPhoneAlt} text="Phone: (123) 456-7890" />
                    <ContactComponent1Item icon={FaMapMarkerAlt} text="Email: [info@yourdomain.com](mailto:info@gmail.,com " />
                </ul>
            </div>
            <div className="p-10 md:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Get in touch</h2>
                <form className="space-y-4">
                    <label className="block mb-1 text-sm font-bold text-[#05060f99] group-hover:text-[#05060fc2] transition-colors duration-300">
                        Fullname
                    </label>
                    <input
                        type="text"
                        className="w-full h-11 px-4 text-base bg-[#05060f0a] rounded-lg border-2 border-transparent focus:border-[#05060f] hover:border-[#05060f] transition-all duration-300"
                    />

                    <label className="block mb-1 text-sm font-bold text-[#05060f99] group-hover:text-[#05060fc2] transition-colors duration-300">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="w-full h-11 px-4 text-base bg-[#05060f0a] rounded-lg border-2 border-transparent focus:border-[#05060f] hover:border-[#05060f] transition-all duration-300"
                    />

                    <label className="block mb-1 text-sm font-bold text-[#05060f99] group-hover:text-[#05060fc2] transition-colors duration-300">
                        Phone
                    </label>
                    <input
                        type="tel"
                        className="w-full h-11 px-4 text-base bg-[#05060f0a] rounded-lg border-2 border-transparent focus:border-[#05060f] hover:border-[#05060f] transition-all duration-300"
                    />

                    <label className="block mb-1 text-sm font-bold text-[#05060f99] group-hover:text-[#05060fc2] transition-colors duration-300">
                        Message
                    </label>
                    <textarea
                        rows={4}
                        className="w-full px-4 py-2 text-base bg-[#05060f0a] rounded-lg border-2 border-transparent focus:border-[#05060f] hover:border-[#05060f] transition-all duration-300 resize-none"
                    ></textarea>

                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    )
}
interface ContactComponent1ItemProps {
    icon: React.ComponentType<{ size?: number | string; className?: string }>;
    text: string;
}
const ContactComponent1Item: React.FC<ContactComponent1ItemProps> = ({ icon: Icon, text }) => {
    return (
        <li className="flex items-center gap-2 mb-3 p-5">
            <div className="flex justify-center items-center w-fit h-fit p-4 border border-white rounded-full">
                <Icon size={20} />
            </div>
            <span className='text-[1.1rem]'>{text}</span>
        </li>
    );
}
const ContactComponent2: React.FC = () => {
    return (
        <section className="h-fit w-full p-5">
            <h1 className="text-3xl font-bold mb-6 text-center"> Location</h1>
            <div className='h-[60vh]'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1627309332862!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>

        </section>
    )
}
export default Contact