import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/categories/\${editingId}`, { name, slug });
        toast.success('Category updated');
      } else {
        await api.post('/categories', { name, slug });
        toast.success('Category created');
      }
      setName('');
      setSlug('');
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      toast.error('Failed to save category');
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setSlug(cat.slug);
    setEditingId(cat._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/categories/\${id}`);
        toast.success('Category deleted');
        fetchCategories();
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 flex gap-4 items-end">
        <div>
          <label className="block mb-1 text-sm">Name</label>
          <input 
            type="text" 
            className="border p-2 rounded" 
            value={name} 
            onChange={(e) => {
              setName(e.target.value);
              if (!editingId) {
                setSlug(e.target.value.toLowerCase().replace(/\\s+/g, '-'));
              }
            }} 
            required 
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Slug</label>
          <input 
            type="text" 
            className="border p-2 rounded" 
            value={slug} 
            onChange={(e) => setSlug(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="bg-primary text-white p-2 rounded">
          {editingId ? 'Update' : 'Add'} Category
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setName(''); setSlug(''); }} className="bg-gray-400 text-white p-2 rounded">
            Cancel
          </button>
        )}
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat._id} className="border-b">
                <td className="p-4">{cat.name}</td>
                <td className="p-4">{cat.slug}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(cat)} className="text-blue-500 mr-3">Edit</button>
                  <button onClick={() => handleDelete(cat._id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCategories;
