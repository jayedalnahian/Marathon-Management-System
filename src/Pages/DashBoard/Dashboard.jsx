import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars } from 'react-icons/fa';

const Dashboard = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { path: 'add-marathon', label: 'Add Marathon' },
    { path: 'my-marathons', label: 'My Added Marathons' },
    { path: 'applied-marathons', label: 'My Applied Marathons' },
  ];

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="min-h-screen bg-background text-textMain">
      {/* Header */}
      <header className="fixed top-16 w-full bg-primary text-background z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">🏃 Marathon Dashboard</h1>
          <button className="md:hidden text-2xl" onClick={() => setDrawerOpen(!drawerOpen)}>
            <FaBars />
          </button>
        </div>
      </header>

      {/* Sidebar drawer (mobile only) */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 mt-20 bg-white shadow-lg z-40 p-4 md:hidden"
          >
            <ul className="space-y-3 mt-10">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setDrawerOpen(false)}
                    className={`block px-4 py-2 rounded-md font-medium ${
                      isActive(link.path)
                        ? 'bg-secondary text-background'
                        : 'hover:bg-secondary/10 text-textMain'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main content layout */}
      <div className="pt-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sidebar (desktop only) */}
        <nav className="hidden md:block md:w-64 bg-white rounded-xl shadow-md h-fit sticky top-24 p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg font-medium ${
                    isActive(link.path)
                      ? 'bg-secondary text-background'
                      : 'hover:bg-secondary/10 text-textMain'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Page content */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 bg-white rounded-xl shadow-md min-h-[60vh]"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;
