import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = async (newQuantity: number) => {
    try {
      await updateQuantity(item.product_id, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemove = async () => {
    try {
      await removeFromCart(item.product_id);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <img
        src={item.image_url || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=200'}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg mr-4"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-blue-600 font-bold">₹{item.price}</p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-1 hover:bg-gray-100 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 border-x">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-1 hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="text-right">
          <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
        </div>

        <button
          onClick={handleRemove}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;