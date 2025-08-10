import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaRunning, FaArrowRight } from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';

const HeroSlider = ({ user }) => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: "easeOut", duration: 0.8 },
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] bg-[#3F4F44] overflow-hidden flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI0RDRDdDOSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Runner image background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/gMyfQ6x4/Chat-GPT-Image-Aug-9-2025-04-41-07-PM.png')`,
        }}
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C3930]/90 via-[#2C3930]/50 to-transparent"></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:px-8 w-full">
        <motion.div
          className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {/* Text content */}
          <div className="text-center lg:text-left">
            <motion.div className="flex items-center gap-2 mb-4 justify-center lg:justify-start" variants={item}>
              <div className="w-8 h-0.5 bg-[#A27B5C]"></div>
              <span className="text-sm font-medium text-[#DCD7C9] uppercase tracking-wider">
                Join the movement
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#DCD7C9] mb-6 leading-tight"
              variants={item}
            >
              Run Beyond Your <span className="text-[#A27B5C]">Limits</span>
            </motion.h1>

            <motion.p 
              className="text-lg text-[#DCD7C9]/90 mb-8 max-w-lg mx-auto lg:mx-0"
              variants={item}
            >
              Discover world-class marathon events, challenge yourself, and be part of something unforgettable.
            </motion.p>

            {/* Buttons */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
              variants={item}
            >
              {!user && (
                <>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-6 py-3 bg-[#A27B5C] hover:bg-[#8a6a4f] text-[#DCD7C9] rounded-lg font-medium transition-colors"
                  >
                    <FaRunning /> Register Now
                    <FaArrowRight />
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-3 border-2 border-[#A27B5C] text-[#DCD7C9] hover:bg-[#A27B5C]/10 rounded-lg font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
              <Link
                to="/marathons"
                className="flex items-center gap-2 px-6 py-3 border-2 border-[#DCD7C9] text-[#DCD7C9] hover:bg-[#DCD7C9]/10 rounded-lg font-medium transition-colors"
              >
                <MdEventAvailable /> Explore Events
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
              variants={item}
            >
              <div>
                <p className="text-2xl font-bold text-[#A27B5C]">100+</p>
                <p className="text-[#DCD7C9]/80">Events Worldwide</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#A27B5C]">50K+</p>
                <p className="text-[#DCD7C9]/80">Active Runners</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#A27B5C]">10+</p>
                <p className="text-[#DCD7C9]/80">Years Experience</p>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className="relative flex justify-center"
            variants={item}
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-4 border-[#A27B5C] shadow-xl">
              <img 
                src="https://i.ibb.co.com/gMyfQ6x4/Chat-GPT-Image-Aug-9-2025-04-41-07-PM.png" 
                alt="Marathon runner" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3930]/70 via-[#2C3930]/20 to-transparent"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-[#A27B5C]/20 blur-xl z-0"></div>
            <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-[#DCD7C9]/10 blur-xl z-0"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSlider;