import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '/products?';
        if (selectedCategory) url += `category=\${selectedCategory}&`;
        if (search) url += `search=\${search}&`;
        
        const res = await api.get(url);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedCategory, search]);

  return (
    <div className="bg-light min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-dark mb-2">Our Products</h1>
            <p className="text-gray-600">Browse our complete range of RO systems and spares.</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-64 focus:outline-none focus:border-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`w-full text-left py-1 \${!selectedCategory ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}
                    onClick={() => setSelectedCategory('')}
                  >
                    All Products
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat._id}>
                    <button 
                      className={`w-full text-left py-1 \${selectedCategory === cat._id ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}
                      onClick={() => setSelectedCategory(cat._id)}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="bg-white p-4 rounded shadow-sm animate-pulse h-80">
                    <div className="bg-gray-200 h-40 rounded mb-4"></div>
                    <div className="bg-gray-200 h-4 w-1/4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-6 w-3/4 rounded mb-4"></div>
                    <div className="bg-gray-200 h-4 w-full rounded"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product._id} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">
                    <div className="h-56 bg-gray-50 flex items-center justify-center p-0 border-b border-gray-50 flex-shrink-0 relative overflow-hidden group">
                      <img 
                        src={product.images && product.images[0] ? product.images[0] : "https://images.unsplash.com/photo-1616087799589-9a7dcbd28151?auto=format&fit=crop&w=600&q=80"} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <p className="text-xs text-primary font-semibold mb-1">{product.category?.name}</p>
                      <h3 className="font-bold text-dark mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{product.shortDescription}</p>
                      
                      <Link to={`/products/\${product.slug}`} className="mt-auto block text-center w-full bg-gray-50 text-dark border border-gray-200 py-2 rounded hover:bg-primary hover:text-white hover:border-primary transition font-medium">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or category filters.</p>
                <button 
                  onClick={() => {setSearch(''); setSelectedCategory('');}}
                  className="mt-6 text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Products;
