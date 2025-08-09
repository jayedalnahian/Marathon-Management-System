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
      className="rounded-xl overflow-hidden h-full bg-[#3F4F44] shadow-xl hover:shadow-xl transition-shadow border border-[#A27B5C]/30"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C3930]/70 to-transparent" />
        
        {/* Event status badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
          isRegistrationOpen 
            ? 'bg-[#A27B5C] text-[#DCD7C9]' 
            : 'bg-[#2C3930] text-[#DCD7C9]/70'
        }`}>
          {isRegistrationOpen ? 'Registration Open' : 'Registration Closed'}
        </div>
      </div>

      {/* Card content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#DCD7C9] mb-2">{marathon.title}</h3>
        
        <div className="flex items-center text-[#DCD7C9]/80 mb-3">
          <FaMapMarkerAlt className="mr-2 text-[#A27B5C]" />
          <span>{marathon.location}</span>
        </div>
        
        <div className="flex items-center text-[#DCD7C9]/80 mb-4">
          <FaCalendarAlt className="mr-2 text-[#A27B5C]" />
          <span>
            {formatDate(marathon.startRegistrationDate)} - {formatDate(marathon.endRegistrationDate)}
          </span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <span className="text-sm font-medium text-[#DCD7C9]/80">
            {marathon.participants?.length || 0} participants
          </span>
          
          <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/marathons/${marathon._id}`}
              className="inline-flex items-center gap-1 text-[#A27B5C] hover:text-[#DCD7C9] font-medium transition-colors"
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