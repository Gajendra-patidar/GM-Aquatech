import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', slug: '', isActive: true, order: 0 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData({ ...formData, name, slug: generateSlug(name) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, formData);
        toast.success('Category updated');
      } else {
        await api.post('/categories', formData);
        toast.success('Category created');
      }
      setFormData({ name: '', slug: '', isActive: true, order: 0 });
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleEdit = (cat) => {
    setFormData({ name: cat.name, slug: cat.slug, isActive: cat.isActive, order: cat.order });
    setEditingId(cat._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/categories/${id}`);
        toast.success('Category deleted');
        fetchCategories();
      } catch (error) {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm mb-1">Category Name</label>
            <input type="text" required value={formData.name} onChange={handleNameChange} className="w-full p-2 border rounded" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm mb-1">Slug</label>
            <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full p-2 border rounded bg-gray-50" />
          </div>
          <div className="w-24">
            <label className="block text-sm mb-1">Order</label>
            <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} className="w-full p-2 border rounded" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} id="isActive" />
            <label htmlFor="isActive" className="text-sm">Active</label>
          </div>
          <div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-800">
              {editingId ? 'Update' : 'Add'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({name: '', slug: '', isActive: true, order: 0}) }} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-sm">Order</th>
              <th className="p-4 font-semibold text-sm">Name</th>
              <th className="p-4 font-semibold text-sm">Slug</th>
              <th className="p-4 font-semibold text-sm">Status</th>
              <th className="p-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">Loading...</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No categories found</td></tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">{cat.order}</td>
                  <td className="p-4 text-sm font-medium text-dark">{cat.name}</td>
                  <td className="p-4 text-sm text-gray-500">{cat.slug}</td>
                  <td className="p-4 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${cat.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {cat.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-right">
                    <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:underline mr-3">Edit</button>
                    <button onClick={() => handleDelete(cat._id)} className="text-red-600 hover:underline">Delete</button>
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

export default ManageCategories;
