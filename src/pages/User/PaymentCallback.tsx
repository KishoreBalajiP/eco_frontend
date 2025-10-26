// src/pages/User/PaymentCallback.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import api from "../../services/api";

const PaymentCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePaymentCallback = async () => {
      try {
        // Get query params if any (like orderId, status)
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get("orderId");

        if (!orderId) {
          toast.error("Invalid payment callback data.");
          setLoading(false);
          return;
        }

        // Fetch payment status from backend
        const { data } = await api.get(`/payments/status/${orderId}`);

        if (data.status === "paid") {
          toast.success("Payment successful! Your order is confirmed.");

          // Clear cart in frontend
          clearCart();

          // Navigate to order confirmation page
          navigate(`/order-confirmation/${orderId}`, {
            state: { paymentMethod: "upi", status: "paid", total: data.amount },
          });
        } else {
          toast.error("Payment failed or pending. Please try again.");
          navigate("/cart");
        }
      } catch (err) {
        console.error("Payment callback error:", err);
        toast.error("Error processing payment. Please try again.");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    handlePaymentCallback();
  }, [location, navigate, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Processing payment, please wait...</p>
        </div>
      ) : null}
    </div>
  );
};

export default PaymentCallback;