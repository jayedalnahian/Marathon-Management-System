import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthContext';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaSun, FaMoon, FaUser, FaRunning, FaChevronDown } from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [theme, setTheme] = useState('light');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
                    background: "#DCD7C9",
                    color: "#2C3930",
                    customClass: {
                        popup: 'rounded-xl border-2 border-[#A27B5C] shadow-xl',
                        title: 'text-2xl font-bold text-[#2C3930]',
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

    const baseNavLinks = [
        { path: "/", name: "Home" },
        { path: "/marathons", name: "Marathons" },
        { path: "/about", name: "About" }
    ];

    const protectedNavLinks = [
        { path: "/dashboard", name: "Dashboard" },
        { path: "/profile", name: "Profile" },
        { path: "/settings", name: "Settings" }
    ];

    const authNavLinks = [
        { path: "/login", name: "Login" },
        { path: "/register", name: "Register" }
    ];

    return (
        <header className="bg-[#2C3930] fixed top-0 left-0 w-full z-50 shadow-md">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center"
                    >
                        <Link to="/" className="flex items-center gap-2">
                            <FaRunning className="text-2xl text-[#DCD7C9]" />
                            <span className="text-xl font-bold text-[#DCD7C9]">RUN</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {baseNavLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive 
                                            ? 'text-[#A27B5C] font-semibold' 
                                            : 'text-[#DCD7C9] hover:text-[#A27B5C]'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {/* Protected routes - only for logged in users */}
                        {user && protectedNavLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive 
                                            ? 'text-[#A27B5C] font-semibold' 
                                            : 'text-[#DCD7C9] hover:text-[#A27B5C]'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {/* Auth routes - only for logged out users */}
                        {!user && authNavLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => 
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive 
                                            ? 'text-[#A27B5C] font-semibold' 
                                            : 'text-[#DCD7C9] hover:text-[#A27B5C]'
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
                            className="p-2 rounded-full hover:bg-[#3F4F44] transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <FaSun className="text-lg text-[#DCD7C9]" />
                            ) : (
                                <FaMoon className="text-lg text-[#DCD7C9]" />
                            )}
                        </motion.button>

                        {/* User Profile Dropdown */}
                        {user && (
                            <div className="relative">
                                <motion.button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#3F4F44] transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#A27B5C] flex items-center justify-center text-[#DCD7C9]">
                                        <FaUser className="text-sm" />
                                    </div>
                                    <FaChevronDown className={`text-xs text-[#DCD7C9] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </motion.button>

                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-48 bg-[#3F4F44] rounded-md shadow-lg z-50 border border-[#2C3930]"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            <div className="py-1">
                                                <Link
                                                    to="/profile"
                                                    className="block px-4 py-2 text-sm text-[#DCD7C9] hover:bg-[#2C3930]"
                                                >
                                                    Your Profile
                                                </Link>
                                                <Link
                                                    to="/settings"
                                                    className="block px-4 py-2 text-sm text-[#DCD7C9] hover:bg-[#2C3930]"
                                                >
                                                    Settings
                                                </Link>
                                                <button
                                                    onClick={logOutUser}
                                                    className="block w-full text-left px-4 py-2 text-sm text-[#DCD7C9] hover:bg-[#2C3930]"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-md text-[#DCD7C9] hover:text-[#A27B5C] focus:outline-none"
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
                        className="md:hidden bg-[#3F4F44] shadow-lg"
                    >
                        <div className="px-2 pt-2 pb-4 space-y-1">
                            {baseNavLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => 
                                        `block px-3 py-2 rounded-md text-base font-medium ${
                                            isActive 
                                                ? 'bg-[#2C3930] text-[#A27B5C]' 
                                                : 'text-[#DCD7C9] hover:bg-[#2C3930]'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            {user && protectedNavLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => 
                                        `block px-3 py-2 rounded-md text-base font-medium ${
                                            isActive 
                                                ? 'bg-[#2C3930] text-[#A27B5C]' 
                                                : 'text-[#DCD7C9] hover:bg-[#2C3930]'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            {!user && authNavLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => 
                                        `block px-3 py-2 rounded-md text-base font-medium ${
                                            isActive 
                                                ? 'bg-[#2C3930] text-[#A27B5C]' 
                                                : 'text-[#DCD7C9] hover:bg-[#2C3930]'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            {user && (
                                <button
                                    onClick={logOutUser}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#DCD7C9] hover:bg-[#2C3930]"
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