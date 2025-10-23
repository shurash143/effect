// src/pages/SignUpPage.jsx

import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('user'); // 'user', 'jobseeker', 'admin'
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('');

  if (!fullName || !email || !password || !confirmPassword) {
    setStatus('Please fill all fields');
    return;
  }
  if (password !== confirmPassword) {
    setStatus('Passwords do not match');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        accountType,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || 'Failed to sign up');
    }

    // ✅ Redirect all users to login after signup
    navigate('/login');
  } catch (err) {
    setStatus(`Sign up failed: ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-72 md:h-96 flex items-center justify-center"
        style={{
          backgroundImage: `url("https://media.istockphoto.com/id/2206170382/photo/colleagues-discussing-project-at-workplace.jpg?s=612x612&w=0&k=20&c=gsyh0HAbrTPxtsum2RD_rKILLr1OCtHMgKBC3tElFHI=")`,
        }}
      >
        <div className="absolute inset-0  bg-opacity-50"></div>
        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold">Create Your Account</h1>
      </section>

      {/* Sign Up Form */}
      <section className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg bg-gray-50 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Sign Up</h2>

          {status && (
            <div className="mb-4 text-center text-red-600">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Account Type</label>
              <select
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="user">User</option>
                <option value="jobseeker">JobSeeker</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition ${
                loading ? 'opacity-50' : ''
              }`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
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
              <li><Link to="/login" className="hover:underline">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>Email: support@jobfinder.com</p>
            <p>Phone: 0721502859</p>
            <p>Address: 123 Garissa, Nairobi, Kenya</p>
            <div className="mt-4 flex space-x-4">
              <Link to="#" className="hover:text-yellow-300">Facebook</Link>
              <Link to="#" className="hover:text-yellow-300">Twitter</Link>
              <Link to="#" className="hover:text-yellow-300">LinkedIn</Link>
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
