import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaTwitter, 
  FaFacebookF, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegClock
} from 'react-icons/fa';
import { FaRunning } from 'react-icons/fa';

const Footer = () => {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { path: "/", name: "Home" },
        { path: "/marathons", name: "Marathons" },
        { path: "/about", name: "About Us" },
        { path: "/contact", name: "Contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { path: "/blog", name: "Blog" },
        { path: "/faq", name: "FAQs" },
        { path: "/training", name: "Training Plans" },
        { path: "/terms", name: "Terms of Service" }
      ]
    }
  ];

  const contactInfo = [
    { icon: <FaMapMarkerAlt />, text: "123 Marathon St, Runner City" },
    { icon: <FaPhoneAlt />, text: "+1 (555) 123-4567" },
    { icon: <FaRegClock />, text: "Mon-Fri: 9AM - 5PM" }
  ];

  const socialLinks = [
    { href: "#", title: "Instagram", icon: <FaInstagram /> },
    { href: "#", title: "Twitter", icon: <FaTwitter /> },
    { href: "#", title: "Facebook", icon: <FaFacebookF /> },
    { href: "#", title: "Email", icon: <FaEnvelope /> }
  ];

  return (
    <footer className="bg-[#2C3930] text-[#DCD7C9]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Branding Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <Link to="/" className="flex items-center gap-2">
            <FaRunning className="text-3xl text-[#A27B5C]" />
            <span className="text-2xl font-bold">RUN</span>
          </Link>
          <p className="text-[#DCD7C9]/80">
            Empowering runners to achieve their goals through world-class events and community support.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                title={social.title}
                className="text-[#DCD7C9] hover:text-[#A27B5C] text-xl transition-colors"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Links Columns */}
        {footerLinks.map((column, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">{column.title}</h3>
            <ul className="space-y-2">
              {column.links.map((link, linkIndex) => (
                <motion.li 
                  key={linkIndex}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-[#DCD7C9]/80 hover:text-[#A27B5C] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Contact Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <ul className="space-y-3">
            {contactInfo.map((info, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[#A27B5C] mt-0.5">{info.icon}</span>
                <span className="text-[#DCD7C9]/80">{info.text}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#A27B5C] hover:bg-[#8a6a4f] text-[#DCD7C9] px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="border-t border-[#3F4F44] py-6"
      >
        <div className="max-w-7xl mx-auto px-6 text-center text-[#DCD7C9]/60 text-sm">
          &copy; {new Date().getFullYear()} RUN. All rights reserved. | Designed with ❤️ for runners
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;