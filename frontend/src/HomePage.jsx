// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Discover Your <span className="text-yellow-300">Next Opportunity</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 text-blue-100">
              Find jobs that match your skills, interests, and values.
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/01/08/18/25/startup-593327_960_720.jpg"
              alt="Job search"
              className="rounded-lg shadow-lg w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Smart Search',
                desc: 'Advanced filters and keyword search help you find your ideal job fast.',
              },
              {
                title: 'Top Companies',
                desc: 'We work with industry leaders hiring across multiple sectors.',
              },
              {
                title: 'Career Growth',
                desc: 'We help you move forward with opportunities tailored to your goals.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-blue-50 px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Ready to take the next step?</h2>
          <p className="text-gray-600 mb-6">Join thousands of job seekers and land your dream role today.</p>
          <Link
            to="/signup"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Join Now
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About JobFinder</h3>
            <p className="text-blue-200">
              We connect talented job seekers with leading employers, helping you find the perfect fit.
              Our mission is to empower your career growth with smart, tailored opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline">About</Link></li>
              <li><Link to="/services" className="hover:underline">Services</Link></li>
              <li><Link to="/gallery" className="hover:underline">Gallery</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>Email: support@jobfinder.com</p>
            <p>Phone: 0721502859</p>
            <p>Address: 123 Garissa, County, Country</p>
              <div className="mt-4 flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2a3 3 0 0 1 3-3h2v3h-2a1 1 0 0 0-1 1v2h3l-1 3h-2v7A10 10 0 0 0 22 12z" /></svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 5.6a8.4 8.4 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.7 1 4.2 4.2 0 0 0-7 3.8 12 12 0 0 1-8.7-4.4 4.2 4.2 0 0 0 1.3 5.7 4.2 4.2 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9 8.5 8.5 0 0 1-5.2 1.8A8.4 8.4 0 0 1 2 18.6 12 12 0 0 0 8.3 20c7.5 0 11.6-6.2 11.6-11.6 0-.2 0-.4 0-.6A8.3 8.3 0 0 0 22 5.6z" /></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4zM9.4 17H6.6v-6.6h2.8V17zm-1.4-7.4a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2zm9.2 7.4h-2.8v-3a1.4 1.4 0 0 0-1.4-1.3 1.4 1.4 0 0 0-1.4 1.3v3h-2.8v-6.6h2.8v1a3 3 0 0 1 5.6 1.7v4z" /></svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center mt-10 text-blue-300 text-sm">
              &copy; {new Date().getFullYear()} JobFinder. All rights reserved.
            </div>
          </footer>
    </div>
  );
}
