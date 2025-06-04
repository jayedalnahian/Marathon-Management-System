import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';
import { Link, NavLink } from 'react-router';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [theme, setTheme] = useState('light');
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
                    title: "Log Out Successful",
                    icon: "success",
                    draggable: true
                });
            }).catch((error) => {
                console.log(error);

            });
    }

    const toggleThemeBtn = <>
        <label onClick={toggleTheme} className="flex cursor-pointer gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path
                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input type="checkbox" value="synthwave" className="toggle theme-controller" />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </label>
    </>
    return (
        <header className="p-4 shadow-md bg-base-200 text-base-content">
            <div className="container flex justify-between items-center mx-auto h-16">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-orange-500">RUN</Link>

                {/* Menu */}
                <div className='flex justify-center items-center gap-7'>
                    <ul className="hidden md:flex gap-4 items-center">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/marathons">Marathons</NavLink>
                        {user ? (
                            <>
                                <NavLink to="/dashboard">Dashboard</NavLink>
                                <span><button className='btn btn-primary' onClick={logOutUser}>Logout</button></span>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/register">Register</NavLink>
                            </>
                        )}

                    </ul>

                    {/* Theme Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        {toggleThemeBtn}
                        {/* <label onClick={toggleTheme} className="flex cursor-pointer gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                            </svg>
                            <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </label> */}
                        {user ? <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                <Link to='/profile'>
                                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                                </Link>
                            </div>
                        </div> : <div />}

                        {/* Mobile Menu Button (non-functional for now) */}
                        <div className="dropdown dropdown-end">
                            <button tabIndex={0} role="button" className="md:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box space-y-3 shadow-sm">
                                <span ><NavLink to="/">Home</NavLink></span>
                                <span><NavLink to="/marathons">Marathons</NavLink></span>
                                {user ? (
                                    <>
                                        <span><NavLink to="/dashboard">Dashboard</NavLink></span>
                                        <span><button className='btn btn-primary' onClick={logOutUser}>Logout</button></span>
                                    </>
                                ) : (
                                    <>
                                        <span><NavLink to="/login">Login</NavLink></span>
                                        <span><NavLink to="/register">Register</NavLink></span>
                                    </>
                                )}

                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
