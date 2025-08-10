import React from "react";
import {
  FaRunning,
  FaUsers,
  FaCalendarAlt,
  FaTrophy,
  FaHandsHelping,
} from "react-icons/fa";
import { motion } from "framer-motion";
const teamMembers = [
  {
    name: "Jayed Al Nahian",
    role: "Founder & Creator",
    bio: "jnahian752@gmail.com",
    photo:
      "https://i.ibb.co.com/xqGjVC3W/Professional-Linked-In-Profile-Picture.png",
  },
];
const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-[#2C3930] mb-4">
          About Marathon Hub
        </h1>
        <p className="text-xl text-[#3F4F44] max-w-3xl mx-auto">
          Connecting runners with world-class marathon events through innovative
          technology
        </p>
      </motion.div>

      {/* Our Mission */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-[#DCD7C9] rounded-xl p-8 mb-16"
      >
        <h2 className="text-3xl font-bold text-[#2C3930] mb-6 text-center">
          Our Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[#3F4F44] mb-6">
              Marathon Hub was founded in 2023 with a simple goal: to
              revolutionize how marathon events are organized and experienced.
              We saw a need for a centralized platform that benefits both race
              organizers and participants.
            </p>
            <p className="text-[#3F4F44]">
              Our system streamlines event management, registration, and
              communication - making marathon participation accessible to
              everyone while giving organizers powerful tools to create
              unforgettable events.
            </p>
          </div>
          <div className="bg-[#3F4F44] rounded-lg p-6 text-[#DCD7C9]">
            <h3 className="text-xl font-semibold mb-4">
              Why Choose Marathon Hub?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaRunning className="text-[#A27B5C] mt-1" />
                <span>Simplified registration process for participants</span>
              </li>
              <li className="flex items-start gap-3">
                <FaUsers className="text-[#A27B5C] mt-1" />
                <span>Comprehensive management tools for organizers</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCalendarAlt className="text-[#A27B5C] mt-1" />
                <span>Real-time updates and notifications</span>
              </li>
              <li className="flex items-start gap-3">
                <FaTrophy className="text-[#A27B5C] mt-1" />
                <span>Community features to connect runners</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-[#2C3930] mb-8 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaRunning className="text-4xl text-[#A27B5C] mb-4" />,
              title: "Event Creation",
              description:
                "Organizers can easily create and manage marathon events with customizable details",
            },
            {
              icon: <FaUsers className="text-4xl text-[#A27B5C] mb-4" />,
              title: "Participant Management",
              description:
                "Track registrations, communicate with participants, and manage event logistics",
            },
            {
              icon: <FaCalendarAlt className="text-4xl text-[#A27B5C] mb-4" />,
              title: "Registration System",
              description:
                "User-friendly interface for runners to find and register for events",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center border border-[#DCD7C9]"
            >
              {feature.icon}
              <h3 className="text-xl font-bold text-[#2C3930] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#3F4F44]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-[#2C3930] mb-8 text-center">
          Meet The Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden text-center"
            >
              <div className="h-48 bg-[#3F4F44] flex items-center justify-center">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-[#2C3930]">
                  {member.name}
                </h3>
                <p className="text-[#A27B5C] mb-2">{member.role}</p>
                <p className="text-sm text-[#3F4F44]">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-[#3F4F44] rounded-xl p-8 text-[#DCD7C9] text-center"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Join the Marathon Community?
        </h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Whether you're an organizer or a runner, we have the tools you need
          for an exceptional marathon experience.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/register"
            className="bg-[#A27B5C] hover:bg-[#8a6a4f] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Sign Up Now
          </a>
          <a
            href="/marathons"
            className="border-2 border-[#A27B5C] text-[#A27B5C] hover:bg-[#A27B5C]/10 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Marathons
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
