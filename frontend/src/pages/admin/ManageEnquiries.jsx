import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/enquiries');
      setEnquiries(res.data.data);
    } catch (error) {
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/enquiries/${id}`, { status });
      toast.success('Status updated');
      fetchEnquiries();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await api.delete(`/enquiries/${id}`);
        toast.success('Enquiry deleted');
        fetchEnquiries();
      } catch (error) {
        toast.error('Failed to delete enquiry');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Enquiries</h2>
      </div>

      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-sm">Date</th>
              <th className="p-4 font-semibold text-sm">Name / Contact</th>
              <th className="p-4 font-semibold text-sm">Product / Subject</th>
              <th className="p-4 font-semibold text-sm">Status</th>
              <th className="p-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">Loading...</td></tr>
            ) : enquiries.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No enquiries found</td></tr>
            ) : (
              enquiries.map((enq) => (
                <tr key={enq._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-dark">{enq.name}</div>
                    <div className="text-xs text-gray-500">{enq.email}</div>
                    <div className="text-xs text-gray-500">{enq.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium">{enq.productName || enq.subject || 'General Enquiry'}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{enq.message}</div>
                  </td>
                  <td className="p-4 text-sm">
                    <select 
                      value={enq.status} 
                      onChange={(e) => updateStatus(enq._id, e.target.value)}
                      className={`p-1 text-xs rounded border outline-none 
                        ${enq.status === 'New' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : 
                          enq.status === 'Read' ? 'bg-blue-50 text-blue-800 border-blue-200' : 
                          'bg-green-50 text-green-800 border-green-200'}`}
                    >
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                    </select>
                  </td>
                  <td className="p-4 text-sm text-right">
                    <button onClick={() => alert(enq.message)} className="text-blue-600 hover:underline mr-3">Read</button>
                    <button onClick={() => handleDelete(enq._id)} className="text-red-600 hover:underline">Delete</button>
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

export default ManageEnquiries;
