// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

// Components
import Navbar from './Navbar';
import HomePage from './HomePage';
import About from './About';
import Services from './Services';
import Gallery from './Gallery';
import Testimonials from './Testimonials';
import Contact from './Contact';
import SignUp from './SignUp';
import Login from './Login';
import JobList from './JobList';
import JobForm from './JobForm';
import AdminDashboard from './AdminDashboard';
import Settings from './Settings';
import SeekersDashboard from './SeekersDashboard';

import SeekersList from './SeekersList';
import Profile from './Profile';
import SavedJobs from './SavedJobs';
import Messages from './Messages';
import SeekerLayout from './SeekerLayout'; // make sure this exists
import JobSearch from './JobSearch';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const hideNavbarRoutes = [
    '/admin',
    '/admin/settings',
    '/admin/jobs',
    '/dashboard',
    '/seekers',
    '/seekers/seekersList',
    '/messages',
    '/saved-jobs',
  '/settings',
  '/profile',
  '/jobsearch'

  ];

  const shouldShowNavbar = !hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  const dummySeekers = [
    { id: 'seeker1', name: 'Alice' },
    { id: 'seeker2', name: 'Bob' },
     { id: 'seeker2', name: 'Bob' },
      { id: 'seeker2', name: 'Bob' },
       { id: 'seeker2', name: 'Bob' }, 
       { id: 'seeker2', name: 'Bob' },
  ];

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/jobs" element={<JobList />} />

          {/* Seekers List */}
          <Route path="/seekers" element={<SeekersList seekers={dummySeekers} />} />

          {/* Seeker Dashboard Layout with nested route */}
          <Route path="/dashboard/:seekerId" element={<SeekerLayout />}>
            <Route index element={<SeekersDashboard seekers={dummySeekers} />} />
<Route path="jobsearch" element={<JobSearch />} />
            <Route path="profile" element={<Profile />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings/>} />
              
          </Route>

          {/* Job Posting */}
          <Route path="/post-job" element={<JobForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
