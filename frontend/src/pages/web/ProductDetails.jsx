import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { SettingsContext } from '../../context/SettingsContext';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { settings } = useContext(SettingsContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/slug/\${slug}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading product details...</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-12 text-center text-xl">Product not found. <Link to="/products" className="text-primary underline">Back to products</Link></div>;
  }

  const handleWhatsApp = () => {
    const number = settings?.whatsapp?.replace(/[^0-9]/g, '') || '919876543210';
    const message = encodeURIComponent(`Hi G M Aquatech, I am interested in "\${product.name}" (SKU: \${product.sku}). Please share wholesale pricing and details.`);
    window.open(`https://wa.me/\${number}?text=\${message}`, '_blank');
  };

  return (
    <div className="bg-light min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary">Home</Link> &gt; 
          <Link to="/products" className="hover:text-primary ml-1">Products</Link> &gt; 
          <span className="text-dark ml-1">{product.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Images */}
            <div className="p-8 border-r border-gray-100 bg-gray-50 flex flex-col">
              <div className="h-80 w-full mb-6 bg-white rounded border border-gray-100 p-4">
                <img 
                  src={product.images && product.images[activeImage] ? product.images[activeImage] : "https://images.unsplash.com/photo-1616087799589-9a7dcbd28151?auto=format&fit=crop&w=1000&q=80"} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded"
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`h-20 w-20 flex-shrink-0 bg-white border rounded p-1 \${activeImage === idx ? 'border-primary shadow-sm' : 'border-gray-200'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12">
              <p className="text-primary font-semibold mb-2">{product.category?.name}</p>
              <h1 className="text-3xl font-bold text-dark mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                <span className="bg-gray-100 px-3 py-1 rounded">SKU: {product.sku}</span>
                <span className={`\${product.availability === 'In Stock' ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  &bull; {product.availability}
                </span>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link 
                  to={`/enquiry?product=\${encodeURIComponent(product.name)}`}
                  className="flex-1 bg-primary text-white text-center py-3 px-6 rounded hover:bg-blue-800 transition font-medium shadow-sm"
                >
                  Send Enquiry
                </Link>
                <button 
                  onClick={handleWhatsApp}
                  className="flex-1 bg-green-500 text-white text-center py-3 px-6 rounded hover:bg-green-600 transition font-medium shadow-sm flex items-center justify-center gap-2"
                >
                  WhatsApp Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {product.specifications && product.specifications.length > 0 && (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 pb-2 border-b">Specifications</h3>
              <div className="space-y-0">
                {product.specifications.map((spec, idx) => (
                  <div key={idx} className={`flex py-3 \${idx !== 0 ? 'border-t border-gray-100' : ''}`}>
                    <div className="w-1/3 text-gray-500 font-medium">{spec.key}</div>
                    <div className="w-2/3 text-dark">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 pb-2 border-b">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <span className="text-primary mt-1">&bull;</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
