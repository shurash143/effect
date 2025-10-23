import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/Jobs')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Job Board</h1>
      <Link
        to="/new"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        
      </Link>

      <ul className="space-y-4">
        {jobs.map(job => (
          <li key={job.id} className="p-4 border rounded shadow hover:shadow-md">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-700">{job.company} – {job.location}</p>
            <span className="inline-block mt-1 px-2 py-1 text-sm bg-gray-100 rounded">
              {job.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
