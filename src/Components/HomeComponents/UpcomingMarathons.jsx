import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaRunning } from 'react-icons/fa';

const UpcomingMarathons = () => {
    const upcomingMarathons = [
        {
            id: 1,
            title: "Spring City Run",
            date: "2023-05-15",
            location: "New York",
            image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 2,
            title: "Summer Beach Marathon",
            date: "2023-07-22",
            location: "Miami",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 3,
            title: "Autumn Trail Challenge",
            date: "2023-10-08",
            location: "Denver",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
    ];

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { 
            y: 0, 
            opacity: 1,
            transition: {
                ease: "easeOut",
                duration: 0.6
            }
        }
    };

    return (
        <section className="py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    Upcoming Marathons
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover exciting running events happening near you
                </p>
            </motion.div>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {upcomingMarathons.map((event) => (
                    <motion.div 
                        key={event.id}
                        variants={item}
                        whileHover={{ y: -5 }}
                        className="overflow-hidden rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-xl"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={event.image} 
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Coming Soon
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                            
                            <div className="flex items-center text-gray-600 mb-3">
                                <FaMapMarkerAlt className="mr-2 text-primary" />
                                <span>{event.location}</span>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-4">
                                <FaCalendarAlt className="mr-2 text-primary" />
                                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</span>
                            </div>
                            
                            <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                <FaRunning />
                                Register Now
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="text-center mt-12">
                <button className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors">
                    View All Events
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default UpcomingMarathons;