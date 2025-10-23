import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function SettingsPage() {
  const [settings, setSettings] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/settings')
      .then((response) => response.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching settings:', error);
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    fetch('http://localhost:3000/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Settings saved!');
        setSettings(data);
        // no navigate() here
      })
      .catch((error) => {
        console.error('Error saving settings:', error);
      });
  };

  if (loading) {
    return <p className="p-6">Loading settings...</p>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold">Seeker Portal</h2>
        <nav className="space-y-4">
          <NavLink
            to="/seekers"
            className={({ isActive }) =>
              `block px-3 py-2 rounded transition ${
                isActive ? 'bg-blue-600 text-white' : 'hover:text-blue-400'
              }`
            }
          >
            SeekersDashboard
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `block px-3 py-2 rounded transition ${
                isActive ? 'bg-blue-600 text-white' : 'hover:text-blue-400'
              }`
            }
          >
            Messages
          </NavLink>

          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `block px-3 py-2 rounded transition ${
                isActive ? 'bg-red-600 text-white' : 'hover:text-red-400'
              }`
            }
          >
            Logout
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">Settings</h2>

        <div className="space-y-4 max-w-xl">
          <div>
            <label className="block text-lg mb-1">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-lg mb-1">Password</label>
            <input
              type="password"
              value={settings.password}
              onChange={(e) => setSettings({ ...settings, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}
