import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const dummyReviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "AquaPure Solutions",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "G M Aquatech has been our most reliable wholesale partner for over 3 years. Their 100 GPD RO membranes are of top-notch quality and we've had zero customer complaints."
  },
  {
    id: 2,
    name: "Suresh Sharma",
    company: "Sharma Electronics",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 5,
    text: "Excellent pricing and immediate dispatch! We order bulk RO pumps every month and the delivery is always on time. Highly recommend for any RO dealer."
  },
  {
    id: 3,
    name: "Anita Desai",
    company: "Desai Water Purifiers",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    text: "Very professional B2B service. The product catalogue is vast and they always maintain stock. The only reason for 4 stars is I wish they opened earlier in the morning."
  },
  {
    id: 4,
    name: "Vikram Singh",
    company: "Singh RO Agency",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    text: "Best wholesale rates in the market without compromising on quality. The team at G M Aquatech genuinely cares about helping small dealers grow."
  },
  {
    id: 5,
    name: "Priya Patel",
    company: "Patel Home Appliances",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "We recently switched to G M Aquatech for our commercial RO plant requirements and the build quality is fantastic. 100% satisfied!"
  },
  {
    id: 6,
    name: "Amit Verma",
    company: "Verma Enterprises",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
    text: "Trustworthy partner for all RO spare parts. Their sediment filters and carbon blocks have great life and filtration capacity."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  }
};

const Reviews = () => {
  return (
    <div className="bg-light min-h-screen py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-4">Client Reviews</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See what our B2B partners, dealers, and distributors have to say about our RO products and wholesale service.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {dummyReviews.map((review) => (
            <motion.div 
              key={review.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 relative"
            >
              <div className="absolute top-0 right-0 p-6 text-6xl text-gray-100 font-serif leading-none select-none">
                "
              </div>
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold text-lg text-dark">{review.name}</h3>
                  <p className="text-sm text-primary font-medium">{review.company}</p>
                </div>
              </div>
              
              <div className="flex text-yellow-400 mb-4 text-xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                ))}
              </div>
              
              <p className="text-gray-600 italic relative z-10">"{review.text}"</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-primary rounded-3xl p-10 text-center text-white shadow-2xl relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          
          <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to partner with us?</h2>
          <p className="mb-8 text-blue-100 max-w-xl mx-auto relative z-10">
            Join hundreds of satisfied dealers across the country. Get the best wholesale rates for premium RO systems.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition relative z-10"
            onClick={() => window.location.href='/enquiry'}
          >
            Get a Wholesale Quote
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
};

export default Reviews;
