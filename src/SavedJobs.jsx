import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function SavedJobsPage() {
  const { seekerId } = useParams(); // Get seekerId from URL
  const [savedJobs, setSavedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [applyingJobId, setApplyingJobId] = useState(null);

  // Fetch all jobs
  useEffect(() => {
    fetch('https://effect-8t1j.onrender.com/Jobs')
      .then(res => res.json())
      .then(data => {
        setSavedJobs(data);
        setFilteredJobs(data);
      })
      .catch(err => console.error('Error fetching jobs:', err));
  }, []);

  // Filter jobs based on search input
  useEffect(() => {
    const filtered = savedJobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, savedJobs]);

  // Handle job application
  const handleApply = async (jobId, e) => {
    if (e) e.preventDefault(); // Prevent default behavior

    if (!seekerId) {
      alert('You must be logged in to apply.');
      return;
    }

    setApplyingJobId(jobId);

    try {
      const response = await fetch('http://localhost:3000/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seekerId, jobId }),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        const errorData = await response.json();
        console.error(errorData);
        alert('Failed to submit application.');
      }
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('An error occurred while applying.');
    } finally {
      setApplyingJobId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Saved Jobs</h1>

        <input
          type="text"
          placeholder="Search jobs by title or company..."
          className="w-full max-w-md mb-8 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 text-lg">No jobs found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <p className="text-gray-500 mb-4">{job.location}</p>
                  <p className="text-sm text-gray-400 mb-2">{job.type} - {job.career}</p>
                  <p className="text-sm text-gray-700">{job.description}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleApply(job.id, e)}
                  disabled={applyingJobId === job.id}
                  className={`mt-4 px-4 py-2 rounded text-white font-semibold transition ${
                    applyingJobId === job.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-700 hover:bg-blue-800'
                  }`}
                >
                  {applyingJobId === job.id ? 'Applying...' : 'Apply'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
