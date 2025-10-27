import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ordersAPI, paymentsAPI } from '../../services/api';
import { Shipping, CartItem } from '../../types';
import { Truck, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

type PaymentMethod = 'cod' | 'upi';

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState<Shipping | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        const res = await ordersAPI.getOrders(); // Fetch latest user orders
        const latestOrder = res.orders?.[0];
        if (!latestOrder) {
          toast.warn('Please add your shipping address first.');
          return navigate('/profile');
        }

        const shippingInfo: Shipping = {
          shipping_name: latestOrder.shipping_name,
          shipping_mobile: latestOrder.shipping_mobile,
          shipping_line1: latestOrder.shipping_line1,
          shipping_line2: latestOrder.shipping_line2,
          shipping_city: latestOrder.shipping_city,
          shipping_state: latestOrder.shipping_state,
          shipping_postal_code: latestOrder.shipping_postal_code,
          shipping_country: latestOrder.shipping_country,
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

  const handleCheckout = async (paymentMethod: PaymentMethod) => {
    if (!shipping || cart.length === 0) return;

    setLoading(true);
    try {
      const response = await ordersAPI.createOrder(shipping, paymentMethod);

      const itemsForConfirmation: CartItem[] = cart.map(item => ({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url,
      }));

      if (paymentMethod === 'upi') {
        // Redirect to PhonePe payment
        const res = await paymentsAPI.createPhonePeOrder(response.order.id, total);
        document.write(res); // Backend sends HTML form for automatic redirect
        document.close();
        return;
      }

      // COD: clear cart immediately and redirect to confirmation
      clearCart();

      navigate(`/order-confirmation/${response.order.id}`, {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

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

          {/* Payment & Shipping */}
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
                {shipping.shipping_line2 ? `, ${shipping.shipping_line2}` : ''}, {shipping.shipping_city},{' '}
                {shipping.shipping_state}, {shipping.shipping_postal_code}, {shipping.shipping_country}
              </p>
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Payment Method</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-3">
                  <button
                    className="flex items-center w-full cursor-pointer"
                    onClick={() => handleCheckout('cod')}
                    disabled={loading}
                  >
                    <Truck className="h-5 w-5 mr-2 text-gray-600" />
                    Cash on Delivery
                  </button>
                </div>

                <div className="border rounded-lg p-3">
                  <button
                    className="flex items-center w-full cursor-pointer"
                    onClick={() => handleCheckout('upi')}
                    disabled={loading}
                  >
                    <Smartphone className="h-5 w-5 mr-2 text-gray-600" />
                    UPI Payment
                  </button>
                </div>
              </div>
            </div>

            {/* Policy Notice */}
            <p className="text-xs text-gray-600 mt-2">
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
