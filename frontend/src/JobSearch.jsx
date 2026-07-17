// src/JobSearch.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

export default function JobSearch() {
  const { seekerId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://effect-8t1j.onrender.com/jobs') // Update this URL if needed
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-4 text-gray-700">
          <a href={`/dashboard/${seekerId}`} className="block hover:text-blue-600">
            Home
          </a>
          <a href={`/dashboard/${seekerId}/profile`} className="block hover:text-blue-600">
            Profile
          </a>
          <a href={`/dashboard/${seekerId}/saved-jobs`} className="block hover:text-blue-600">
            Saved Jobs
          </a>
          <a href={`/dashboard/${seekerId}/messages`} className="block hover:text-blue-600">
            Messages
          </a>
          <a href={`/dashboard/${seekerId}/settings`} className="block hover:text-blue-600">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Search for Jobs</h1>

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search jobs by title or company..."
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded shadow-sm"
          />
        </div>

        {/* Job list */}
        {loading ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-gray-600">No matching jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-5 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500">{job.location || 'Remote'}</p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
