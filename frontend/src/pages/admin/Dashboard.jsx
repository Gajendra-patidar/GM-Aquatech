import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    enquiries: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, catRes, enqRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
          api.get('/enquiries')
        ]);
        setStats({
          products: prodRes.data.total || prodRes.data.count,
          categories: catRes.data.count,
          enquiries: enqRes.data.total || enqRes.data.count
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Total Products</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.products}</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Categories</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.categories}</p>
        </div>
        
        <div className="bg-white p-6 rounded shadow border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm font-semibold uppercase">Total Enquiries</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.enquiries}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
