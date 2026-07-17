import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const testimonials = [
  {
    id: 1,
    name: 'Jane Doe',
    role: 'Software Engineer',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote:
      "JobFinder helped me land my dream job in just a few weeks! The platform is so intuitive and the opportunities are top-notch.",
  },
  {
    id: 2,
    name: 'Michael Smith',
    role: 'Product Manager',
    photo: 'https://randomuser.me/api/portraits/men/46.jpg',
    quote:
      "The smart search feature saved me so much time. I found roles that perfectly matched my skills and career goals.",
  },
  {
    id: 3,
    name: 'Sarah Lee',
    role: 'UX Designer',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote:
      "I love how JobFinder connects job seekers with real companies that care about growth. Highly recommended!",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const { name, role, photo, quote } = testimonials[currentIndex];

  return (
    <div className="min-h-screen flex flex-col bg-blue-500">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat h-72 md:h-96 flex items-center justify-center"
        style={{
          backgroundImage:
            'url(https://media.istockphoto.com/id/1447969085/photo/business-people-using-smartphone-and-pressing-review-popup-on-visual-screen-customer-review.jpg?s=612x612&w=0&k=20&c=LEAGseFr_Pvg0l1EWeynEuGoRspCBhTJ2Q567n6P4Uk=)',
        }}
      >
        <div className="absolute inset-0  bg-opacity-60"></div>
        <h1 className="relative text-black text-4xl md:text-6xl font-bold z-10 text-center px-4">
          Testimonials
        </h1>
      </section>

      {/* Testimonials Slider */}
      <section className="bg-gray-100 py-16 px-6 flex-grow">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-white p-8 rounded-lg shadow-lg">
            <img
              src={photo}
              alt={name}
              className="w-24 h-24 rounded-full mx-auto mb-6 object-cover shadow-md"
            />
            <p className="text-gray-700 text-lg italic mb-6">"{quote}"</p>
            <p className="text-blue-700 font-semibold text-xl">{name}</p>
            <p className="text-gray-500">{role}</p>

            {/* Navigation dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-blue-700' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12">
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
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/services" className="hover:underline">Services</a></li>
              <li><a href="/gallery" className="hover:underline">Gallery</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/signup" className="hover:underline">Sign Up</a></li>
              <li><a href="/login" className="hover:underline">Login</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>Email: support@jobfinder.com</p>
            <p>Phone: 0721502859</p>
            <p>Address: 123Garissa, County, Country</p>
            <div className="mt-4 flex space-x-4">
              {/* Social Icons */}
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
