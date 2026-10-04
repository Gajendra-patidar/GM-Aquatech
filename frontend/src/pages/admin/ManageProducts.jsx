import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    name: '', slug: '', category: '', sku: '', shortDescription: '',
    description: '', isFeatured: false, isActive: true, availability: 'In Stock',
    images: []
  };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodRes.data.data);
      setCategories(catRes.data.data);
    } catch (error) {
      toast.error('Failed to load data');
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('images', files[i]);
    }

    setUploading(true);
    try {
      const res = await api.post('/upload/multiple', data);
      if (res.data.success) {
        setFormData({ ...formData, images: [...formData.images, ...res.data.urls] });
        toast.success('Images uploaded successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) return toast.error('Please select a category');

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, formData);
        toast.success('Product updated');
      } else {
        await api.post('/products', formData);
        toast.success('Product created');
      }
      setFormData(initialForm);
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleEdit = (prod) => {
    setFormData({
      name: prod.name,
      slug: prod.slug,
      category: prod.category?._id || prod.category,
      sku: prod.sku,
      shortDescription: prod.shortDescription,
      description: prod.description,
      isFeatured: prod.isFeatured,
      isActive: prod.isActive,
      availability: prod.availability,
      images: prod.images || []
    });
    setEditingId(prod._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded shadow-sm">
        <h2 className="text-xl font-bold">Manage Products</h2>
        <button 
          onClick={() => { setShowForm(!showForm); if(!showForm) { setFormData(initialForm); setEditingId(null); } }} 
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          {showForm ? 'Close Form' : 'Add New Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-1">Product Name *</label>
                <input type="text" required name="name" value={formData.name} onChange={handleNameChange} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm mb-1">Slug *</label>
                <input type="text" required name="slug" value={formData.slug} onChange={handleChange} className="w-full p-2 border rounded bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm mb-1">Category *</label>
                <select required name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">SKU *</label>
                <input type="text" required name="sku" value={formData.sku} onChange={handleChange} className="w-full p-2 border rounded" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Short Description *</label>
                <textarea required name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows="2" className="w-full p-2 border rounded"></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Full Description *</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-2 border rounded"></textarea>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Availability</label>
                <select name="availability" value={formData.availability} onChange={handleChange} className="w-full p-2 border rounded">
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Pre-order">Pre-order</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-2 justify-center">
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="isFeatured" id="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                  <label htmlFor="isFeatured">Featured Product</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange} />
                  <label htmlFor="isActive">Active (Visible)</label>
                </div>
              </div>

              <div className="md:col-span-2 border p-4 rounded bg-gray-50">
                <label className="block text-sm font-bold mb-2">Product Images</label>
                <div className="flex flex-wrap gap-4 mb-4">
                  {formData.images.map((img, i) => (
                    <div key={i} className="relative w-24 h-24 border bg-white flex items-center justify-center rounded overflow-hidden">
                      <img src={img} alt="Product" className="object-cover w-full h-full" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">X</button>
                    </div>
                  ))}
                </div>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={uploading} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                {uploading && <p className="text-sm text-blue-600 mt-2">Uploading images...</p>}
              </div>
            </div>
            
            <div className="flex gap-4">
              <button type="submit" disabled={uploading} className="bg-primary text-white px-8 py-2 rounded hover:bg-blue-800 disabled:opacity-50">
                {editingId ? 'Update Product' : 'Create Product'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setFormData(initialForm); setEditingId(null); }} className="bg-gray-500 text-white px-8 py-2 rounded hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 font-semibold text-sm">Image</th>
              <th className="p-4 font-semibold text-sm">Name / SKU</th>
              <th className="p-4 font-semibold text-sm">Category</th>
              <th className="p-4 font-semibold text-sm">Status</th>
              <th className="p-4 font-semibold text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No products found</td></tr>
            ) : (
              products.map((prod) => (
                <tr key={prod._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm">
                    {prod.images && prod.images.length > 0 ? (
                      <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 object-cover rounded border" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-500">No img</div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-dark">{prod.name}</div>
                    <div className="text-xs text-gray-500">SKU: {prod.sku}</div>
                    {prod.isFeatured && <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mt-1 inline-block">Featured</span>}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{prod.category?.name || 'Unknown'}</td>
                  <td className="p-4 text-sm">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`px-2 py-0.5 text-[10px] rounded-full ${prod.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {prod.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-xs text-gray-500">{prod.availability}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-right space-x-3">
                    <button onClick={() => handleEdit(prod)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(prod._id)} className="text-red-600 hover:underline">Delete</button>
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

export default ManageProducts;
