import React from "react";
import { motion } from "framer-motion";
import {
  FaShoePrints,
  FaStopwatch,
  FaWater,
  FaHeartbeat,
  FaFireAlt,
  FaStopwatch20,
  FaArrowRight,
} from "react-icons/fa";

const TrainingTips = () => {
  const tips = [
    {
      icon: <FaShoePrints className="text-[#A27B5C] text-2xl" />,
      category: "Running Form",
      title: "Master Your Stride",
      content:
        "Keep your posture upright and land mid-foot to reduce impact. Aim for 170-180 steps per minute for optimal efficiency.",
      link: "/tips/running-form",
    },
    {
      icon: <FaStopwatch20 className="text-[#A27B5C] text-2xl" />,
      category: "Pacing",
      title: "First 5K Strategy",
      content:
        "Start 10-15 seconds slower than target pace. Negative splits (faster second half) yield better results than going out too fast.",
      link: "/tips/5k-strategy",
    },
    {
      icon: <FaWater className="text-[#A27B5C] text-2xl" />,
      category: "Hydration",
      title: "Race Day Fluids",
      content:
        "Drink 500ml water 2 hours before running. During race, take small sips every 15-20 minutes to avoid dehydration.",
      link: "/tips/hydration",
    },
    {
      icon: <FaHeartbeat className="text-[#A27B5C] text-2xl" />,
      category: "Recovery",
      title: "Post-Run Routine",
      content:
        "Dynamic stretches immediately after, followed by protein within 30 minutes. Take at least 1 rest day per week for muscle repair.",
      link: "/tips/recovery",
    },
  ];

  const trainingPlans = [
    {
      level: "Beginner",
      duration: "8 weeks",
      distance: "5K",
      description: "Start running consistently with walk-run intervals",
      link: "/plans/beginner-5k",
    },
    {
      level: "Intermediate",
      duration: "12 weeks",
      distance: "Half Marathon",
      description: "Build endurance with tempo runs and long distances",
      link: "/plans/intermediate-hm",
    },
    {
      level: "Advanced",
      duration: "16 weeks",
      distance: "Marathon",
      description: "Peak performance training with speed work",
      link: "/plans/advanced-marathon",
    },
  ];

  return (
    <section className="bg-[#DCD7C9] py-16">
      <div className="max-w-7xl mx-auto px-2">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#2C3930] mb-2">
            Training Tips & Guides
          </h2>
          <p className="text-[#3F4F44] max-w-2xl mx-auto">
            Expert advice to help you run smarter, train better, and recover
            faster
          </p>
        </motion.div>

        {/* Tips Carousel */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="col-span-1">
              {/* Additional Resources */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <h3 className="text-2xl font-bold text-[#2C3930] mb-4">
                  More Resources
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="/blog"
                    className="px-6 py-3 border-2 border-[#A27B5C] text-[#A27B5C] hover:bg-[#A27B5C]/10 rounded-lg font-medium transition-colors"
                  >
                    Running Blog
                  </a>
                  <a
                    href="/videos"
                    className="px-6 py-3 border-2 border-[#A27B5C] text-[#A27B5C] hover:bg-[#A27B5C]/10 rounded-lg font-medium transition-colors"
                  >
                    Training Videos
                  </a>
                  <a
                    href="/nutrition"
                    className="px-6 py-3 border-2 border-[#A27B5C] text-[#A27B5C] hover:bg-[#A27B5C]/10 rounded-lg font-medium transition-colors"
                  >
                    Nutrition Guides
                  </a>
                </div>
              </motion.div>
            </div>
            <div className=" col-span-3 grid grid-cols-1 gap-4 md:grid-cols-2 overflow-x-auto pb-4 scrollbar-hide">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col min-w-[250px]"
                >
                  <div className="mb-4">
                    {tip.icon}
                    <span className="ml-2 text-sm font-medium text-[#A27B5C]">
                      {tip.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2C3930] mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-[#3F4F44] mb-4 flex-grow">{tip.content}</p>
                  <a
                    href={tip.link}
                    className="text-[#A27B5C] font-medium hover:text-[#8a6a4f] transition-colors flex items-center"
                  >
                    Learn more <FaArrowRight className="ml-1 text-sm" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Training Plans */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[#2C3930] mb-6 text-center">
            Weekly Training Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {trainingPlans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-[#3F4F44] rounded-xl overflow-hidden shadow-lg text-[#DCD7C9]"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold">{plan.level}</h4>
                    <span className="bg-[#A27B5C] text-white text-xs px-3 py-1 rounded-full">
                      {plan.duration}
                    </span>
                  </div>
                  <p className="text-lg font-semibold mb-2">
                    {plan.distance} Plan
                  </p>
                  <p className="mb-6">{plan.description}</p>
                  <a
                    href={plan.link}
                    className="inline-flex items-center justify-center w-full bg-[#A27B5C] hover:bg-[#8a6a4f] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    View Plan
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingTips;
