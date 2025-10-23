import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    if (!email || !password) {
      setStatus('Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      // Fetch users with the given email
      const res = await fetch(`http://localhost:3000/user?email=${email}`);
      const users = await res.json();

      // Find user with matching password
      const user = users.find((u) => u.password === password);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Redirect based on account type
      if (user.accountType === 'admin') {
        navigate('/admin');
      } else if (user.accountType === 'jobseeker') {
        // Redirect jobseeker to their specific dashboard using their id
        navigate(`/dashboard/${user.id}`);
      } else {
        navigate('/seekers');
      }
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Login Form */}
      <section className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-gray-50 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Welcome Back</h2>
          {status && <div className="mb-4 text-center text-red-600">{status}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
