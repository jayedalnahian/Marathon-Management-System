import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { useRef } from 'react';

const SponsorShowcase = () => {
  const scrollRef = useRef(null);

  // Sample sponsor data - replace with your actual sponsors
  const sponsors = [
    {
      id: 1,
      name: "RunFast Athletics",
      logo: "https://via.placeholder.com/150x80?text=RunFast",
      contribution: "Official Gear Partner",
      url: "#"
    },
    {
      id: 2,
      name: "HydraMax",
      logo: "https://via.placeholder.com/150x80?text=HydraMax",
      contribution: "Hydration Sponsor",
      url: "#"
    },
    {
      id: 3,
      name: "City Bank",
      logo: "https://via.placeholder.com/150x80?text=City+Bank",
      contribution: "Financial Partner",
      url: "#"
    },
    {
      id: 4,
      name: "HealthyLife",
      logo: "https://via.placeholder.com/150x80?text=HealthyLife",
      contribution: "Nutrition Sponsor",
      url: "#"
    },
    {
      id: 5,
      name: "SportsMed",
      logo: "https://via.placeholder.com/150x80?text=SportsMed",
      contribution: "Medical Partner",
      url: "#"
    },
    {
      id: 6,
      name: "EcoRun",
      logo: "https://via.placeholder.com/150x80?text=EcoRun",
      contribution: "Sustainability Partner",
      url: "#"
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#3F4F44] py-16 text-[#DCD7C9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center bg-[#A27B5C]/10 p-3 rounded-full mb-4">
            <FaHandshake className="text-2xl text-[#A27B5C]" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Our Valued Partners</h2>
          <p className="max-w-2xl mx-auto">
            These organizations make our events possible through their generous support
          </p>
        </motion.div>

        {/* Sponsor Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#2C3930] text-[#DCD7C9] hover:text-[#A27B5C] rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#2C3930] text-[#DCD7C9] hover:text-[#A27B5C] rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
          >
            <FaChevronRight />
          </button>

          {/* Carousel Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-8 py-4 px-2"
          >
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor.id}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center bg-[#2C3930]/50 rounded-xl p-6 min-w-[250px] flex-shrink-0"
              >
                <div className="bg-white p-4 rounded-lg mb-4 h-24 flex items-center justify-center">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    className="max-h-16 max-w-[150px] object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </div>
                <h3 className="text-lg font-medium text-center mb-1">{sponsor.name}</h3>
                <p className="text-sm text-[#A27B5C] text-center mb-3">{sponsor.contribution}</p>
                <a 
                  href={sponsor.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[#DCD7C9] hover:text-[#A27B5C] transition-colors flex items-center"
                >
                  Visit Website <FaArrowRight className="ml-1 text-xs" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="mb-4">Interested in becoming a sponsor?</p>
          <button className="inline-flex items-center px-6 py-3 border-2 border-[#A27B5C] text-[#A27B5C] hover:bg-[#A27B5C]/10 rounded-lg font-medium transition-colors">
            Partnership Opportunities
            <FaArrowRight className="ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorShowcase;