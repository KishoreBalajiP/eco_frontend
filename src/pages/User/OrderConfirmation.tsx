import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const { paymentMethod, transactionId, status } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. We've received your order and will process it shortly.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">Order Details</h3>
          <p className="text-sm text-gray-600">Order ID: #{orderId}</p>
          <p className="text-sm text-gray-600">Payment Method: {paymentMethod?.toUpperCase()}</p>
          {transactionId && (
            <p className="text-sm text-gray-600">Transaction ID: {transactionId}</p>
          )}
          <p className="text-sm text-gray-600">
            Status: {status === 'pending' ? 'Pending' : 'Paid'}
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/orders"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Package className="inline h-4 w-4 mr-2" />
            View My Orders
          </Link>
          
          <Link
            to="/"
            className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;