import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ordersAPI, paymentsAPI } from '../../services/api';
import { Shipping, CartItem } from '../../types';
import { Truck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';

// --- ✅ Extend Window type for PhonePeCheckout ---
declare global {
  interface Window {
    PhonePeCheckout?: {
      transact: (options: {
        tokenUrl: string;
        callback?: (response: string) => void;
        type?: 'IFRAME' | 'REDIRECT';
      }) => void;
      closePage?: () => void;
    };
  }
}

type PaymentMethod = 'cod' | 'upi';

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState<Shipping | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        // ✅ FIX: Get current user's shipping info instead of order history
        const { data } = await api.get("/users/me/shipping");

        const shippingInfo: Shipping = {
          shipping_name: data.shipping_name,
          shipping_mobile: data.shipping_mobile,
          shipping_line1: data.shipping_line1,
          shipping_line2: data.shipping_line2,
          shipping_city: data.shipping_city,
          shipping_state: data.shipping_state,
          shipping_postal_code: data.shipping_postal_code,
          shipping_country: data.shipping_country,
        };

        if (
          !shippingInfo.shipping_name ||
          !shippingInfo.shipping_mobile ||
          !shippingInfo.shipping_line1 ||
          !shippingInfo.shipping_city ||
          !shippingInfo.shipping_state ||
          !shippingInfo.shipping_postal_code ||
          !shippingInfo.shipping_country
        ) {
          toast.warn('Please add your shipping address first.');
          navigate('/profile');
        } else {
          setShipping(shippingInfo);
        }
      } catch (err) {
        console.error('Failed to fetch shipping info', err);
        toast.warn('Please add your shipping address first.');
        navigate('/profile');
      }
    };

    fetchShipping();
  }, [navigate]);

  // --- ✅ Optional IFrame-based callback (kept for future) ---
  const phonePeCallback = (response: string) => {
    if (response === 'USER_CANCEL') {
      toast.info('Payment cancelled by user.');
      return;
    } else if (response === 'CONCLUDED') {
      toast.success('Payment completed.');
      navigate('/orders');
    }
  };

  const handleCompleteOrder = async () => {
    if (!shipping) return toast.error('Missing shipping info.');
    if (!paymentMethod) return toast.error('Please select a payment method.');
    if (cart.length === 0) return toast.error('Your cart is empty.');

    setLoading(true);
    try {
      // 1️⃣ Create order in backend
      const response = await ordersAPI.createOrder(shipping, paymentMethod);
      const order = response.order;

      const itemsForConfirmation: CartItem[] = cart.map(item => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url,
      }));

      // 2️⃣ Handle UPI (PhonePe) — temporarily disabled
      /*
      if (paymentMethod === 'upi') {
        const res = await paymentsAPI.createPhonePeOrder(order.id, total);

        // --- ✅ Prefer redirectUrl for official sandbox ---
        if (res.redirectUrl) {
          window.location.href = res.redirectUrl; // redirect to PhonePe Pay Page
          return;
        }

        // --- ✅ Fallback for IFRAME SDK if used later ---
        if (res.tokenUrl && window.PhonePeCheckout?.transact) {
          window.PhonePeCheckout.transact({
            tokenUrl: res.tokenUrl,
            type: 'IFRAME',
            callback: phonePeCallback,
          });
          return;
        }

        toast.error('PhonePe payment could not be started.');
        return;
      }
      */

      // 3️⃣ COD flow (unchanged)
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${order.id}`, {
        state: {
          paymentMethod,
          shipping,
          status: 'pending',
          items: itemsForConfirmation,
          total,
        },
      });
    } catch (err) {
      console.error('Checkout failed', err);
      toast.error('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!shipping) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            className="bg-white rounded-lg shadow p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {cart.map(item => (
                <div key={item.product_id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </motion.div>

          {/* Shipping & Payment */}
          <motion.div
            className="bg-white rounded-lg shadow p-6 space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Shipping Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Shipping To</h2>
              <p>{shipping.shipping_name}</p>
              <p>{shipping.shipping_mobile}</p>
              <p>
                {shipping.shipping_line1}
                {shipping.shipping_line2 ? `, ${shipping.shipping_line2}` : ''},{' '}
                {shipping.shipping_city}, {shipping.shipping_state},{' '}
                {shipping.shipping_postal_code}, {shipping.shipping_country}
              </p>
            </div>

            {/* Payment Selection */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Select Payment Method
              </h2>
              <div className="space-y-4">
                {/* COD Option */}
                <div
                  className={`border rounded-lg p-3 cursor-pointer flex items-center ${
                    paymentMethod === 'cod'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <Truck className="h-5 w-5 mr-2 text-gray-600" />
                  Cash on Delivery
                </div>

                {/* --- UPI OPTION HIDDEN (code retained for later) ---
                <div
                  className={`border rounded-lg p-3 cursor-pointer flex items-center ${
                    paymentMethod === 'upi'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <Smartphone className="h-5 w-5 mr-2 text-gray-600" />
                  Pay via PhonePe (UPI)
                </div>
                */}
              </div>
            </div>

            {/* Complete Order Button */}
            <button
              onClick={handleCompleteOrder}
              disabled={loading || !paymentMethod}
              className={`w-full py-3 flex items-center justify-center gap-2 rounded-lg text-white font-semibold ${
                loading || !paymentMethod
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <CheckCircle className="h-5 w-5" />
              {loading ? 'Processing...' : 'Complete Order'}
            </button>

            <p className="text-xs text-gray-600 mt-2 text-center">
              By placing your order, you agree to our{' '}
              <a href="/terms-and-conditions" target="_blank" className="underline">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy-policy" target="_blank" className="underline">
                Privacy Policy
              </a>.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Checkout;