import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { FaRunning, FaSearch } from 'react-icons/fa';
import MarathonCard from '../../Components/HomeComponents/MarathonCard';
import Loading from '../../Components/LoadingComponents/Loading';

const Marathons = () => {
    const [marathons, setMarathons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMarathons, setFilteredMarathons] = useState([]);

    useEffect(() => {
        document.title = 'RUN | Marathons';
    }, []);

    useEffect(() => {
        const fetchMarathons = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3000/marathons');
                setMarathons(response.data);
                setFilteredMarathons(response.data);
            } catch (err) {
                console.error("Failed to fetch marathons:", err);
                showErrorAlert("Failed to load marathons. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMarathons();
    }, []);

    useEffect(() => {
        const results = marathons.filter(marathon =>
            marathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            marathon.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMarathons(results);
    }, [searchTerm, marathons]);

    const showErrorAlert = (message) => {
        Swal.fire({
            title: "Error!",
            text: message,
            icon: "error",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            background: "#F2EFE7",
            color: "#006A71",
            customClass: {
                popup: 'rounded-xl border-2 border-primary shadow-xl',
                title: 'text-2xl font-bold text-primary',
            },
        });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl shadow-xl mb-12"
            >
                <div className="absolute inset-0 bg-[url('https://i.ibb.co/S4PBtFcF/Bucharest-Marathon-scaled.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm" />
                
                <div className="relative z-10 py-16 px-6 sm:py-24 sm:px-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-background mb-4">
                        Discover Marathons
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl mx-auto mb-8">
                        Find your next running challenge from our curated collection of events
                    </p>
                    
                    {/* Search Bar */}
                    <motion.div 
                        className="max-w-md mx-auto relative"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or location..."
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* Marathons Grid */}
            <div className="max-w-7xl mx-auto">
                {filteredMarathons.length > 0 ? (
                    <>
                        <motion.h2 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-bold text-primary mb-8 text-center"
                        >
                            Upcoming Events
                        </motion.h2>
                        
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                        >
                            {filteredMarathons.map((marathon) => (
                                <motion.div
                                    key={marathon._id}
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: { y: 0, opacity: 1 },
                                    }}
                                >
                                    <MarathonCard marathon={marathon} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                ) : (
                    <motion.div 
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full mb-4">
                            <FaRunning className="text-3xl text-primary" />
                        </div>
                        <h3 className="text-2xl font-medium text-gray-700 mb-2">
                            No marathons found
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm ? 'Try a different search term' : 'Check back later for upcoming events'}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Marathons;