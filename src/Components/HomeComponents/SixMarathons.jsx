import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MarathonCard from './MarathonCard';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaRunning, FaExclamationTriangle } from 'react-icons/fa';

const SixMarathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarathons = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/marathons-6`);
                setMarathons(response.data);
            } catch (error) {
                console.error('Error fetching marathons:', error);
                showErrorAlert();
            } finally {
                setLoading(false);
            }
        };

        fetchMarathons();
    }, []);

    const showErrorAlert = () => {
        Swal.fire({
            title: "Connection Error",
            text: "We couldn't load the marathon data. Please try again later.",
            icon: "error",
            iconColor: '#F2EFE7',
            background: '#006A71',
            color: '#F2EFE7',
            confirmButtonColor: '#48A6A7',
            customClass: {
                popup: 'rounded-xl border-2 border-primary',
                title: 'text-2xl font-bold',
                confirmButton: 'px-6 py-2 rounded-lg'
            }
        });
    };

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
        <motion.div 
            className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                {/* Background with overlay */}
                <div className="absolute inset-0 bg-[url('https://i.ibb.co/S4PBtFcF/Bucharest-Marathon-scaled.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm" />
                
                {/* Content */}
                <div className="relative z-10 p-8 sm:p-12">
                    <motion.div 
                        className="text-center mb-12"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">
                            Featured Running Events
                        </h2>
                        <p className="text-lg text-secondary max-w-2xl mx-auto">
                            Discover the most exciting marathons happening worldwide
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                className="text-4xl text-background"
                            >
                                <FaRunning />
                            </motion.div>
                        </div>
                    ) : marathons.length > 0 ? (
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            {marathons.map((marathon) => (
                                <motion.div key={marathon._id} variants={item}>
                                    <MarathonCard marathon={marathon} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center bg-background/20 p-4 rounded-full mb-4">
                                <FaExclamationTriangle className="text-3xl text-secondary" />
                            </div>
                            <h3 className="text-xl font-medium text-background mb-2">
                                No Events Available
                            </h3>
                            <p className="text-secondary">
                                Check back later for upcoming marathons
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SixMarathons;