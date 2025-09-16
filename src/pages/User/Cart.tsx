import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart as CartIcon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/Cart/CartItem';

const Cart: React.FC = () => {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <CartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-4">Start shopping to add items to your cart.</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.product_id} item={item} />
            ))}
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-between items-center">
              <div className="text-lg">
                <span className="font-semibold">Total: </span>
                <span className="text-2xl font-bold text-blue-600">₹{total}</span>
              </div>
              
              <div className="space-x-4">
                <Link
                  to="/"
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={() => navigate('/checkout')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;