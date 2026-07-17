// SeekerLayout.jsx
import React from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';

export default function SeekerLayout() {
  const { seekerId } = useParams();
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: 'Dashboard', to: `/dashboard/${seekerId}` },
    { name: 'Profile', to: `/dashboard/${seekerId}/profile` },
    { name: 'Saved Jobs', to: `/dashboard/${seekerId}/saved-jobs` },
    { name: 'Messages', to: `/dashboard/${seekerId}/messages` },
    { name: 'Settings', to: `/dashboard/${seekerId}/settings` },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 sticky top-0 h-screen">
        <h2 className="text-2xl font-bold mb-8">Seeker Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          {sidebarLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-700 hover:bg-blue-600 hover:text-white px-3 py-2 rounded transition"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => navigate('/seekers')}
            className="mt-8 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
          >
            Back to Seekers List
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
