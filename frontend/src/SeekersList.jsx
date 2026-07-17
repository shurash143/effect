import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SeekersList({ seekers }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-blue-800 text-white p-6 transform
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:flex md:flex-col
        `}
      >
        <div className="flex items-center justify-between mb-8 md:hidden">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="text-white text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-8 hidden md:block">Menu</h2>
        <nav className="flex flex-col space-y-4 text-lg">
           <button
            onClick={() => {
              navigate('/admin');
              setSidebarOpen(false);
            }}
            className="text-left hover:bg-gray-700 px-3 py-2 rounded transition"
          >
            Admin
          </button>
          <button
            onClick={() => {
              navigate('/');
              setSidebarOpen(false);
            }}
            className="text-left hover:bg-gray-700 px-3 py-2 rounded transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate('/seekers');
              setSidebarOpen(false);
            }}
            className="text-left hover:bg-gray-700 px-3 py-2 rounded transition"
          >
            All Seekers
          </button>
          {/* Add more items as needed */}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header with hamburger */}
        <header className="md:hidden flex items-center justify-between bg-white p-4 shadow">
          <h1 className="text-xl font-bold">Seekers List</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="text-gray-800 text-3xl font-bold"
          >
            &#9776;
          </button>
        </header>

        <main className="max-w-6xl mx-auto p-6 mt-6 md:mt-10">
          <h1 className="text-4xl font-bold mb-8 text-center md:text-left">All Job Seekers</h1>

          {/* Grid container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seekers.map((seeker, index) => (
              <div
                key={seeker.id}
                className={`
                  bg-white p-6 rounded-lg shadow-md cursor-pointer flex flex-col justify-between
                  hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out
                  opacity-0 animate-slide-fade
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{seeker.name}</h2>
                  {/* Additional seeker info can go here */}
                </div>
                <Link
                  to={`/dashboard/${seeker.id}`}
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
                >
                  Go to {seeker.name}’s Dashboard
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Custom CSS for animation */}
      <style>{`
        @keyframes slideFade {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-fade {
          animation-name: slideFade;
          animation-duration: 500ms;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}
