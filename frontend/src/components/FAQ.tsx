import React, { useState, useEffect, useRef } from 'react';
import picture from '../assets/temp.png'; // Adjust the path as necessary
import { IoAdd } from 'react-icons/io5';
import { gsap } from 'gsap';
const questionList = [
    {
        question: "Question 1",
        answer: "Answer to question 1"
    },
    {
        question: "Question 2",
        answer: "Answer to question 2"
    },
    {
        question: "Question 3",
        answer: "Answer to question 3"
    },
    {
        question: "Question 4",
        answer: "Answer to question 4"
    }
]
const FAQ: React.FC = () => {
    return (
        <>
            <main>
                <section className={`h-[47vh] w-full relative  bg-cover bg-center`} style={{ backgroundImage: `url(${picture})` }}>
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <h1 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                        Câu hỏi thường gặp
                    </h1>

                </section>

                <section className="px-5 py-10 space-y-3">


                    {questionList.map((item, index) => (
                        <FAQComponent2 key={index} question={item.question} answer={item.answer} />
                    ))}

                </section>
            </main >
        </>



    );
};

export default FAQ

interface FAQComponent1ItemProps {
    question: string;
    answer: string;
}

const FAQComponent2: React.FC<FAQComponent1ItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const answerRef = useRef<HTMLDivElement>(null); // Reference to the answer div for GSAP

    // GSAP animation effect
    useEffect(() => {
        if (answerRef.current) {
            if (isOpen) {
                // Animate in: slide down and fade in
                gsap.fromTo(
                    answerRef.current,
                    { height: 0, opacity: 0, overflow: 'hidden' },
                    {
                        height: 'auto',
                        opacity: 1,
                        duration: 0.5,
                        ease: 'power3.out',
                    }
                );
            } else {
                // Animate out: slide up and fade out
                gsap.to(answerRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power3.in',
                    onComplete: () => {
                        if (answerRef.current) {
                            answerRef.current.style.overflow = 'hidden';
                        }
                    },
                });
            }
        }
    }, [isOpen]);

    return (
        <div className=" max-w-[1200px] mx-auto mb-4">
            <div
                className="bg-gray-200  rounded-lg flex justify-between items-center px-10 py-4 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="text-lg font-bold">{question}</h2>
                <IoAdd
                    size={30}
                    className={`text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''
                        }`}
                />
            </div>
            <div
                ref={answerRef}
                className="px-10 py-4"
                style={{ display: isOpen ? 'block' : 'none', overflow: 'hidden' }}
            >
                <p >{answer}</p>
            </div>
        </div>
    );
};