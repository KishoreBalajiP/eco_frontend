import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Package, Clock, Truck, CheckCircle } from "lucide-react";
import { ordersAPI } from "../../services/api";
import { Order, OrderItem } from "../../types";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processingOrderId, setProcessingOrderId] = useState<number | null>(null); // Track order being canceled

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersAPI.getOrders();
        const ordersList: Order[] = response.orders || [];

        const detailedOrders: Order[] = await Promise.all(
          ordersList.map(async (order: Order) => {
            const details = await ordersAPI.getOrder(order.id);
            return { ...order, items: details.items || [] };
          })
        );

        setOrders(detailedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <Package className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "shipped":
        return "text-blue-700 bg-blue-100";
      case "delivered":
        return "text-green-700 bg-green-100";
      case "cancelled":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setProcessingOrderId(orderId); // mark as processing
      await ordersAPI.cancelOrder(orderId);

      setOrders(prev =>
        prev.map(o => (o.id === orderId ? { ...o, status: "cancelled" } : o))
      );
      // alert("Order cancelled successfully!");
    toast.success("Order cancelled successfully!");
    } catch (err) {
      console.error(err);
      // alert("Failed to cancel order.");
    toast.error("Failed to cancel order.");
    } finally {
      setProcessingOrderId(null); // reset processing state
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h1>
          <p className="text-gray-600">Start shopping to see your orders here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order: Order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  {getStatusIcon(order.status)}
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                  <div className="space-y-1">
                    {order.items.map((item: OrderItem, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between text-gray-700 py-1 border-b last:border-b-0"
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total: ₹{order.total}
                </span>

                {order.status === "pending" && (
                  <button
                    className={`px-3 py-1 rounded text-white ${
                      processingOrderId === order.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={processingOrderId === order.id} // disable while processing
                  >
                    {processingOrderId === order.id ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
