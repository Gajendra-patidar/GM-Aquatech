import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ManageContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/contact-messages');
      setMessages(res.data.data);
    } catch (error) {
      toast.error('Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contact-messages/${id}`, { status });
      toast.success('Status updated');
      fetchMessages();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/contact-messages/${id}`);
        toast.success('Message deleted');
        fetchMessages();
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Contact Messages</h2>
      </div>

      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-sm">Date</th>
              <th className="p-4 font-semibold text-sm">Name / Email</th>
              <th className="p-4 font-semibold text-sm">Subject</th>
              <th className="p-4 font-semibold text-sm">Status</th>
              <th className="p-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">Loading...</td></tr>
            ) : messages.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No contact messages found</td></tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-dark">{msg.name}</div>
                    <div className="text-xs text-gray-500">{msg.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium">{msg.subject}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{msg.message}</div>
                  </td>
                  <td className="p-4 text-sm">
                    <select 
                      value={msg.status} 
                      onChange={(e) => updateStatus(msg._id, e.target.value)}
                      className={`p-1 text-xs rounded border outline-none 
                        ${msg.status === 'Unread' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : 
                          msg.status === 'Read' ? 'bg-blue-50 text-blue-800 border-blue-200' : 
                          'bg-green-50 text-green-800 border-green-200'}`}
                    >
                      <option value="Unread">Unread</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                    </select>
                  </td>
                  <td className="p-4 text-sm text-right">
                    <button onClick={() => alert(msg.message)} className="text-blue-600 hover:underline mr-3">Read</button>
                    <button onClick={() => handleDelete(msg._id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContactMessages;
