import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaExpand, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

const MediaGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample media data - replace with your actual content
  const galleryMedia = [
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      caption: 'Runners at the starting line of Boston Marathon 2023'
    },
    {
      type: 'video',
      url: 'https://example.com/videos/marathon-highlight.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      caption: 'Finish line celebrations'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      caption: 'Crowd cheering runners along the course'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      caption: 'Personal victory at the finish line'
    },
    {
      type: 'video',
      url: 'https://example.com/videos/runner-interview.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      caption: 'Interview with first-time marathoner'
    },
    {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1828&q=80',
      caption: 'Beautiful course scenery'
    }
  ];

  const openMedia = (media, index) => {
    setSelectedMedia(media);
    setCurrentIndex(index);
  };

  const closeMedia = () => {
    setSelectedMedia(null);
  };

  const navigateMedia = (direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? galleryMedia.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === galleryMedia.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedMedia(galleryMedia[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <section className="bg-[#2C3930] mx-auto rounded-2xl max-w-7xl py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#DCD7C9] mb-2">Race Day Moments</h2>
          <p className="text-[#DCD7C9]/80 max-w-2xl mx-auto">
            Relive the excitement from our past events
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryMedia.map((media, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg"
              onClick={() => openMedia(media, index)}
            >
              {/* Media Thumbnail */}
              <div className="aspect-[4/3] bg-[#3F4F44]">
                <img
                  src={media.type === 'video' ? media.thumbnail : media.url}
                  alt={media.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3930]/90 via-[#2C3930]/30 to-transparent flex items-end p-4">
                <div>
                  {media.type === 'video' && (
                    <div className="absolute top-4 right-4 bg-[#A27B5C] rounded-full w-10 h-10 flex items-center justify-center">
                      <FaPlay className="text-white" />
                    </div>
                  )}
                  <p className="text-[#DCD7C9] font-medium">{media.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button className="inline-flex items-center px-6 py-3 border-2 border-[#A27B5C] text-[#A27B5C] hover:bg-[#A27B5C]/10 rounded-lg font-medium transition-colors">
            View Full Gallery
            <FaArrowRight className="ml-2" />
          </button>
        </motion.div>

        {/* Lightbox Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-[#2C3930]/95 z-50 flex items-center justify-center p-4">
            <button 
              onClick={closeMedia}
              className="absolute top-6 right-6 text-[#DCD7C9] hover:text-[#A27B5C] transition-colors"
            >
              <FiX className="text-3xl" />
            </button>

            <div className="relative max-w-6xl w-full">
              {/* Navigation Arrows */}
              <button 
                onClick={() => navigateMedia('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#3F4F44]/80 text-[#DCD7C9] hover:text-[#A27B5C] rounded-full w-10 h-10 flex items-center justify-center z-10"
              >
                <FaChevronLeft />
              </button>

              <button 
                onClick={() => navigateMedia('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#3F4F44]/80 text-[#DCD7C9] hover:text-[#A27B5C] rounded-full w-10 h-10 flex items-center justify-center z-10"
              >
                <FaChevronRight />
              </button>

              {/* Media Content */}
              <div className="bg-[#3F4F44] rounded-xl overflow-hidden">
                {selectedMedia.type === 'image' ? (
                  <img 
                    src={selectedMedia.url} 
                    alt={selectedMedia.caption}
                    className="w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  <div className="aspect-video w-full">
                    <video 
                      src={selectedMedia.url} 
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4 text-[#DCD7C9]">
                  <p className="text-center">{selectedMedia.caption}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaGallery;