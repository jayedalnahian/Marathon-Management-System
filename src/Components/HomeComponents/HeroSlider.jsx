import { Link } from "react-router";
import { FaRunning, FaArrowRight } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { motion } from "framer-motion";

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
    <section
      className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://i.ibb.co.com/gMyfQ6x4/Chat-GPT-Image-Aug-9-2025-04-41-07-PM.png')`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl px-6 text-center text-white"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6"
          variants={item}
        >
          Run Beyond Your Limits. <br />
          Join The Marathon Revolution
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl mb-8 text-white/90"
          variants={item}
        >
          Discover events. Challenge yourself. Be part of something
          unforgettable.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          variants={item}
        >
          {!user && (
            <>
              <Link
                to="/register"
                className="flex items-center gap-2 px-6 py-3 border bg-gray-400/30 text-white rounded-lg font-semibold shadow-lg hover:bg-gray-400/70 transition"
              >
                <FaRunning /> Register Now
                <FaArrowRight />
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 bg-green-100/50 text-gray-50 rounded-lg font-semibold shadow-lg hover:bg-green-200 hover:text-black transition"
              >
                Sign In
              </Link>
            </>
          )}
          <Link
            to="/marathons"
            className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white rounded-lg font-semibold hover:bg-white/20 transition"
          >
            <MdEventAvailable /> Explore Events
          </Link>
        </motion.div>

        {/* Search Bar */}
        {/* <motion.div className="flex justify-center" variants={item}>
          <input
            type="text"
            placeholder="Search Marathons..."
            className="w-full max-w-md px-4 py-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default HeroSlider;
