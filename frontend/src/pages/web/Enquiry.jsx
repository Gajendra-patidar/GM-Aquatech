import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Enquiry = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productFromUrl = searchParams.get('product') || '';

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    product: productFromUrl,
    quantity: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/enquiries', formData);
      toast.success('Enquiry submitted successfully! We will contact you soon.');
      setFormData({
        name: '',
        businessName: '',
        mobile: '',
        email: '',
        city: '',
        state: '',
        product: '',
        quantity: '',
        message: ''
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light py-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">Wholesale Enquiry</h1>
          <p className="text-gray-600 text-lg">Partner with us for premium RO products at competitive wholesale prices.</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-100">
          <div className="w-full md:w-1/3 bg-primary text-white p-8 md:p-10">
            <h3 className="text-xl font-bold mb-6">Why Partner With Us?</h3>
            <ul className="space-y-6">
              <li>
                <strong className="block text-blue-200 mb-1">Premium Quality</strong>
                <span className="text-sm">Rigorous quality checks for maximum reliability and fewer returns.</span>
              </li>
              <li>
                <strong className="block text-blue-200 mb-1">Competitive Pricing</strong>
                <span className="text-sm">Direct wholesale rates ensuring healthy margins for your business.</span>
              </li>
              <li>
                <strong className="block text-blue-200 mb-1">Ready Stock</strong>
                <span className="text-sm">Vast inventory ensuring quick dispatch and delivery.</span>
              </li>
              <li>
                <strong className="block text-blue-200 mb-1">Dedicated Support</strong>
                <span className="text-sm">Technical and after-sales support for all our partners.</span>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-2/3 p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business/Company Name *</label>
                  <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Doe RO Services" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Optional)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Maharashtra" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product of Interest *</label>
                  <input type="text" name="product" value={formData.product} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. 100 GPD RO Membrane, 1000 LPH Plant" />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Est. Quantity *</label>
                  <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="e.g. 500 pcs" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message / Requirements</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full p-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Any specific requirements..."></textarea>
              </div>

              <button type="submit" disabled={loading} className={`w-full bg-primary text-white py-4 rounded font-bold text-lg shadow-sm hover:bg-blue-800 transition \${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
