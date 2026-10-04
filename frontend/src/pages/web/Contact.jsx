import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const { settings } = useContext(SettingsContext);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact-messages', formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-h-screen py-16 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">Contact Us</h1>
          <p className="text-gray-600 text-lg">Have a question? Get in touch with our team.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
              <Phone size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2">Phone / WhatsApp</h3>
            <p className="text-gray-600 mb-2">Call us or send a message</p>
            <p className="font-semibold text-lg text-dark">{settings?.phone || '+91 9876543210'}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
              <Mail size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2">Email</h3>
            <p className="text-gray-600 mb-2">Send us your queries</p>
            <p className="font-semibold text-lg text-dark">{settings?.email || 'sales@gmaquatech.com'}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-lg shadow-sm text-center border border-gray-100 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
              <MapPin size={32} />
            </div>
            <h3 className="font-bold text-xl mb-2">Address</h3>
            <p className="text-gray-600 mb-2">Visit our office</p>
            <p className="font-semibold text-dark">{settings?.address || 'New Delhi, India'}</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-primary outline-none" placeholder="Your Name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-primary outline-none" placeholder="your@email.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:border-primary outline-none" placeholder="How can we help?" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full p-3 border border-gray-300 rounded focus:border-primary outline-none" placeholder="Your message here..." required></textarea>
                </div>
                <button type="submit" disabled={loading} className={`bg-primary text-white px-8 py-3 rounded font-medium hover:bg-blue-800 transition shadow-sm ${loading ? 'opacity-70' : ''}`}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
            
            <div className="bg-gray-200 h-full min-h-[400px]">
              <iframe 
                src={settings?.mapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754720782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1683901377543!5m2!1sen!2sin"} 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
