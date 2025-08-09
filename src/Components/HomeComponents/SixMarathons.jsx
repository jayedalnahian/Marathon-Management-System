import React from 'react';
import { motion } from 'framer-motion';
import { FaRunning, FaExclamationTriangle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import MarathonCard from './MarathonCard';
import useSixMarathons from '../../CustomHooks/useSixMarathons';

// Skeleton Loading Component
const MarathonCardSkeleton = () => {
  return (
    <motion.div 
      className="bg-[#3F4F44]/20 rounded-xl overflow-hidden shadow-lg"
      variants={item}
    >
      <div className="animate-pulse">
        <div className="h-40 bg-[#2C3930]/30 rounded-t-xl"></div>
        <div className="p-4 space-y-3">
          <div className="h-6 bg-[#2C3930]/30 rounded w-3/4"></div>
          <div className="h-4 bg-[#2C3930]/30 rounded w-1/2"></div>
          <div className="h-4 bg-[#2C3930]/30 rounded w-full"></div>
          <div className="h-4 bg-[#2C3930]/30 rounded w-2/3"></div>
          <div className="pt-4">
            <div className="h-8 bg-[#A27B5C]/30 rounded-lg w-full"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.6,
    },
  },
};

const SixMarathons = () => {
  const { marathons, isLoading, error } = useSixMarathons();

  React.useEffect(() => {
    if (error) {
      Swal.fire({
        title: 'Connection Error',
        text: "We couldn't load the marathon data. Please try again later.",
        icon: 'error',
        iconColor: '#DCD7C9',
        background: '#2C3930',
        color: '#DCD7C9',
        confirmButtonColor: '#A27B5C',
        customClass: {
          popup: 'rounded-xl border-2 border-[#A27B5C]',
          title: 'text-2xl font-bold',
          confirmButton: 'px-6 py-2 rounded-lg',
        },
      });
    }
  }, [error]);

  return (
    <motion.div
      className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#3F4F44]">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C3930]/30 to-[#3F4F44]/50" aria-hidden="true" />
        
        {/* Content */}
        <div className="relative z-10 p-8 sm:p-12">
          <motion.div
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#DCD7C9] mb-4">
              Featured Running Events
            </h2>
            <p className="text-lg text-[#DCD7C9]/80 max-w-2xl mx-auto">
              Discover the most exciting marathons happening worldwide
            </p>
          </motion.div>

          {isLoading ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {[...Array(6)].map((_, index) => (
                <MarathonCardSkeleton key={index} />
              ))}
            </motion.div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center bg-[#2C3930]/20 p-4 rounded-full mb-4">
                <FaExclamationTriangle className="text-3xl text-[#DCD7C9]" />
              </div>
              <h3 className="text-xl font-medium text-[#DCD7C9] mb-2">Connection Error</h3>
              <p className="text-[#DCD7C9]/80">Failed to load marathon data</p>
            </div>
          ) : marathons && marathons.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-3 lg:gap-4"
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
              <div className="inline-flex items-center justify-center bg-[#2C3930]/20 p-4 rounded-full mb-4">
                <FaExclamationTriangle className="text-3xl text-[#DCD7C9]" />
              </div>
              <h3 className="text-xl font-medium text-[#DCD7C9] mb-2">No Events Available</h3>
              <p className="text-[#DCD7C9]/80">Check back later for upcoming marathons</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SixMarathons;