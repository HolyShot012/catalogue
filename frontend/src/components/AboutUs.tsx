import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import picture from '../assets/temp.png'; // Adjust the path as necessary


const results = [
    { span: "50", text: "năm hình thành và phát triển" },
    { span: "21", text: "types of products" },
    { span: "3", text: "labels" },
    { span: "300", text: "locations sold" }
]
const AboutUS: React.FC = () => {

    return (
        <main>
            <AboutUsComponent1 />
            <AboutUsComponent2 />
            <AboutUsComponent3 />
        </main>
    );
};

export default AboutUS

const AboutUsComponent1: React.FC = () => {
    const list = ["Chất lượng", "Độ bền", "Tin cậy", "Phù hợp"]
    return (
        <>
            <section className="flex gap-5 justify-center  p-10 flex-wrap">
                <div className=" md:w-[30rem] w-full ">
                    <h1 className="font-bold text-[2.4rem]">Câu chuyện của chúng tôi</h1>
                    <p className="py-5 leading-relaxed text-[20px] text-[#666666]">Công Ty Sản Xuất Thương Mại Đại Lộc Phát, hay còn được nhiều khách hàng quen gọi là Phụ Tùng Ô Tô Đại Lộc Phát, khởi nguồn từ một xưởng sản xuất nhỏ. Qua hơn 31 năm không ngừng nỗ lực và phát triển, chúng tôi đã vươn mình trở thành đơn vị vừa sản xuất vừa thương mại phụ tùng ô tô uy tín, chuyên phục vụ cho các dòng xe tải đến từ Trung Quốc, Nhật Bản, Hàn Quốc và nhiều thương hiệu khác. Mặc dù mới chính thức đăng ký kinh doanh gần đây, nhưng với bề dày kinh nghiệm thực tiễn, Đại Lộc Phát tự hào tiếp tục sứ mệnh đồng hành cùng khách hàng trên mọi chặng đường.</p>
                    <ul className="flex gap-4 justify-between items-center flex-wrap">
                        {list.map((item, index) => (
                            <AboutUsComponent1Item key={index} span={item} />
                        ))}

                    </ul>
                </div>
                <div className="flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
                    <img
                        src={picture}
                        alt="About Us Image 1 - Team or product showcase"
                        className="w-[12rem] sm:w-[14rem] aspect-[3/4] object-cover rounded-md"
                    />
                    <img
                        src={picture}
                        alt="About Us Image 2 - Team or product showcase"
                        className="w-[12rem] sm:w-[14rem] aspect-[3/4] object-cover rounded-md"
                    />
                </div>


            </section></>
    )
}


interface AboutUsComponent1ItemProps {
    span: string
}
const AboutUsComponent1Item: React.FC<AboutUsComponent1ItemProps> = ({ span }) => {
    return (
        <>
            <li className="flex gap-[5px] justify-start items-center">
                <FaCircleCheck className="text-green-500" />
                <span className="font-bold text-[20px]"> {span}</span>
            </li>
        </>
    )
}
interface AboutUsComponent2ItemProps {
    span: string
    text: string
}

const AboutUsComponent2: React.FC = () => {
    return (
        <section className="min-h-screen h-full">
            <div className="relative w-full h-[40vh] md:h-[60vh] bg-black/50 bg-[url('/path-to-your-image.jpg')] bg-cover bg-center bg-blend-overlay">
                <h1 className='absolute left-1/2 top-1/2 md:top-1/3 text-center transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl sm:text-5xl   font-bold uppercase'>
                    Thành tích</h1>
            </div>
            <div className='relative w-full h-[fit] '>
                <div className=" md:absolute left-1/2 md:-translate-x-1/2 top-[-20vh] bg-white w-full max-w-9/10 mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center  justify-center h-50vh  gap-8 p-4 sm:p-10">
                        <div className="md:max-w-[450px] w-full   h-full flex flex-col justify-between ">
                            <h1 className="text-5xl font-bold">Kết quả</h1>
                            <p className="py-5 text-[20px] leading-relaxed text-[#666666]">Phụ tùng xe của Đại Lộc Phát đã và đang khẳng định vị thế trên thị trường nhờ vào chất lượng vượt trội và độ tin cậy cao. Với hàng nghìn sản phẩm được cung cấp mỗi năm, chúng tôi tự hào góp phần nâng cao hiệu suất và độ bền cho hàng loạt phương tiện trên toàn quốc.</p>
                            
                        </div>
                        <div className=" grid grid-cols-2 gap-6">
                            {results.map((item, index) => (
                                <AboutsComponent2Item key={index} span={item.span} text={item.text} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const AboutsComponent2Item: React.FC<AboutUsComponent2ItemProps> = ({ span, text }) => {
    return (
        <div className="min-w-fit p-2  bg-gray-50 rounded-lg min-w-[150px] text-center">
            <span className="text-[2rem]  md:text-[3rem] font-bold text-blue-600 block mx-auto">{span}+</span>
            <p className="text-gray-600 capitalize">{text}</p>
        </div>
    )
}

const AboutUsComponent3: React.FC = () => {
    return (
        <section className="flex flex-col md:flex-row gap-[40px]  justify-center p-4 md:p-10">
            <div className="w-full md:flex-1 h-[250px] md:h-[500px]">
                <img src={picture} alt="About Us" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:flex-1 mt-4 md:mt-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Định hướng phát triển</h2>
                <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
                Đại Lộc Phát không ngừng mở rộng hệ thống phân phối và nâng cao chất lượng dịch vụ nhằm phục vụ khách hàng tốt hơn mỗi ngày. Chúng tôi hướng đến việc trở thành đơn vị hàng đầu trong lĩnh vực phụ tùng ô tô tại Việt Nam, đồng hành cùng sự phát triển bền vững của ngành giao thông vận tải.
                </p>
            </div>
        </section>
    )
}