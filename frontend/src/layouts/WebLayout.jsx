import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { SettingsContext } from '../context/SettingsContext';
import { Menu, X } from 'lucide-react';

const WebLayout = () => {
  const { settings } = useContext(SettingsContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>{settings?.phone || '+91 9876543210'} | {settings?.email || 'sales@gmaquatech.com'}</div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">B2B Wholesale Partner</span>
            <div className="flex items-center gap-3 border-l border-white/20 pl-4 ml-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500 flex items-center gap-2 drop-shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
            {settings?.businessName || 'G M Aquatech'}
          </Link>
          
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-primary font-semibold tracking-wide transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-semibold tracking-wide transition-colors">About</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary font-semibold tracking-wide transition-colors">Products</Link>
            <Link to="/reviews" className="text-gray-700 hover:text-primary font-semibold tracking-wide transition-colors">Reviews</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-semibold tracking-wide transition-colors">Contact</Link>
            <Link to="/enquiry" className="bg-gradient-to-r from-primary to-cyan-500 text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all">
              Get Quote
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">About</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Products</Link>
            <Link to="/reviews" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Reviews</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Contact Us</Link>
            <Link to="/enquiry" onClick={() => setIsMenuOpen(false)} className="bg-primary text-white text-center px-4 py-2 rounded shadow-md">
              Get Quote
            </Link>
          </div>
        )}
      </header>
      
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-gray-400 py-16 mt-12 border-t-4 border-cyan-500">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-black text-white mb-4">
              {settings?.businessName || 'G M Aquatech'}
            </h3>
            <p className="mb-6 leading-relaxed">{settings?.footerText || 'Your Trusted RO Wholesale Partner. Providing high-quality RO systems and components to dealers and distributors.'}</p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition">Client Reviews</Link></li>
              <li><Link to="/enquiry" className="hover:text-white transition">Wholesale Enquiry</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li>{settings?.address || 'New Delhi, India'}</li>
              <li>Phone: {settings?.phone}</li>
              <li>Email: {settings?.email}</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-gray-700">
          <p>&copy; {new Date().getFullYear()} {settings?.businessName || 'G M Aquatech'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WebLayout;
