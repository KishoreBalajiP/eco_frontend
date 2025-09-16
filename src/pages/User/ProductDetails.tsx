import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Package } from 'lucide-react';
import { productsAPI } from '../../services/api';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Chatbot from '../../components/Chatbot/Chatbot';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const response = await productsAPI.getProduct(Number(id));
        setProduct(response.product);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !user) return;
    
    try {
      await addToCart(product.id, quantity);
      alert('Product added to cart!');
    } catch (error: any) {
      alert(error.message || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.image || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-2xl font-bold text-blue-600 mt-2">₹{product.price}</p>
                <p className="text-gray-600 mt-2">Stock: {product.stock} units available</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {user && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="block w-20 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              )}

              {!user && (
                <p className="text-gray-600">Please log in to add items to your cart.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default ProductDetails;