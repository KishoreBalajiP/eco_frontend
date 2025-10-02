// src/pages/Admin/OrdersManagement.tsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Search, Eye, X } from 'lucide-react';
import { adminAPI } from '../../services/api';
import { Order, OrderItem } from '../../types';

const OrdersManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) =>
      order.id.toString().includes(searchQuery) ||
      order.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [orders, searchQuery]);

  const fetchOrders = async () => {
    try {
      const response = await adminAPI.getOrders();
      setOrders(response.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: number,
    newStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  ) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (order?.status === 'cancelled') {
        // alert('Cancelled orders cannot be updated');
    toast.warn('Cancelled orders cannot be updated');
        return;
      }

      await adminAPI.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
      // alert('Failed to update order status');
    toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-700 bg-yellow-100';
      case 'shipped':
        return 'text-blue-700 bg-blue-100';
      case 'delivered':
        return 'text-green-700 bg-green-100';
      case 'cancelled':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const handleViewOrder = async (orderId: number) => {
    try {
      const response = await adminAPI.getOrderById(orderId);
      setSelectedOrder(response.order);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Failed to fetch order details:', err);
      // alert('Cannot fetch order details');
    toast.error('Cannot fetch order details');
    }
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user || 'Unknown'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(
                          order.id,
                          e.target.value as 'pending' | 'shipped' | 'delivered' | 'cancelled'
                        )
                      }
                      disabled={order.status === 'cancelled'}
                      className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${getStatusColor(order.status)} border-none focus:ring-2 focus:ring-blue-500
                        ${order.status === 'cancelled' ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {order.status === 'cancelled' && (
                      <span className="text-red-600 text-xs ml-2">
                        Cancelled by {order.cancelled_by === 'admin' ? 'admin' : 'user'}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => handleViewOrder(order.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Summary Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Order #{selectedOrder.id} Summary</h2>

            <div className="mb-4">
              <h3 className="font-semibold">Customer Info</h3>
              <p>{selectedOrder.user || 'Unknown'}</p>
            </div>

            {selectedOrder.shipping && (
              <div className="mb-4">
                <h3 className="font-semibold">Shipping Address</h3>
                <p>{selectedOrder.shipping.shipping_name}</p>
                <p>{selectedOrder.shipping.shipping_mobile}</p>
                <p>
                  {selectedOrder.shipping.shipping_line1}, {selectedOrder.shipping.shipping_line2 && `${selectedOrder.shipping.shipping_line2}, `}
                  {selectedOrder.shipping.shipping_city}, {selectedOrder.shipping.shipping_state} - {selectedOrder.shipping.shipping_postal_code}, {selectedOrder.shipping.shipping_country}
                </p>
              </div>
            )}

            {selectedOrder.items && selectedOrder.items.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold">Items</h3>
                <ul className="list-disc list-inside">
                  {selectedOrder.items.map((item: OrderItem) => (
                    <li key={item.product_id}>
                      {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Payment Info */}
            <div className="mb-4">
              <h3 className="font-semibold">Payment Info</h3>
              <p>Method: {selectedOrder.payment_method || 'COD'}</p>
              <p>Status: {selectedOrder.payment_status === 'paid' ? 'Paid' : 'Pending'}</p>
            </div>

            {selectedOrder.status === 'cancelled' && (
              <div className="mb-2 text-red-600 font-semibold">
                Cancelled by {selectedOrder.cancelled_by === 'admin' ? 'admin' : 'user'}
              </div>
            )}

            <div className="text-right font-bold">Total: ₹{selectedOrder.total}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
