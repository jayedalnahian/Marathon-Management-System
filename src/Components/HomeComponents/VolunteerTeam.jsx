import React from "react";
import { motion } from "framer-motion";
import {
  FaHandsHelping,
  FaUserFriends,
  FaSmile,
  FaClipboardList,
  FaTshirt,
  FaUtensils,
  FaCertificate,
  FaTicketAlt,
} from "react-icons/fa";
import usePostVolantiars from "../../CustomHooks/usePostVolantiars";

const VolunteerTeam = () => {
  const { makeOffer } = usePostVolantiars();

  const handleVolunteer = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      role: e.target.role.value,
    };
    makeOffer(data);
    e.reset();
  };
  const volunteerRoles = [
    {
      icon: <FaClipboardList className="text-3xl text-[#A27B5C]" />,
      title: "Registration Desk",
      description: "Help check-in runners and distribute race packets",
      time: "Pre-race (4-6 hours)",
    },
    {
      icon: <FaUserFriends className="text-3xl text-[#A27B5C]" />,
      title: "Course Marshals",
      description: "Guide runners along the route and cheer them on",
      time: "Race day (5-7 hours)",
    },
    {
      icon: <FaHandsHelping className="text-3xl text-[#A27B5C]" />,
      title: "Hydration Stations",
      description: "Prepare and hand out water to runners",
      time: "Race day (4-6 hours)",
    },
    {
      icon: <FaSmile className="text-3xl text-[#A27B5C]" />,
      title: "Finish Line Crew",
      description: "Distribute medals and refreshments",
      time: "Race day (3-5 hours)",
    },
  ];

  

  return (
    <section className="bg-[#DCD7C9] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#2C3930] mb-2">
            Join Our Volunteer Team
          </h2>
          <p className="text-[#3F4F44] max-w-2xl mx-auto">
            Be the backbone of our events and help create unforgettable race
            experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Volunteer Roles */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-[#2C3930] mb-6">
              Available Roles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {volunteerRoles.map((role, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#A27B5C]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{role.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-[#2C3930] mb-2">
                        {role.title}
                      </h4>
                      <p className="text-[#3F4F44] mb-3">{role.description}</p>
                      <p className="text-sm text-[#A27B5C] font-medium">
                        {role.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Volunteer Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#3F4F44] rounded-xl shadow-lg p-8 text-[#DCD7C9]"
          >
            <h3 className="text-2xl font-semibold mb-6">
              Sign Up to Volunteer
            </h3>

            <form onSubmit={handleVolunteer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg bg-[#2C3930]/50 border border-[#A27B5C]/30 focus:outline-none focus:ring-2 focus:ring-[#A27B5C]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-[#2C3930]/50 border border-[#A27B5C]/30 focus:outline-none focus:ring-2 focus:ring-[#A27B5C]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Role
                </label>
                <select
                  name="role"
                  className="w-full px-4 py-3 rounded-lg bg-[#2C3930]/50 border border-[#A27B5C]/30 focus:outline-none focus:ring-2 focus:ring-[#A27B5C]"
                >
                  <option>Select a role</option>
                  {volunteerRoles.map((role, index) => (
                    <option key={index}>{role.title}</option>
                  ))}
                  <option>Any role needed</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#A27B5C] hover:bg-[#8a6a4f] text-white font-medium py-3 px-6 rounded-lg transition-colors mt-6"
              >
                Join the Team
              </button>
            </form>
          </motion.div>
        </div>


        
      </div>
    </section>
  );
};

export default VolunteerTeam;
