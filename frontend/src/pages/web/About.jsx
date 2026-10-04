import React from 'react';
import { motion } from 'framer-motion';
import WaterPurificationImg from '../../assets/purifier.jfif';
import MyImg from '../../assets/myimg.jpeg';

const About = () => {
  return (
    <div className="bg-light min-h-screen py-16 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-4">About G M Aquatech</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We are India's leading wholesale distributor of premium RO Water Purification systems and components.
          </p>
        </motion.div>

        {/* Content Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={WaterPurificationImg}
              alt="Water Purification Plant" 
              className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-dark mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              At G M Aquatech, our mission is to empower local dealers and distributors by providing them with the highest quality water purification components at unbeatable wholesale prices. We believe that access to clean drinking water is a fundamental right, and our B2B network makes it possible.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">✓</div>
                <span className="text-dark font-medium">Premium Quality Standards</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">✓</div>
                <span className="text-dark font-medium">Extensive Dealer Network</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">✓</div>
                <span className="text-dark font-medium">Reliable After-Sales Support</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Business Owner Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 p-8 flex justify-center items-center h-full">
              <div className="w-68 h-68 rounded-full bg-primary flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative">
                <img src={MyImg} />
              </div>
            </div>
            <div className="w-full md:w-2/3 p-10">
              <div className="uppercase tracking-wider text-primary font-bold text-sm mb-2">Founder & CEO</div>
              <h2 className="text-3xl font-bold text-dark mb-4">Gajendra Patidar</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                With a deep vision for providing clean and safe drinking water, Gajendra Patidar founded G M Aquatech to revolutionize the RO water purification distribution network. Under his leadership, the company has grown into a trusted wholesale partner, emphasizing quality components and exceptional B2B support. His commitment to excellence continues to drive our mission of empowering local dealers across the region.
              </p>
              <div className="flex items-center gap-4">
                <a href="mailto:contact@gmaquatech.com" className="text-gray-500 hover:text-primary transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.53 4.82a2 2 0 002.27 0L20 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Banner Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <h2 className="text-3xl font-bold mb-6 relative z-10">We Value Our Wholesale Partners</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg relative z-10 mb-8">
            Whether you run a small RO service center or a large-scale distributorship, we have the inventory, pricing, and logistics to scale your business.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition relative z-10"
            onClick={() => window.location.href='/enquiry'}
          >
            Become a Partner Today
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
