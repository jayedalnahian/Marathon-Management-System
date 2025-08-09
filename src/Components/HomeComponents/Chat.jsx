import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaPaperPlane, FaRegComments } from "react-icons/fa";
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
      background: "#F2EFE7",
      color: "#006A71",
      customClass: {
        popup: "rounded-xl border-2 border-primary shadow-xl",
        title: "text-2xl font-bold text-primary",
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
      background: "#F2EFE7",
      color: "#006A71",
      customClass: {
        popup: "rounded-xl border-2 border-primary shadow-xl",
        title: "text-2xl font-bold text-primary",
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
    <div className="w-full max-w-4xl mx-auto my-16 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full mb-4">
          <FaRegComments className="text-2xl text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Community Feedback
        </h2>
        <p className="text-lg text-gray-600">
          Share your thoughts and read what others are saying
        </p>
      </motion.div>

      {/* Feedback Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-background rounded-xl shadow-lg p-6 mb-12 border border-gray-200"
      >
        <form onSubmit={handleChat}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              name="opinion"
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              placeholder="What do you think about our platform?"
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
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
        <h3 className="text-2xl font-semibold text-primary mb-6">
          Community Comments ({opinions.length})
        </h3>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : opinions.length === 0 ? (
          <div className="text-center py-12 bg-background/50 rounded-xl">
            <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <AnimatePresence>
            {opinions.map((opinion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl shadow-md p-6 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center">
                      <FaUserCircle className="text-2xl" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{opinion.name}</h4>
                      <span className="text-xs text-gray-500">{opinion.email}</span>
                    </div>
                    <p className="text-gray-700">{opinion.opinion}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <button className="text-sm text-primary hover:text-primary-dark font-medium">
                        Reply
                      </button>
                      <span className="text-xs text-gray-400">
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