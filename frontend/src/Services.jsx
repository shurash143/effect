// src/pages/ServicesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Services() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Hero Section with Animated Background Image */}
      <motion.section
        className="bg-cover bg-center text-grey-800 py-30 px-20 relative"  
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/2197955227/photo/humans-are-using-laptops-and-computers-to-interact-with-ai-helping-them-create-code-train-ai.jpg?s=612x612&w=0&k=20&c=LQF82XJxK0LeBcUUWD2SGOt_5r9PCo35Lx6wWtK8HnY=')",
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">  {/* Reduced heading size */}
              Our <span className="text-yellow-300">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-white max-w-xl">
              Empowering your career and workforce with smart, effective solutions.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Cards */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Job Matching',
              desc: 'We help job seekers find roles that align with their skills, goals, and passions — quickly and accurately.',
            },
            {
              title: 'Recruitment Solutions',
              desc: 'We assist businesses in attracting, selecting, and retaining top talent with our powerful recruitment tools.',
            },
            {
              title: 'Career Guidance',
              desc: 'From resume building to interview prep, we provide resources to help candidates succeed in their careers.',
            },
            {
              title: 'Internships & Training',
              desc: 'Gain real-world experience through internships and upskilling opportunities that get you job-ready.',
            },
            {
              title: 'HR Consulting',
              desc: 'Strategic HR consulting services for startups and businesses to build sustainable growth models.',
            },
            {
              title: 'Remote Hiring',
              desc: 'Connecting global talent with companies offering remote jobs, ensuring efficiency and diversity.',
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">About JobFinder</h3>
            <p className="text-blue-200">
              We connect talented job seekers with leading employers, helping you find the perfect fit.
              Our mission is to empower your career growth with smart, tailored opportunities.
            </p>
          </div>

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
