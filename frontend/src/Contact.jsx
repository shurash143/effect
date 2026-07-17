import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setStatus('Please fill all fields');
      return;
    }

    try {
      const res = await fetch('https://effect-8t1j.onrender.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, date: new Date().toISOString() }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setName('');
      setEmail('');
      setMessage('');
      setStatus('');
      navigate('/admin');
    } catch (err) {
      setStatus('Error sending message. Try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="w-full bg-cover bg-center h-[300px] flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://media.istockphoto.com/id/2182242357/photo/hr-attrition-employee-retention-human-resources-analytics-and-engagement-crm-customer.jpg?s=612x612&w=0&k=20&c=QGIlzLvvv2t5tXmPR4SQg_xvjiEbv2XzWD4ewNOicyc=")',
        }}
      >
        <h1 className="text-4xl md:text-5xl text-white font-bold drop-shadow-lg">Contact Us</h1>
      </section>

      {/* Contact Form Section */}
      <section className="p-6 max-w-4xl mx-auto w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-700 text-center">Get in Touch</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              className="w-full border border-gray-300 p-3 rounded"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded"
          >
            Send Message
          </button>

          {status && (
            <p className="mt-4 text-center text-sm text-red-600">{status}</p>
          )}
        </form>
      </section>

      {/* Nairobi Map Section */}
      <section className="px-6 pb-12 max-w-6xl mx-auto w-full">
        <h3 className="text-2xl font-bold mb-4 text-blue-700 text-center">Find Us in Nairobi</h3>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <iframe
            title="Nairobi Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.116470180525!2d36.8172446!3d-1.2920658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10dbf9d2b91f%3A0x4b6c6a97cfa76f8c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1697201779843!5m2!1sen!2sus"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
        </div>
      </section>

      {/* Footer Section (Copied from HomePage) */}
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
            <p>Address: 123 Garissa, County, Kenya</p>
            <div className="mt-4 flex space-x-4">
              {/* Example social icons */}
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
