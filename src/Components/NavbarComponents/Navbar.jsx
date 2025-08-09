import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthContext';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaSun, FaMoon, FaUser, FaRunning } from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [theme, setTheme] = useState('light');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    // Load theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        setTheme(savedTheme);
    }, []);

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    const logOutUser = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Logged Out Successfully",
                    text: "You have been signed out",
                    icon: "success",
                    background: "#F2EFE7",
                    color: "#006A71",
                    customClass: {
                        popup: 'rounded-xl border-2 border-primary shadow-xl',
                        title: 'text-2xl font-bold text-primary',
                    },
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                setIsMobileMenuOpen(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const navLinks = [
        { path: "/", name: "Home" },
        { path: "/marathons", name: "Marathons" },
        ...(user ? [
            { path: "/dashboard", name: "Dashboard" },
        ] : [
            { path: "/login", name: "Login" },
            { path: "/register", name: "Register" },
        ])
    ];

    return (
        <header className="bg-[#F2EFE7] shadow-sm fixed top-0 left-0 w-full z-50 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center"
                    >
                        <Link to="/" className="flex items-center gap-2">
                            <FaRunning className="text-2xl text-primary" />
                            <span className="text-xl font-bold text-primary">RUN</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive 
                                            ? 'text-primary font-semibold' 
                                            : 'text-gray-600 hover:text-primary'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right Side Controls */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <FaSun className="text-lg text-primary" />
                            ) : (
                                <FaMoon className="text-lg text-primary" />
                            )}
                        </motion.button>

                        {/* User Profile */}
                        {user && (
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Link 
                                    to="/profile" 
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary border-2 border-primary/20"
                                >
                                    <FaUser className="text-lg" />
                                </Link>
                            </motion.div>
                        )}

                        {/* Logout Button (Desktop) */}
                        {user && (
                            <motion.button
                                onClick={logOutUser}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden md:block px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                Logout
                            </motion.button>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <HiX className="h-6 w-6" />
                            ) : (
                                <HiOutlineMenuAlt3 className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white shadow-lg"
                    >
                        <div className="px-2 pt-2 pb-4 space-y-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => 
                                        `block px-3 py-2 rounded-md text-base font-medium ${
                                            isActive 
                                                ? 'bg-primary/10 text-primary' 
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            {user && (
                                <button
                                    onClick={logOutUser}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;