import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { SettingsContext } from '../../context/SettingsContext';

const ManageSettings = () => {
  const { settings, refetchSettings } = useContext(SettingsContext);
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    mapUrl: '',
    businessHours: '',
    footerText: '',
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        businessName: settings.businessName || '',
        phone: settings.phone || '',
        whatsapp: settings.whatsapp || '',
        email: settings.email || '',
        address: settings.address || '',
        mapUrl: settings.mapUrl || '',
        businessHours: settings.businessHours || '',
        footerText: settings.footerText || '',
        facebook: settings.socialLinks?.facebook || '',
        instagram: settings.socialLinks?.instagram || '',
        youtube: settings.socialLinks?.youtube || '',
        linkedin: settings.socialLinks?.linkedin || ''
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Re-structure social links
      const payload = {
        ...formData,
        socialLinks: {
          facebook: formData.facebook,
          instagram: formData.instagram,
          youtube: formData.youtube,
          linkedin: formData.linkedin
        }
      };

      const res = await api.put('/settings', payload);
      if (res.data.success) {
        toast.success('Settings updated successfully');
        refetchSettings();
      }
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Manage Website Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">General Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full p-2 border rounded focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
              <textarea name="footerText" value={formData.footerText} onChange={handleChange} rows="3" className="w-full p-2 border rounded focus:ring-primary focus:border-primary"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
              <input type="text" name="businessHours" value={formData.businessHours} onChange={handleChange} className="w-full p-2 border rounded focus:ring-primary focus:border-primary" />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full p-2 border rounded focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full p-2 border rounded focus:ring-primary focus:border-primary"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Embed URL</label>
              <input type="text" name="mapUrl" value={formData.mapUrl} onChange={handleChange} className="w-full p-2 border rounded focus:ring-primary focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input type="text" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full p-2 border rounded focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full p-2 border rounded focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input type="text" name="youtube" value={formData.youtube} onChange={handleChange} className="w-full p-2 border rounded focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full p-2 border rounded focus:ring-primary focus:border-primary" />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded hover:bg-blue-800 disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageSettings;
