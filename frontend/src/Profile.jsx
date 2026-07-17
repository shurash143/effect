import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const [user, setUser] = useState({ name: '', email: '', bio: '', profilePicture: '' });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user });
  const [profileImage, setProfileImage] = useState(null);

  // Fetch profile data from backend
  useEffect(() => {
    fetch('https://effect-8t1j.onrender.com/user')
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setTempUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        setLoading(false);
      });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUser({ ...tempUser, [name]: value });
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setTempUser({ ...tempUser, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to backend
  const handleSave = () => {
    fetch('https://effect-8t1j.onrender.com/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tempUser)
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setEditMode(false);
        alert('Profile updated successfully!');
      })
      .catch((err) => {
        console.error('Error saving profile:', err);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
   

      {/* Profile Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center mb-8">My Profile</h1>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-32 h-32 mb-4">
              <img
                src={profileImage || user.profilePicture || '/default-avatar.png'}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border"
              />
              {editMode && (
                <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
                  <input
                    type="file"
                    id="upload-profile"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />
                  <label htmlFor="upload-profile" className="text-white text-sm">📷</label>
                </div>
              )}
            </div>

            {editMode ? (
              <input
                type="text"
                name="name"
                value={tempUser.name}
                onChange={handleInputChange}
                className="w-full max-w-sm px-4 py-2 mb-4 border rounded-md"
                placeholder="Your Name"
              />
            ) : (
              <h2 className="text-xl font-bold">{user.name}</h2>
            )}

            {editMode ? (
              <input
                type="email"
                name="email"
                value={tempUser.email}
                onChange={handleInputChange}
                className="w-full max-w-sm px-4 py-2 mb-4 border rounded-md"
                placeholder="Your Email"
              />
            ) : (
              <p className="text-gray-600">{user.email}</p>
            )}
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Bio</h3>
            {editMode ? (
              <textarea
                name="bio"
                value={tempUser.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
                rows="4"
                placeholder="Tell us about yourself"
              />
            ) : (
              <p className="text-gray-600">{user.bio || 'No bio provided yet'}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setTempUser(user); // Revert changes
                    setEditMode(false);
                  }}
                  className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
