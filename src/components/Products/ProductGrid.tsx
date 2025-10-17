import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevents navigation when clicking the button
    if (!user) {
      navigate('/login'); // redirect to login if not logged in
      return;
    }

    try {
      await addToCart(product.id, 1);
      toast.success(`${product.name} added to cart! 🛒`, {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to add to cart.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden 
                      hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
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
              <p className="text-xs text-gray-500 mt-1">
                {product.stock === 0 ? 'Out of Stock' : `Stock: ${product.stock}`}
              </p>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors 
                          ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              title={product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm font-medium">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
