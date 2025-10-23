import React, { useEffect, useState } from 'react';
import JobForm from './JobForm';

export default function AdminDashboard() {
  // VIEW STATE
  const [view, setView] = useState("dashboard");

  // JOB STATES
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    career: '',
    description: ''
  });

  // APPLICATION STATES
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);

  // CONTACT STATES
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingContactId, setEditingContactId] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  // MESSAGE STATES
  const [messages, setMessages] = useState([]);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [messageForm, setMessageForm] = useState({
    sender: '',
    content: ''
  });

  // FETCH DATA
  useEffect(() => {
    fetch('https://effect-8t1j.onrender.com/Jobs')
      .then(res => res.json())
      .then(setJobs);

    fetch('https://effect-8t1j.onrender.com/applications')
      .then(res => res.json())
      .then(setApplications);

    fetch('https://effect-8t1j.onrender.com/user')
      .then(res => res.json())
      .then(setUsers);

    fetch('https://effect-8t1j.onrender.com/contact')
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      }).catch(err => {
        setError(err.message);
        setLoading(false);
      });

    fetch('https://effect-8t1j.onrender.com/messages')
      .then(res => res.json())
      .then(setMessages);
  }, []);

  // --- JOB HANDLERS ---
  const handleJobChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleJobSubmit = (e) => {
    e.preventDefault();
    const url = editingJobId ? `https://effect-8t1j.onrender.com/Jobs/${editingJobId}` : 'https://effect-8t1j.onrender.com/Jobs';
    const method = editingJobId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, postedBy: 'admin' }),
    })
      .then(res => res.json())
      .then(() => {
        setForm({ title: '', company: '', location: '', type: '', career: '', description: '' });
        setEditingJobId(null);
        return fetch('https://effect-8t1j.onrender.com/Jobs');
      })
      .then(res => res.json())
      .then(setJobs);
  };

  const handleJobEdit = (job) => {
    setForm({ ...job });
    setEditingJobId(job.id);
  };

  const handleJobDelete = (id) => {
    if (confirm('Delete this job?')) {
      fetch(`https://effect-8t1j.onrender.com/Jobs/${id}`, { method: 'DELETE' })
        .then(() => fetch('https://effect-8t1j.onrender.com/Jobs').then(res => res.json()).then(setJobs));
    }
  };

  // --- APPLICATION HANDLERS ---
  const handleApplicationEdit = (app) => alert(`Edit application from seeker ${app.seekerId}`);
  const handleApplicationDelete = (id) => {
    if (confirm('Delete this application?')) {
      fetch(`https://effect-8t1j.onrender.com/applications/${id}`, { method: 'DELETE' })
        .then(() => fetch('https://effect-8t1j.onrender.com/applications').then(res => res.json()).then(setApplications));
    }
  };

  const handleApplicationApprove = (id) => {
    if (confirm('Approve this application?')) {
      fetch(`hhttps://effect-8t1j.onrender.com/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      })
        .then(() => {
          alert('Application Approved!');
          return fetch('https://effect-8t1j.onrender.com/applications');
        })
        .then(res => res.json())
        .then(setApplications);
    }
  };

  // --- CONTACT HANDLERS ---
  const handleContactEdit = (contact) => {
    setEditingContactId(contact.id);
    setContactForm({ name: contact.name, email: contact.email, message: contact.message });
  };

  const handleContactChange = (e) => setContactForm({ ...contactForm, [e.target.name]: e.target.value });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!editingContactId) return;

    fetch(`https://effect-8t1j.onrender.com/contact/${editingContactId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...contactForm, date: new Date().toISOString() }),
    })
      .then(() => {
        setEditingContactId(null);
        setContactForm({ name: '', email: '', message: '' });
        return fetch('https://effect-8t1j.onrender.com/contact');
      })
      .then(res => res.json())
      .then(setContacts);
  };

  const handleDeleteContact = (id) => {
    if (confirm('Delete this contact?')) {
      fetch(`https://effect-8t1j.onrender.com/contact/${id}`, { method: 'DELETE' })
        .then(() => fetch('https://effect-8t1j.onrender.com/contact').then(res => res.json()).then(setContacts));
    }
  };

  // --- MESSAGE HANDLERS ---
  const handleMessageEdit = (msg) => {
    setEditingMessageId(msg.id);
    setMessageForm({ sender: msg.sender, content: msg.content });
  };

  const handleMessageChange = (e) => setMessageForm({ ...messageForm, [e.target.name]: e.target.value });

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!editingMessageId) return;

    fetch(`https://effect-8t1j.onrender.com/messages/${editingMessageId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...messageForm, createdAt: new Date().toISOString() }),
    })
      .then(() => {
        setEditingMessageId(null);
        setMessageForm({ sender: '', content: '' });
        return fetch('https://effect-8t1j.onrender.com/messages');
      })
      .then(res => res.json())
      .then(setMessages);
  };

  const handleDeleteMessage = (id) => {
    if (confirm('Delete this message?')) {
      fetch(`https://effect-8t1j.onrender.com/messages/${id}`, { method: 'DELETE' })
        .then(() => fetch('https://effect-8t1j.onrender.com/messages').then(res => res.json()).then(setMessages));
    }
  };

  // LOADING/ERROR STATES
  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-600">Error: {error}</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <button onClick={() => setView("dashboard")} className={`block hover:underline ${view === "dashboard" ? 'font-bold text-green-400' : ''}`}>Dashboard</button>
          <button onClick={() => setView("jobs")} className={`block hover:underline ${view === "jobs" ? 'font-bold text-green-400' : ''}`}>Jobs</button>
          <button onClick={() => setView("applications")} className={`block hover:underline ${view === "applications" ? 'font-bold text-green-400' : ''}`}>Applications</button>
          <button onClick={() => setView("contacts")} className={`block hover:underline ${view === "contacts" ? 'font-bold text-green-400' : ''}`}>Contacts</button>
          <button onClick={() => setView("messages")} className={`block hover:underline ${view === "messages" ? 'font-bold text-green-400' : ''}`}>Messages</button>
          <button onClick={() => window.location.href = '/seekers'} className="block hover:underline">Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50 overflow-auto">
        {view === "dashboard" && (
          <section>
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <p>Welcome to the admin panel. Use the sidebar to manage different sections.</p>
          </section>
        )}

        {view === "jobs" && (
          <section>
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Manage Jobs</h1>
            <JobForm
              form={form}
              onFormChange={handleJobChange}
              onFormSubmit={handleJobSubmit}
            />
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Job Title</th>
                  <th className="py-3 px-4 text-left">Company</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{job.title}</td>
                    <td className="py-3 px-4">{job.company}</td>
                    <td className="py-3 px-4">{job.location}</td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => handleJobEdit(job)} 
                        className="text-blue-600 hover:underline mr-3">Edit
                      </button>
                      <button 
                        onClick={() => handleJobDelete(job.id)} 
                        className="text-red-600 hover:underline">Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === "applications" && (
          <section>
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Job Applications</h1>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Job Title</th>
                  <th className="py-3 px-4 text-left">Applicant</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Applied At</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => {
                  const job = jobs.find(j => j.id === app.jobId);
                  const seeker = users.find(u => u.id === app.seekerId);
                  return (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{job?.title || 'N/A'}</td>
                      <td className="py-3 px-4">{seeker?.name || 'N/A'}</td>
                      <td className="py-3 px-4">{seeker?.email || 'N/A'}</td>
                      <td className="py-3 px-4">{new Date(app.appliedAt).toLocaleString()}</td>
                      <td className="py-3 px-4">{app.status || 'Pending'}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleApplicationEdit(app)} 
                          className="text-blue-600 hover:underline mr-3">Edit
                        </button>
                        <button 
                          onClick={() => handleApplicationDelete(app.id)} 
                          className="text-red-600 hover:underline">Delete
                        </button>
                        {app.status !== 'approved' && (
                          <button 
                            onClick={() => handleApplicationApprove(app.id)} 
                            className="text-green-600 hover:underline ml-3">Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}
        
          {view === "contacts" && (
          <section>
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Contact Messages</h1>
            {editingContactId && (
              <form onSubmit={handleContactSubmit} className="mb-4">
                <input name="name" value={contactForm.name} onChange={handleContactChange} placeholder="Name" className="border p-2 mr-2" />
                <input name="email" value={contactForm.email} onChange={handleContactChange} placeholder="Email" className="border p-2 mr-2" />
                <input name="message" value={contactForm.message} onChange={handleContactChange} placeholder="Message" className="border p-2 mr-2" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">Save</button>
              </form>
            )}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Message</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(({ id, name, email, message, date }) => (
                  <tr key={id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{name}</td>
                    <td className="py-3 px-4">{email}</td>
                    <td className="py-3 px-4">{message}</td>
                    <td className="py-3 px-4">{new Date(date).toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <button onClick={() => handleContactEdit({ id, name, email, message })} className="text-blue-600 hover:underline mr-3">Edit</button>
                      <button onClick={() => handleDeleteContact(id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
  {view === "messages" && (
          <section>
            <h1 className="text-2xl font-bold mb-6 text-blue-700">User Messages</h1>
            {editingMessageId && (
              <form onSubmit={handleMessageSubmit} className="mb-4">
                <input name="sender" value={messageForm.sender} onChange={handleMessageChange} placeholder="Sender" className="border p-2 mr-2" />
                <input name="content" value={messageForm.content} onChange={handleMessageChange} placeholder="Content" className="border p-2 mr-2" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2">Save</button>
              </form>
            )}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Sender</th>
                  <th className="py-3 px-4 text-left">Content</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(({ id, sender, content, createdAt }) => (
                  <tr key={id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{sender}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{content}</td>
                    <td className="py-3 px-4">{createdAt ? new Date(createdAt).toLocaleString() : 'N/A'}</td>
                    <td className="py-3 px-4">
                      <button onClick={() => handleMessageEdit({ id, sender, content })} className="text-blue-600 hover:underline mr-3">Edit</button>
                      <button onClick={() => handleDeleteMessage(id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}
