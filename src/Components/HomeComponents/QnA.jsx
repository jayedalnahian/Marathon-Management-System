import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const QnA = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I register for a marathon event?",
            answer: "To register, you must first log in or create an account. Then, go to the 'Marathons' page, choose an event, and click 'See Details.' If registration is open, you'll see a 'Register' button which leads to the registration form."
        },
        {
            question: "Can I create my own marathon event?",
            answer: "Yes! Once logged in, you can go to your Dashboard and select 'Add Marathon.' Fill out the form with event details such as title, date, location, and distance. Your marathon will then appear on the Marathons page."
        },
        {
            question: "What happens after I register for a marathon?",
            answer: "Once you register, your registration will be stored in the database and shown under 'My Apply List' on your dashboard. You'll also receive a confirmation message on the screen after submitting the form. You can update or delete your registration anytime before the event using your dashboard."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers for event registrations. All transactions are securely processed through our payment gateway partners."
        },
        {
            question: "Can I get a refund if I can't attend?",
            answer: "Refund policies vary by event. Most marathons offer full refunds up to 30 days before the event, with partial refunds available up to 14 days before. Please check the specific event details for their refund policy."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="w-full max-w-7xl mx-auto my-16">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center justify-center bg-[#A27B5C]/10 p-3 rounded-full mb-4">
                    <FiHelpCircle className="text-2xl text-[#A27B5C]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2C3930] mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg text-[#3F4F44] max-w-2xl mx-auto">
                    Find answers to common questions about our marathon events
                </p>
            </motion.div>

            <div className="space-y-4 mx-auto">
                {faqs.map((faq, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border border-[#DCD7C9] rounded-xl overflow-hidden shadow-sm hover:shadow-md max-w-7xl mx-3 transition-shadow bg-[#F8F7F3]"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        >
                            <h3 className="text-lg font-medium text-[#2C3930]">
                                {faq.question}
                            </h3>
                            <motion.div
                                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-[#A27B5C]"
                            >
                                <FiChevronDown className="w-5 h-5" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6 pt-0 text-[#3F4F44]">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-12">
                <p className="text-[#3F4F44] mb-4">
                    Still have questions?
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-[#A27B5C] text-[#DCD7C9] rounded-lg font-medium hover:bg-[#8a6a4f] transition-colors">
                    Contact Support
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default QnA;