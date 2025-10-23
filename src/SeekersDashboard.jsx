import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SeekersDashboard({ seekers }) {
  const { seekerId } = useParams();
  const [jobs, setJobs] = useState([]);
  const [approvedJobs, setApprovedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const seeker = seekers.find(s => s.id === seekerId);
  const navigate = useNavigate();

  // Fetch job applications for the seeker
  useEffect(() => {
    fetch(`http://localhost:3000/jobs?userId=${seekerId}`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [seekerId]);

  // Fetch approved jobs for the seeker
  useEffect(() => {
    fetch(`http://localhost:3000/applications?seekerId=${seekerId}&status=approved`)
      .then(res => res.json())
      .then(data => {
        setApprovedJobs(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [seekerId]);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {seeker ? seeker.name : 'Seeker'}!
      </h1>

      {/* Job Applications Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Job Applications</h2>
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs found for you yet.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map(job => (
              <li
                key={job.id}
                className="bg-white p-4 rounded shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500">Status: {job.status || 'Pending'}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Quick Actions Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate(`/dashboard/${seekerId}/saved-jobs`)} // Fixed navigation
        >
          Search for Jobs
        </button>
      </section>

      {/* Approved Jobs Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Approved Jobs</h2>
        {approvedJobs.length === 0 ? (
          <p className="text-gray-600">You have no approved jobs yet.</p>
        ) : (
          <ul className="space-y-4">
            {approvedJobs.map(job => (
              <li
                key={job.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition ease-in-out duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
                <p className="text-gray-600">{job.company}</p>

                {/* Professional Approved Status Badge */}
                <div className="mt-4 flex justify-between items-center">
                  <span
                    className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded-md text-sm font-semibold inline-flex items-center"
                    style={{
                      boxShadow: '0 4px 6px rgba(0, 17, 255, 0.2)',
                    }}
                  >
                    <i className="fas fa-check-circle mr-2"></i> Approved
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">Application Date: {new Date(job.applicationDate).toLocaleDateString()}</p>

                {/* View Job Details Button - Link to Admin Dashboard */}
                <div className="mt-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/admin`)} // Navigating to admin's job detail page
                  >
                    View Job Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
