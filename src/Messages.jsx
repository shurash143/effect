import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all messages
  useEffect(() => {
    fetch('http://localhost:3000/messages')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch messages');
        return res.json();
      })
      .then((data) => {
        setMessages(data.reverse()); // show newest first
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load messages.');
        setLoading(false);
      });
  }, []);

  const handlePost = () => {
    if (!sender.trim() || !newMessage.trim()) {
      setError('Please enter both sender name and message.');
      return;
    }

    setPosting(true);
    setError(null);

    if (editingMessageId) {
      // Editing existing message
      fetch(`http://localhost:3000/messages/${editingMessageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender,
          content: newMessage,
          createdAt: new Date().toISOString(),
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to update message');
          return res.json();
        })
        .then((updated) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === updated.id ? updated : m))
          );
          resetForm();
        })
        .catch((err) => {
          console.error(err);
          setError('Could not update message.');
        })
        .finally(() => setPosting(false));
    } else {
      // Posting new message
      const newMsg = {
        sender,
        content: newMessage,
        createdAt: new Date().toISOString(),
      };

      fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to send message');
          return res.json();
        })
        .then((savedMsg) => {
          setMessages((prev) => [savedMsg, ...prev]);
          resetForm();
        })
        .catch((err) => {
          console.error(err);
          setError('Could not send message.');
        })
        .finally(() => setPosting(false));
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    fetch(`http://localhost:3000/messages/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete');
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to delete message.');
      });
  };

  const handleEdit = (msg) => {
    setSender(msg.sender);
    setNewMessage(msg.content);
    setEditingMessageId(msg.id);
  };

  const resetForm = () => {
    setSender('');
    setNewMessage('');
    setEditingMessageId(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
     

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Messages</h2>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        {/* Form Section */}
        <div className="mb-6 bg-white p-4 rounded shadow-md">
          <input
            type="text"
            placeholder="Your name"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="w-full mb-3 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows={3}
            placeholder="Write your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={posting}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-3 space-x-3">
            <button
              onClick={handlePost}
              disabled={posting}
              className={`px-5 py-2 rounded-lg text-white ${
                posting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {editingMessageId ? 'Update Message' : 'Send Message'}
            </button>
            {editingMessageId && (
              <button
                onClick={resetForm}
                className="text-blue-800  lg ml-4"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* Message List */}
        {loading ? (
          <p className="text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500">No messages yet.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((msg) => (
              <li key={msg.id} className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{msg.sender}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{msg.content}</p>
                <div className="mt-2 space-x-3">
                  <button
                    onClick={() => handleEdit(msg)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
