import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Smartphone } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ordersAPI, paymentsAPI } from '../../services/api';

type PaymentMethod = 'cod' | 'upi' | 'card' | 'razorpay';

const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [upiTransactionId, setUpiTransactionId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      if (paymentMethod === 'cod') {
        const response = await ordersAPI.createOrder();
        clearCart();
        navigate(`/order-confirmation/${response.order.id}`, {
          state: { paymentMethod: 'cod', status: 'pending' }
        });
      } else if (paymentMethod === 'upi' && upiTransactionId) {
        const response = await ordersAPI.createOrder();
        clearCart();
        navigate(`/order-confirmation/${response.order.id}`, {
          state: { paymentMethod: 'upi', transactionId: upiTransactionId }
        });
      } else if (paymentMethod === 'razorpay') {
        const orderResponse = await paymentsAPI.createOrder(
          total * 100, // Convert to paise
          'INR',
          `order_${Date.now()}`
        );
        
        // Simulate Razorpay payment success
        setTimeout(() => {
          clearCart();
          navigate(`/order-confirmation/${orderResponse.order.id}`, {
            state: { paymentMethod: 'razorpay', status: 'paid' }
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    if (paymentMethod === 'upi') {
      return upiTransactionId.trim().length > 0;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.product_id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
            
            <div className="space-y-4">
              {/* Cash on Delivery */}
              <div className="border rounded-lg p-4">
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
                {paymentMethod === 'cod' && (
                  <p className="text-sm text-gray-600 mt-2 ml-8">
                    Pay when your order is delivered
                  </p>
                )}
              </div>

              {/* UPI */}
              <div className="border rounded-lg p-4">
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
                  <div className="mt-3 ml-8">
                    <p className="text-sm text-gray-600 mb-2">
                      UPI ID: merchant@upi
                    </p>
                    <input
                      type="text"
                      placeholder="Enter transaction ID"
                      value={upiTransactionId}
                      onChange={(e) => setUpiTransactionId(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              {/* Razorpay */}
              <div className="border rounded-lg p-4">
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
                {paymentMethod === 'razorpay' && (
                  <p className="text-sm text-gray-600 mt-2 ml-8">
                    Secure payment via Razorpay
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || !isFormValid()}
              className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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