import React from "react";
import { Link, useParams } from "react-router";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRunning,
  FaUsers,
  FaPhone,
  FaUserShield,
} from "react-icons/fa";
import { motion } from "framer-motion";
import useGetMarathonDetails from "../../CustomHooks/useGetMarathonDetails";
import { format } from "date-fns";

const DetailsPage = () => {
  const { id } = useParams();
  const { data: marathon } = useGetMarathonDetails(id);

  if (!marathon) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A27B5C]"></div>
      </div>
    );
  }

  // Format dates
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Marathon Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-[#2C3930] mb-4">
          {marathon.title}
        </h1>

        <div className="flex flex-wrap gap-6 mb-6">
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

        <div className="bg-[#DCD7C9] rounded-xl overflow-hidden shadow-md">
          <img
            src={marathon.marathonImageURL}
            alt={marathon.title}
            className="w-full h-96 object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/800x400?text=Marathon+Image";
            }}
          />
        </div>
      </motion.div>

      {/* Registration Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[#3F4F44] text-[#DCD7C9] rounded-xl p-6 mb-12"
      >
        <h2 className="text-2xl font-bold mb-4">Registration Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FaCalendarAlt className="mr-2 text-[#A27B5C]" />
              Registration Period
            </h3>
            <p>
              {formatDate(marathon.startRegistrationDate)} -{" "}
              {formatDate(marathon.endRegistrationDate)}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FaUsers className="mr-2 text-[#A27B5C]" />
              Current Registrations
            </h3>
            <p>{marathon.totalRegistrationCount?.length || 0} participants</p>
          </div>
        </div>

        <div className="mt-6">
          <Link to={`/marathonRegister/${id}`}>
            <button className="bg-[#A27B5C] hover:bg-[#8a6a4f] text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Register Now
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-[#2C3930] mb-4">
          About The Event
        </h2>
        <div className="prose max-w-none text-[#3F4F44]">
          {marathon.description !== "No description" ? (
            <p>{marathon.description}</p>
          ) : (
            <p className="italic">No description available for this event.</p>
          )}
        </div>
      </motion.div>

      {/* Registered Participants */}
      {marathon.totalRegistrationCount?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[#2C3930] mb-4">
            Registered Participants
          </h2>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-12 bg-[#3F4F44] text-[#DCD7C9] p-4 font-medium">
              <div className="col-span-4 md:col-span-3">Name</div>
              <div className="col-span-4 md:col-span-3">Email</div>
              <div className="col-span-4 md:col-span-3">Phone</div>
              <div className="col-span-12 md:col-span-3">Emergency Contact</div>
            </div>

            {marathon.totalRegistrationCount.map((participant, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center p-4 border-b border-[#DCD7C9] last:border-0"
              >
                <div className="col-span-4 md:col-span-3 font-medium">
                  {participant.firstName} {participant.lastName}
                </div>
                <div className="col-span-4 md:col-span-3 text-sm truncate">
                  {participant.email}
                </div>
                <div className="col-span-4 md:col-span-3 text-sm">
                  {participant.phone}
                </div>
                <div className="col-span-12 md:col-span-3 text-sm mt-2 md:mt-0">
                  <div className="flex items-center">
                    <FaUserShield className="text-[#A27B5C] mr-2" />
                    {participant.emergencyContact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Event Created Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-sm text-[#3F4F44] italic"
      >
        <p>
          Event created by {marathon.createdBy} on{" "}
          {formatDate(marathon.createdAt)}
        </p>
      </motion.div>
    </div>
  );
};

export default DetailsPage;
