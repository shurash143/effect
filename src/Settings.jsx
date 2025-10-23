import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Settings() {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    profilePic: ''
  });
  const [adminId, setAdminId] = useState(null);

  // Fetch existing admin
  useEffect(() => {
    fetch('http://localhost:3000/admin')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setAdmin(data[0]);
          setAdminId(data[0].id);
        }
      });
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = adminId
      ? `http://localhost:3000/admin/${adminId}`
      : 'http://localhost:3000/admin';

    const method = adminId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admin)
    })
      .then(res => res.json())
      .then(data => {
        alert(adminId ? 'Profile updated successfully!' : 'Profile created successfully!');
        setAdmin(data);
        if (!adminId) setAdminId(data.id);
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
    
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-10">
        <div className="max-w-2xl bg-white shadow-md rounded-lg p-8 mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4"> Settings</h2>

          {/* Profile Picture */}
          {admin.profilePic && (
            <div className="mb-6 text-center">
              <img
                src={admin.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
              />
              <p className="text-sm text-gray-500">Profile Picture</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={admin.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={admin.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bio / Role</label>
              <textarea
                name="bio"
                value={admin.bio}
                onChange={handleChange}
                placeholder="e.g. Super Admin"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
              />
            </div>

            {/* Profile Picture URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Picture URL</label>
              <input
                type="text"
                name="profilePic"
                value={admin.profilePic}
                onChange={handleChange}
                placeholder="Paste image URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-200"
              >
                {adminId ? 'Update Profile' : 'Create Profile'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
