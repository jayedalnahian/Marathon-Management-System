import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaUserAlt, FaHeartbeat, FaRunning, FaArrowRight } from 'react-icons/fa';

const RunnerAchievements = () => {
  // Sample data - replace with your actual achievements
  const topFinishers = [
    {
      id: 1,
      name: "Sarah Johnson",
      time: "2:38:45",
      event: "Boston Marathon 2023",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      category: "Overall Winner"
    },
    {
      id: 2,
      name: "Michael Chen",
      time: "2:41:12",
      event: "New York Marathon 2023",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Men's Division"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      time: "2:43:28",
      event: "Chicago Marathon 2023",
      photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      category: "Women's Division"
    }
  ];

  const specialAchievements = [
    {
      id: 1,
      title: "50 Marathons in 50 States",
      runner: "David Wilson (Age 62)",
      story: "Completed his goal in 8 years after starting running at age 54",
      icon: <FaRunning className="text-3xl" />
    },
    {
      id: 2,
      title: "Fastest Comeback",
      runner: "Lisa Park",
      story: "Ran 3:05 marathon just 18 months after knee surgery",
      icon: <FaHeartbeat className="text-3xl" />
    },
    {
      id: 3,
      title: "Youngest Finisher",
      runner: "Jamal Carter (Age 18)",
      story: "Raised $5,000 for charity in his first marathon",
      icon: <FaUserAlt className="text-3xl" />
    }
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
          <h2 className="text-3xl font-bold text-[#2C3930] mb-2">Runner Achievements</h2>
          <p className="text-[#3F4F44] max-w-2xl mx-auto">
            Celebrating extraordinary accomplishments from our community
          </p>
        </motion.div>

        {/* Top Finishers Leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-[#2C3930] mb-6 flex items-center justify-center gap-2">
            <FaTrophy className="text-[#A27B5C]" /> Top Finishers
          </h3>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-12 bg-[#3F4F44] text-[#DCD7C9] p-4 font-medium">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Runner</div>
              <div className="col-span-3">Time</div>
              <div className="col-span-3">Event</div>
              <div className="col-span-1">Category</div>
            </div>
            
            {topFinishers.map((runner, index) => (
              <motion.div
                key={runner.id}
                whileHover={{ backgroundColor: '#F8F7F3' }}
                className="grid grid-cols-12 items-center p-4 border-b border-[#DCD7C9] last:border-0"
              >
                <div className="col-span-1 font-bold text-[#A27B5C]">
                  {index === 0 ? (
                    <span className="flex items-center justify-center w-8 h-8 bg-[#A27B5C] text-white rounded-full">1</span>
                  ) : index + 1}
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={runner.photo} alt={runner.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-medium">{runner.name}</span>
                </div>
                <div className="col-span-3 font-mono">{runner.time}</div>
                <div className="col-span-3 text-sm">{runner.event}</div>
                <div className="col-span-1 text-sm text-[#A27B5C]">{runner.category}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Inspirational Stories */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-[#2C3930] mb-6 flex items-center justify-center gap-2">
            <FaMedal className="text-[#A27B5C]" /> Inspirational Stories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#A27B5C]/30"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-[#A27B5C]/10 text-[#A27B5C] rounded-full mb-4 mx-auto">
                    {achievement.icon}
                  </div>
                  <h4 className="text-xl font-bold text-[#2C3930] text-center mb-2">{achievement.title}</h4>
                  <p className="font-medium text-[#A27B5C] text-center mb-3">{achievement.runner}</p>
                  <p className="text-[#3F4F44] text-center">{achievement.story}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-[#3F4F44] mb-4">Want to see your name here?</p>
          <button className="inline-flex items-center px-6 py-3 bg-[#A27B5C] hover:bg-[#8a6a4f] text-[#DCD7C9] rounded-lg font-medium transition-colors">
            Register for Next Race
            <FaArrowRight className="ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default RunnerAchievements;