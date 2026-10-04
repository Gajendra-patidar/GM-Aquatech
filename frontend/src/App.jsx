import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

// Layouts
import WebLayout from './layouts/WebLayout';
import AdminLayout from './layouts/AdminLayout';

// Web Pages
import Home from './pages/web/Home';
import About from './pages/web/About';
import Products from './pages/web/Products';
import ProductDetails from './pages/web/ProductDetails';
import Reviews from './pages/web/Reviews';
import Contact from './pages/web/Contact';
import Enquiry from './pages/web/Enquiry';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageCategories from './pages/admin/ManageCategories';
import ManageEnquiries from './pages/admin/ManageEnquiries';
import ManageSettings from './pages/admin/ManageSettings';
import ManageContactMessages from './pages/admin/ManageContactMessages';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<WebLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:slug" element={<ProductDetails />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="contact" element={<Contact />} />
              <Route path="enquiry" element={<Enquiry />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
              <Route path="messages" element={<ManageContactMessages />} />
              <Route path="settings" element={<ManageSettings />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
