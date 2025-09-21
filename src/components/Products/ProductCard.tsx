import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      await addToCart(product.id, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          {/* Updated image property */}
          <img
            src={product.image_url || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={product.name}
            className="h-48 w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-blue-600">₹{product.price}</span>
              <p className="text-xs text-gray-500 mt-1">Stock: {product.stock}</p>
            </div>
            
            {user && (
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                title="Add to Cart"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
