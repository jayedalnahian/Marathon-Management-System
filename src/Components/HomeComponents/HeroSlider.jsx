import { Link } from "react-router";
import { FaRunning, FaArrowRight } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { motion } from "framer-motion";

const HeroSlider = ({ user }) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.8
      }
    }
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background image with parallax effect */}
        <motion.div
          className="absolute inset-0 bg-[url('https://i.ibb.co/LhHX9Tks/marathon-image-1.webp')] bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "linear" }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/80" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 md:px-16 max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-background mb-6"
          variants={item}
        >
          Run Beyond Limits. <br /> Join the{" "}
          <span className="text-accent">Marathon Revolution</span>.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-medium text-background/90 mb-10"
          variants={item}
        >
          Discover events. Challenge yourself. Be part of something unforgettable.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={item}
        >
          {!user ? (
            <>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-8 py-4 bg-accent text-background rounded-lg font-bold text-lg shadow-lg hover:bg-accent/90 transition-colors"
                >
                  <FaRunning className="text-xl" /> 
                  Register Now
                  <FaArrowRight className="ml-1" />
                </Link>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-8 py-4 bg-secondary text-primary rounded-lg font-bold text-lg shadow-lg hover:bg-secondary/90 transition-colors border-2 border-primary"
                >
                  Sign In
                </Link>
              </motion.div>
            </>
          ) : null}

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/marathons"
              className="flex items-center gap-2 px-8 py-4 bg-transparent text-background rounded-lg font-bold text-lg shadow-lg hover:bg-background/20 transition-colors border-2 border-background"
            >
              <MdEventAvailable className="text-2xl" /> 
              Explore Events
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scrolling indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-6 border-b-2 border-r-2 border-background rotate-45" />
      </motion.div>
    </section>
  );
};

export default HeroSlider;