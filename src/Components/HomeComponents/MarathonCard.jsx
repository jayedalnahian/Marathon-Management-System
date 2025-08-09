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

  // Check if registration is open
  const isRegistrationOpen = new Date(marathon.endRegistrationDate) > new Date();

  return (
    <motion.div 
      className="rounded-xl overflow-hidden h-full bg-[#48A6A7] shadow-lg hover:shadow-xl transition-shadow border border-[#FFFFFF80]"
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
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Marathon+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t to-transparent" />
        
        {/* Event status badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
          isRegistrationOpen 
            ? 'bg-[#48A6A7] text-[#F2EFE7]' 
            : 'bg-[#FFFFFF20] text-[#F2EFE7]'
        }`}>
          {isRegistrationOpen ? 'Registration Open' : 'Registration Closed'}
        </div>
      </div>

      {/* Card content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#F2EFE7] mb-2">{marathon.title}</h3>
        
        <div className="flex items-center text-[#9ACBD0] mb-3">
          <FaMapMarkerAlt className="mr-2 text-[#48A6A7]" />
          <span>{marathon.location}</span>
        </div>
        
        <div className="flex items-center text-[#9ACBD0] mb-4">
          <FaCalendarAlt className="mr-2 text-[#48A6A7]" />
          <span>
            {formatDate(marathon.startRegistrationDate)} - {formatDate(marathon.endRegistrationDate)}
          </span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm font-medium text-[#9ACBD0]">
            {marathon.participants?.length || 0} participants
          </span>
          
          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/details/${marathon._id}`}
              className="inline-flex items-center gap-1 text-[#48A6A7] hover:text-[#9ACBD0] font-medium transition-colors"
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