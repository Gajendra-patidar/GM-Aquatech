import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import api from '../../services/api';
import RoImg from '../../assets/ro_one.png';
import waterMark from '../../assets/slider3.jpg'

const reviews = [
  { id: 1, name: "Rahul Sharma", company: "Aqua Solutions", text: "G M Aquatech provides the best wholesale pricing in the market. Highly recommended!", rating: 5 },
  { id: 2, name: "Vikram Singh", company: "Pure Water Inc.", text: "Excellent quality RO components and very fast pan-India delivery.", rating: 5 },
  { id: 3, name: "Amit Patel", company: "Patel RO Services", text: "Very reliable supplier for our commercial RO plant setups. Great support.", rating: 4 },
  { id: 4, name: "Suresh Kumar", company: "Kumar Enterprises", text: "The premium quality products have helped us gain more happy customers.", rating: 5 },
  { id: 5, name: "Neha Gupta", company: "Gupta Traders", text: "Top-notch customer service and a vast range of products available.", rating: 5 },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % 15);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await api.get('/products?isFeatured=true&limit=4');
        setFeaturedProducts(prodRes.data.data);
      } catch (err) {
        console.error("Failed to load home data", err);
      }
    };
    fetchData();
  }, []);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const statsY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // Staggered variants for feature cards
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
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="overflow-hidden bg-light">
      {/* Animated Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden bg-dark">
        {/* Dynamic Background */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1579247192272-475253ba6c63?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Water background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-dark via-dark/90 to-cyan-900/40"></div>
          
          {/* Animated Blobs */}
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
          ></motion.div>
          <motion.div 
            animate={{ x: [0, -40, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]"
          ></motion.div>
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-cyan-200 px-5 py-2 rounded-full text-sm font-bold mb-8 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              India's Premier B2B RO Network
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white"
            >
              Next-Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-primary">Water Purification</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100/80 mb-10 leading-relaxed font-light max-w-2xl"
            >
              Elevate your business with commercial plants, domestic RO systems, and premium spares at unbeatable wholesale rates.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-5 mb-12"
            >
              <Link to="/products" className="group relative bg-gradient-to-r from-primary to-cyan-500 text-white px-8 py-4 rounded-full font-bold text-lg overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all">
                <span className="relative z-10">Explore Catalog</span>
                <div className="absolute inset-0 h-full w-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <Link to="/enquiry" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/40 transition-all">
                Become a Dealer
              </Link>
            </motion.div>

            {/* Social Media Links in Hero */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-5"
            >
              <span className="text-xs font-bold text-cyan-300/60 uppercase tracking-[0.2em]">Connect With Us</span>
              <div className="h-px w-12 bg-white/10"></div>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-transparent transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white transition-colors"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="lg:w-1/2 relative hidden lg:block"
          >
            {/* Floating Image Composition */}
            <div className="relative w-full aspect-square">
              <motion.img 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                src={RoImg}
                alt="RO Plant" 
                className="absolute top-0 right-0 w-3/4 h-3/4 object-cover rounded-3xl shadow-2xl border-4 border-white/10 z-20"
              />
              <motion.img 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                src={RoImg}
                className="absolute bottom-0 left-0 w-2/3 h-2/3 object-cover rounded-3xl shadow-2xl border-4 border-white/10 z-30"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-primary/20 rounded-3xl z-10 blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Stats Bar */}
      <section className="relative z-20 -mt-16 mb-24 px-4">
        <div className="container mx-auto">
          <motion.div 
            style={{ y: statsY }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Active Dealers", value: "500+" },
              { label: "Products", value: "250+" },
              { label: "Cities Covered", value: "50+" },
              { label: "Years Experience", value: "15+" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-cyan-500 mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover our top-rated RO systems and fast-moving spare parts.</p>
          </motion.div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, idx) => (
                <motion.div 
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-lg shadow-gray-200/50 overflow-hidden border border-gray-100 group flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center relative">
                    <img src={product.images?.[0] || "https://images.unsplash.com/photo-1616087799589-9a7dcbd28151?auto=format&fit=crop&w=600&q=80"} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {product.isFeatured && <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">Featured</div>}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">{product.category?.name || 'Category'}</p>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{product.shortDescription}</p>
                    <Link to={`/products/${product.slug}`} className="mt-auto block text-center w-full bg-light text-primary font-semibold py-2 rounded border border-primary/20 hover:bg-primary hover:text-white transition-colors">
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              No featured products yet. Please add some from the admin panel.
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/products" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-800 transition-all transform hover:-translate-y-1">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-light relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-3">Why Partner With Us</h2>
            <h3 className="text-4xl md:text-5xl font-black text-dark mb-6">The G M Aquatech Advantage</h3>
            <p className="text-lg text-gray-600">We don't just supply products; we empower businesses with reliable infrastructure and unmatched support.</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Wholesale Pricing",
                desc: "Unbeatable margins for dealers and bulk buyers.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              },
              {
                title: "Premium Quality",
                desc: "ISO certified components and reliable RO systems.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              },
              {
                title: "Pan-India Delivery",
                desc: "Fast and secure logistics across all states.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-lg shadow-gray-200/50 border border-gray-100 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-100 to-primary/10 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center mb-6 shadow-lg shadow-cyan-200 relative z-10 transform group-hover:rotate-6 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-bold text-dark mb-3 relative z-10">{item.title}</h4>
                <p className="text-gray-600 relative z-10 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-3">Testimonials</h2>
            <h3 className="text-4xl md:text-5xl font-black text-dark mb-6">What Our Partners Say</h3>
          </div>
        </div>
        
        <div className="relative w-full overflow-hidden flex">
          <motion.div 
            className="flex gap-6 px-4"
            animate={{ x: `calc(-${reviewIndex * (350 + 24)}px)` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ width: "fit-content" }}
          >
            {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
              <div key={index} className="w-[350px] shrink-0 bg-light p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-center gap-2 mb-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{review.text}"</p>
                <div>
                  <h4 className="font-bold text-dark">{review.name}</h4>
                  <p className="text-sm text-cyan-600 font-medium">{review.company}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Parallax CTA Section */}
      <section className="py-32 relative flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0">
          <img 
            src={waterMark} 
            alt="Water treatment" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-cyan-600/90 mix-blend-multiply"></div>
        </motion.div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 p-12 md:p-20 rounded-3xl shadow-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Ready to scale your RO business?</h2>
            <p className="text-xl text-blue-100 mb-10 font-light max-w-2xl mx-auto">Get access to premium wholesale rates and build a profitable partnership with G M Aquatech.</p>
            <Link to="/enquiry" className="inline-block bg-white text-primary px-10 py-5 rounded-full font-black text-xl hover:bg-cyan-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 transform">
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
