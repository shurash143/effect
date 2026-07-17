import React from 'react';

function JobForm({ form, onChange, onSubmit }) {
  return (
    <div className="w-full max-w-xl bg-white p-6 rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {form.id ? 'Edit Job' : 'Post a Job'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Job Title"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={onChange}
          placeholder="Company"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={onChange}
          placeholder="Location"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="type"
          value={form.type}
          onChange={onChange}
          placeholder="Full-Time / Part-Time"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="career"
          value={form.career}
          onChange={onChange}
          placeholder="Career Level (e.g., Entry, Mid, Senior)"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Job Description"
          className="w-full px-4 py-2 border rounded resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {form.id ? 'Update Job' : 'Post Job'}
        </button>
      </form>
    </div>
  );
}

export default JobForm;
