import React, { useContext, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaFlagCheckered, 
  FaMapMarkerAlt, 
  FaRegCalendarAlt, 
  FaUser,
  FaRunning
} from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';
import { AiFillLike } from "react-icons/ai";
import { VscGitStashApply } from "react-icons/vsc";
import { motion } from 'framer-motion';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { AuthContext } from '../../AuthProvider/AuthContext';

const DetailsPage = () => {
    const marathonData = useLoaderData();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        document.title = `${marathonData.title} | RUN`;
    }, [marathonData.title]);

    const {
        _id,
        title,
        startRegistrationDate,
        endRegistrationDate,
        marathonStartDate,
        location,
        runningDistance,
        marathonImageURL,
        description,
        totalRegistrationCount,
        createdBy
    } = marathonData;

    const isRegistered = totalRegistrationCount?.some(item => item.email === user?.email);
    const today = new Date();
    const startDate = new Date(startRegistrationDate);
    const endDate = new Date(endRegistrationDate);
    const isRegistrationOpen = today >= startDate && today <= endDate;

    // Format date to be more readable
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                ease: "easeOut",
                duration: 0.6
            }
        }
    };

    return (
        <motion.section 
            className="max-w-6xl mx-auto px-4 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="bg-white rounded-xl shadow-2xl overflow-hidden md:flex border border-gray-200"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/* Image Section */}
                <motion.div 
                    className="md:w-1/2 h-80 md:h-auto relative"
                    variants={item}
                >
                    <img
                        src={marathonImageURL}
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {isRegistrationOpen ? 'Registration Open' : 'Registration Closed'}
                    </div>
                </motion.div>

                {/* Content Section */}
                <motion.div 
                    className="md:w-1/2 p-8 space-y-6"
                    variants={item}
                >
                    <motion.div variants={item}>
                        <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
                        <p className="text-gray-600">{description}</p>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 gap-4 text-sm"
                        variants={container}
                    >
                        <motion.div className="flex items-center gap-3" variants={item}>
                            <FaMapMarkerAlt className="text-xl text-secondary" />
                            <span className="text-gray-700">{location}</span>
                        </motion.div>

                        <motion.div className="flex items-center gap-3" variants={item}>
                            <FaCalendarAlt className="text-xl text-secondary" />
                            <span className="text-gray-700">
                                Registration: {formatDate(startRegistrationDate)} → {formatDate(endRegistrationDate)}
                            </span>
                        </motion.div>

                        <motion.div className="flex items-center gap-3" variants={item}>
                            <FaRegCalendarAlt className="text-xl text-secondary" />
                            <span className="text-gray-700">Marathon Date: {formatDate(marathonStartDate)}</span>
                        </motion.div>

                        <motion.div className="flex items-center gap-3" variants={item}>
                            <FaFlagCheckered className="text-xl text-secondary" />
                            <span className="text-gray-700">Distance: {runningDistance}</span>
                        </motion.div>

                        <motion.div className="flex items-center gap-3" variants={item}>
                            <FaUser className="text-xl text-secondary" />
                            <span className="text-gray-700">Organizer: {createdBy}</span>
                        </motion.div>

                        <motion.div className="flex items-center gap-3" variants={item}>
                            <FaRunning className="text-xl text-secondary" />
                            <span className="text-gray-700">
                                Participants: {Array.isArray(totalRegistrationCount) ? totalRegistrationCount.length : totalRegistrationCount}
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Countdown Timer */}
                    <motion.div 
                        className="mt-6 text-center"
                        variants={item}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-primary">
                            Marathon starts in
                        </h3>
                        <div className="flex justify-center">
                            <CountdownCircleTimer
                                isPlaying
                                size={140}
                                strokeWidth={10}
                                duration={Math.max(0, Math.floor((new Date(marathonStartDate).getTime() - Date.now()) / 1000))}
                                colors={["#48A6A7", "#3D8E8F", "#006A71", "#00474B"]}
                                colorsTime={[60 * 60 * 24 * 7, 60 * 60 * 24, 60 * 60, 0]}
                                onComplete={() => ({ shouldRepeat: false })}
                            >
                                {({ remainingTime }) => {
                                    if (remainingTime <= 0) return (
                                        <div className="text-red-500 font-medium">Event Started</div>
                                    );

                                    const days = Math.floor(remainingTime / (60 * 60 * 24));
                                    const hours = Math.floor((remainingTime % (60 * 60 * 24)) / 3600);
                                    const minutes = Math.floor((remainingTime % 3600) / 60);
                                    const seconds = remainingTime % 60;

                                    return (
                                        <div className="space-y-1">
                                            <div className="font-bold text-2xl text-primary">
                                                {days}d {hours}h
                                            </div>
                                            <div className='text-gray-600'>
                                                {minutes}m {seconds}s
                                            </div>
                                        </div>
                                    );
                                }}
                            </CountdownCircleTimer>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4 mt-8"
                        variants={item}
                    >
                        <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link 
                                to={`/marathonRegister/${_id}`} 
                                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                                    isRegistered 
                                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        : !isRegistrationOpen
                                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        : 'bg-primary hover:bg-primary-dark text-white'
                                }`}
                                disabled={isRegistered || !isRegistrationOpen}
                            >
                                <VscGitStashApply className="text-xl" />
                                {isRegistered ? 'Already Registered' : 'Register Now'}
                            </Link>
                        </motion.div>

                        <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border-2 border-primary text-primary hover:bg-primary/10 transition-colors">
                                <AiFillLike className="text-xl" />
                                Like Event
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default DetailsPage;