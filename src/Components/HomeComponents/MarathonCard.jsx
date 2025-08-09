import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const MarathonCard = ({ marathon }) => {
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <motion.div 
      className="rounded-xl overflow-hidden bg-[#F2EFE7] shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image with gradient overlay */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={marathon.marathonImageURL} 
          alt={marathon.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Event status badge */}
        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
          {new Date(marathon.endRegistrationDate) > new Date() ? 'Open' : 'Closed'}
        </div>
      </div>

      {/* Card content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">{marathon.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="mr-2 text-secondary" />
          <span>{marathon.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <FaCalendarAlt className="mr-2 text-secondary" />
          <span>
            {formatDate(marathon.startRegistrationDate)} - {formatDate(marathon.endRegistrationDate)}
          </span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm font-medium text-gray-500">
            {marathon.participants?.length || 0} participants
          </span>
          
          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/details/${marathon._id}`}
              className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors"
            >
              View details
              <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarathonCard;