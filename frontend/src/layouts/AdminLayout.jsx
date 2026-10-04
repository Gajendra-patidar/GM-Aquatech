import React, { useContext } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
  const { admin, loading, logout } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin" className="p-2 hover:bg-gray-800 rounded">Dashboard</Link>
          <Link to="/admin/categories" className="p-2 hover:bg-gray-800 rounded">Categories</Link>
          <Link to="/admin/products" className="p-2 hover:bg-gray-800 rounded">Products</Link>
          <Link to="/admin/enquiries" className="p-2 hover:bg-gray-800 rounded">Wholesale Enquiries</Link>
          <Link to="/admin/messages" className="p-2 hover:bg-gray-800 rounded">Contact Messages</Link>
          <Link to="/admin/settings" className="p-2 hover:bg-gray-800 rounded">Settings</Link>
          <button onClick={logout} className="p-2 text-left text-red-400 hover:bg-gray-800 rounded mt-4">Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">G M Aquatech Admin</h2>
          <span>{admin.email}</span>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
