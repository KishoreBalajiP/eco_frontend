// src/pages/User/OrderConfirmation.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import api from '../../services/api';
import { Shipping, CartItem } from '../../types';

interface LocationState {
  paymentMethod?: string;
  transactionId?: string;
  status?: 'pending' | 'paid';
  shipping?: Shipping;
  items?: CartItem[];
  total?: number;
}

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const initialState = (location.state as LocationState) || null;

  const [orderData, setOrderData] = useState<LocationState | null>(initialState);
  const [loading, setLoading] = useState(!initialState);

  // Fetch order from backend if state is missing (e.g., on page refresh)
  useEffect(() => {
    const fetchOrder = async () => {
      if (orderData) return; // Already have data

      try {
        setLoading(true);
        const res = await api.get(`/orders/${orderId}`);
        const order = res.data.order;
        const items = res.data.items;

        setOrderData({
          paymentMethod: order.paymentMethod || 'cod',
          transactionId: order.transactionId,
          status: order.status as 'pending' | 'paid',
          shipping: {
            shipping_name: order.shipping_name,
            shipping_mobile: order.shipping_mobile,
            shipping_line1: order.shipping_line1,
            shipping_line2: order.shipping_line2,
            shipping_city: order.shipping_city,
            shipping_state: order.shipping_state,
            shipping_postal_code: order.shipping_postal_code,
            shipping_country: order.shipping_country,
          },
          items,
          total: order.total,
        });
      } catch (err) {
        console.error('Failed to fetch order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, orderData]);

  if (loading || !orderData) return null; // Wait until data is ready

  const { paymentMethod, transactionId, status, shipping, items, total } = orderData;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Thank you for your order. We've received your order and will process it shortly.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2 text-lg">Order Details</h3>
          <p className="text-sm text-gray-600">Order ID: #{orderId}</p>
          <p className="text-sm text-gray-600">
            Payment Method: {paymentMethod ? paymentMethod.toUpperCase() : 'N/A'}
          </p>
          {transactionId && (
            <p className="text-sm text-gray-600">Transaction ID: {transactionId}</p>
          )}
          <p className="text-sm text-gray-600">
            Status: {status === 'pending' ? 'Pending' : 'Paid'}
          </p>

          {/* Items Table */}
          {items && items.length > 0 && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-200 rounded">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 border-b">Product</th>
                    <th className="px-3 py-2 border-b">Quantity</th>
                    <th className="px-3 py-2 border-b">Price</th>
                    <th className="px-3 py-2 border-b">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.product_id} className="border-b">
                      <td className="px-3 py-2">{item.name}</td>
                      <td className="px-3 py-2">{item.quantity}</td>
                      <td className="px-3 py-2">₹{item.price}</td>
                      <td className="px-3 py-2">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="px-3 py-2 font-semibold text-right">
                      Total
                    </td>
                    <td className="px-3 py-2 font-semibold">₹{total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Shipping Info */}
          {shipping && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-1 text-lg">Shipping Address</h4>
              <p className="text-sm text-gray-600">{shipping.shipping_name}</p>
              <p className="text-sm text-gray-600">{shipping.shipping_mobile}</p>
              <p className="text-sm text-gray-600">
                {shipping.shipping_line1}
                {shipping.shipping_line2 ? `, ${shipping.shipping_line2}` : ''}, {shipping.shipping_city}, {shipping.shipping_state}, {shipping.shipping_postal_code}, {shipping.shipping_country}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col lg:flex-row gap-4">
          <Link
            to="/orders"
            className="flex-1 flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Package className="inline h-4 w-4 mr-2" />
            View My Orders
          </Link>

          <Link
            to="/"
            className="flex-1 text-center border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
