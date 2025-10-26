// src/pages/User/PaymentCallback.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../services/api";

const PaymentCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wrap async code inside a function
    const verifyPayment = async () => {
      const query = new URLSearchParams(location.search);
      const orderId = query.get("orderId");

      if (!orderId) {
        toast.error("Missing order ID in callback");
        setLoading(false);
        return navigate("/checkout");
      }

      try {
        const res = await axios.get(`/orders/${orderId}`);
        const order = res.data.order;

        if (!order) {
          toast.error("Order not found");
          return navigate("/checkout");
        }

        switch (order.status) {
          case "paid":
            toast.success("Payment successful!");
            navigate(`/order-confirmation/${orderId}`);
            break;
          case "failed":
            toast.error("Payment failed. Please try again.");
            navigate("/checkout");
            break;
          default:
            toast.info(`Payment status: ${order.status}`);
            navigate("/checkout");
        }
      } catch (err: any) {
        console.error("Payment verification failed:", err);
        toast.error("Unable to verify payment. Try again.");
        navigate("/checkout");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading && (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg">Verifying payment...</p>
        </div>
      )}
    </div>
  );
};

export default PaymentCallback;
