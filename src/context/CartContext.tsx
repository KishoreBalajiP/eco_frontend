// src/context/CartContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, CartContextType } from '../types';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return;

    try {
      const response = await cartAPI.getCart();
      setCart(response.cart || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const addToCart = async (productId: number, quantity: number) => {
    try {
      const response = await cartAPI.addToCart(productId, quantity);
      setCart(response.cart || []);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const response = await cartAPI.removeFromCart(productId);
      setCart(response.cart || []);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to remove from cart');
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
    } else {
      await addToCart(productId, quantity);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
