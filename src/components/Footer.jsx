import React from 'react';
import { Link } from 'react-router';
import { FaInstagram, FaTwitter, FaFacebookF, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white px-6 py-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Logo & Branding */}
                <div>
                    <Link to="/" className="text-4xl font-bold text-orange-400">RUN</Link>
                    <p className="text-sm mt-2 text-gray-400">Fuel your passion. Run your journey.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-white">Navigation</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-orange-400 transition duration-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/description" className="hover:text-orange-400 transition duration-200">Description</Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
    <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
    <div className="flex justify-center md:justify-start space-x-4">
        {[
            { href: "#", title: "Instagram", icon: <FaInstagram /> },
            { href: "#", title: "Twitter", icon: <FaTwitter /> },
            { href: "#", title: "Facebook", icon: <FaFacebookF /> },
            { href: "#", title: "Gmail", icon: <FaEnvelope /> },
        ].map(({ href, title, icon }) => (
            <a
                key={title}
                href={href}
                title={title}
                className="hover:text-orange-400 text-white text-2xl transition"
            >
                {icon}
            </a>
        ))}
    </div>
</div>
            </div>

            {/* Copyright */}
            <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-4">
                &copy; {new Date().getFullYear()} RUN. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
