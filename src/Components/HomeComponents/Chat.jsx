import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaRegComments } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  const [opinions, setOpinions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/opinion`);
        setOpinions(response.data);
      } catch (error) {
        console.error("Error fetching opinions:", error);
        showErrorAlert("Failed to load comments. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpinions();
  }, []);

  const showErrorAlert = (message) => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      background: "#DCD7C9",
      color: "#2C3930",
      customClass: {
        popup: "rounded-xl border-2 border-[#A27B5C] shadow-xl",
        title: "text-2xl font-bold text-[#2C3930]",
      },
    });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "Your feedback has been submitted",
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      background: "#DCD7C9",
      color: "#2C3930",
      customClass: {
        popup: "rounded-xl border-2 border-[#A27B5C] shadow-xl",
        title: "text-2xl font-bold text-[#2C3930]",
      },
    });
  };

  const handleChat = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const opinion = form.opinion.value;

    if (!name || !email || !opinion) {
      showErrorAlert("Please fill in all fields");
      return;
    }

    const opinionData = { name, opinion, email };

    try {
      setIsSubmitting(true);
      const response = await axios.post(`http://localhost:3000/opinion`, opinionData);
      
      if (response?.data?.insertedId) {
        setOpinions((prev) => [...prev, opinionData]);
        showSuccessAlert();
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting opinion:", error);
      showErrorAlert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center bg-[#A27B5C]/10 p-3 rounded-full mb-4">
          <FaRegComments className="text-2xl text-[#A27B5C]" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C3930] mb-4">
          Community Feedback
        </h2>
        <p className="text-lg text-[#3F4F44]">
          Share your thoughts and read what others are saying
        </p>
      </motion.div>

      {/* Feedback Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-[#DCD7C9] rounded-xl shadow-lg p-6 mb-12 border border-[#A27B5C]/30"
      >
        <form onSubmit={handleChat}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#2C3930] mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 rounded-lg border border-[#3F4F44]/50 focus:ring-2 focus:ring-[#A27B5C] focus:border-[#A27B5C] outline-none transition bg-white"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C3930] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-[#3F4F44]/50 focus:ring-2 focus:ring-[#A27B5C] focus:border-[#A27B5C] outline-none transition bg-white"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#2C3930] mb-2">
              Your Feedback
            </label>
            <textarea
              name="opinion"
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-[#3F4F44]/50 focus:ring-2 focus:ring-[#A27B5C] focus:border-[#A27B5C] outline-none transition bg-white"
              placeholder="What do you think about our platform?"
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#A27B5C] hover:bg-[#8a6a4f] text-[#DCD7C9] px-6 py-3 rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <IoMdSend className="text-lg" />
                Submit Feedback
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Comments Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-semibold text-[#2C3930] mb-6">
          Community Comments ({opinions.length})
        </h3>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A27B5C]"></div>
          </div>
        ) : opinions.length === 0 ? (
          <div className="text-center py-12 bg-[#DCD7C9]/50 rounded-xl">
            <p className="text-[#3F4F44]">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <AnimatePresence>
            {opinions.map((opinion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#DCD7C9] rounded-xl shadow-md p-6 border border-[#A27B5C]/20"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-[#A27B5C]/10 text-[#A27B5C] rounded-full w-12 h-12 flex items-center justify-center">
                      <FaUserCircle className="text-2xl" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-[#2C3930]">{opinion.name}</h4>
                      <span className="text-xs text-[#3F4F44]">{opinion.email}</span>
                    </div>
                    <p className="text-[#3F4F44]">{opinion.opinion}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <button className="text-sm text-[#A27B5C] hover:text-[#8a6a4f] font-medium">
                        Reply
                      </button>
                      <span className="text-xs text-[#3F4F44]/70">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Chat;