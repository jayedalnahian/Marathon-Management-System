import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthContext";
import useGetApplyedMarathons from "../../../CustomHooks/useGetApplyedMarathons";
import { FaCalendarAlt, FaMapMarkerAlt, FaRunning, FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { format } from 'date-fns';

const AppliedMarathons = () => {
  const { user } = useContext(AuthContext);
  const { data: marathons, isLoading } = useGetApplyedMarathons(user?.uid);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A27B5C]"></div>
      </div>
    );
  }

  if (!marathons || marathons.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-[#DCD7C9] rounded-xl p-8 max-w-2xl mx-auto">
          <FaUserAlt className="text-5xl text-[#A27B5C] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2C3930] mb-2">No Marathons Found</h2>
          <p className="text-[#3F4F44] mb-6">You haven't registered for any marathons yet.</p>
          <a 
            href="/marathons" 
            className="inline-block bg-[#A27B5C] hover:bg-[#8a6a4f] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Marathons
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#2C3930] mb-8"
      >
        Your Registered Marathons
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marathons.map((marathon, index) => (
          <motion.div
            key={marathon._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-[#DCD7C9]"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={marathon.marathonImageURL} 
                alt={marathon.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Marathon+Image';
                }}
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-[#2C3930] mb-2">{marathon.title}</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-[#3F4F44]">
                  <FaCalendarAlt className="mr-2 text-[#A27B5C]" />
                  <span>{formatDate(marathon.marathonStartDate)}</span>
                </div>
                <div className="flex items-center text-[#3F4F44]">
                  <FaMapMarkerAlt className="mr-2 text-[#A27B5C]" />
                  <span>{marathon.location}</span>
                </div>
                <div className="flex items-center text-[#3F4F44]">
                  <FaRunning className="mr-2 text-[#A27B5C]" />
                  <span>{marathon.runningDistance}</span>
                </div>
              </div>

              <div className="bg-[#F8F7F3] rounded-lg p-4 mb-4">
                <h3 className="font-medium text-[#2C3930] mb-2">Your Registration Details</h3>
                {marathon.totalRegistrationCount
                  .filter(reg => reg.userId === user?.uid)
                  .map((registration, i) => (
                    <div key={i} className="text-sm text-[#3F4F44]">
                      <p>Name: {registration.firstName} {registration.lastName}</p>
                      <p>Phone: {registration.phone}</p>
                      <p>Emergency: {registration.emergencyContact}</p>
                    </div>
                  ))
                }
              </div>

              <a 
                href={`/marathons/${marathon._id}`} 
                className="inline-block w-full text-center bg-[#A27B5C] hover:bg-[#8a6a4f] text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                View Event Details
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppliedMarathons;