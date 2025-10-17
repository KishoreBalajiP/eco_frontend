import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
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
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center py-4 border-b border-gray-200"
    >
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
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-1 hover:bg-gray-100 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <motion.span
            key={item.quantity}
            layout
            className="px-3 py-1 border-x"
          >
            {item.quantity}
          </motion.span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-1 hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="text-right">
          <motion.p layout className="font-bold text-gray-900">₹{item.price * item.quantity}</motion.p>
        </div>

        <button
          onClick={handleRemove}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
