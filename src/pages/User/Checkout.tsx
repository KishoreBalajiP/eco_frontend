// src/pages/User/Checkout.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ordersAPI } from '../../services/api';
import api from '../../services/api';
import { Shipping, CartItem } from '../../types';
import { Truck, CreditCard, Smartphone } from 'lucide-react';

type PaymentMethod = 'cod' | 'upi' | 'card' | 'razorpay';

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState<Shipping | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [upiTransactionId, setUpiTransactionId] = useState('');
  const [orderCreated, setOrderCreated] = useState(false); // Prevent flash

  // Fetch shipping info from backend
  useEffect(() => {
    const fetchShipping = async () => {
      try {
        const { data } = await api.get('/users/me/shipping');
        if (
          !data.shipping_name ||
          !data.shipping_mobile ||
          !data.shipping_line1 ||
          !data.shipping_city ||
          !data.shipping_state ||
          !data.shipping_postal_code ||
          !data.shipping_country
        ) {
          alert('Please add your shipping address first.');
          navigate('/profile');
        } else {
          setShipping(data);
        }
      } catch (err) {
        console.error('Failed to fetch shipping info', err);
        alert('Please add your shipping address first.');
        navigate('/profile');
      }
    };

    fetchShipping();
  }, [navigate]);

  const handleCheckout = async () => {
    if (!shipping || cart.length === 0) return;

    setLoading(true);
    try {
      const response = await ordersAPI.createOrder(shipping);

      // Prepare cart items for confirmation page
      const itemsForConfirmation: CartItem[] = cart.map(item => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url,
      }));

      // Prevent flash
      setOrderCreated(true);

      // Clear cart after marking order created
      clearCart();

      // Navigate to confirmation
      navigate(`/order-confirmation/${response.order.id}`, {
        state: {
          paymentMethod,
          transactionId: paymentMethod === 'upi' ? upiTransactionId : undefined,
          shipping,
          status: paymentMethod === 'cod' ? 'pending' : 'paid',
          items: itemsForConfirmation,
          total,
        },
      });
    } catch (err) {
      console.error('Checkout failed', err);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering after order creation to avoid flash
  if (!shipping || orderCreated) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.product_id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Payment & Shipping */}
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* Shipping Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Shipping To</h2>
              <p>{shipping.shipping_name}</p>
              <p>{shipping.shipping_mobile}</p>
              <p>
                {shipping.shipping_line1}{shipping.shipping_line2 ? `, ${shipping.shipping_line2}` : ''}, {shipping.shipping_city}, {shipping.shipping_state}, {shipping.shipping_postal_code}, {shipping.shipping_country}
              </p>
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Payment Method</h2>
              <div className="space-y-4">
                {/* Cash on Delivery */}
                <div className="border rounded-lg p-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="mr-3"
                    />
                    <Truck className="h-5 w-5 mr-2 text-gray-600" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                {/* UPI */}
                <div className="border rounded-lg p-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="mr-3"
                    />
                    <Smartphone className="h-5 w-5 mr-2 text-gray-600" />
                    <span>UPI Payment</span>
                  </label>
                  {paymentMethod === 'upi' && (
                    <input
                      type="text"
                      placeholder="Enter transaction ID"
                      value={upiTransactionId}
                      onChange={(e) => setUpiTransactionId(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                  )}
                </div>

                {/* Card */}
                <div className="border rounded-lg p-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="mr-3"
                    />
                    <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                    <span>Card Payment (Razorpay)</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || cart.length === 0}
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Complete Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
