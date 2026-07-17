import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Get the current location
  const location = useLocation();

  // Check if the current path is the dashboard
  if (location.pathname === "/AdminDashboard") {
    return null; // Hide navbar on the dashboard page
  }

  return (
    <nav className="sticky top-0 z-50 bg-blue-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center  lg space-x-2">
          <img 
            src="/logo.png" 
            alt=""
            className="h-10" 
          />
          <span className="text-2xl font-bold text-white">Queens company</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-white font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/testimonials">Testimonials</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Link to="/signup" className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700">
            SignUp
          </Link>
          <Link to="/login" className="px-4 py-2 border border-blue-600 text-white rounded hover:bg-blue-50">
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium">
            <li><Link to="/" onClick={() => setIsOpen(false)}>HomePage</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
            <li><Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link></li>
            <li><Link to="/testimonials" onClick={() => setIsOpen(false)}>Testimonials</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
          </ul>
          <div className="mt-4 flex gap-3">
            <Link to="/signup" className="w-full text-center bg-blue-600 text-white rounded py-2">
              SignUp
            </Link>

            <Link to="/login" className="w-full text-center border border-blue-600 text-blue-600 rounded py-2">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
