import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Layout/Navbar";
import AdminSidebar from "./components/Layout/AdminSidebar";
import ProtectedRoute from "./components/Common/ProtectedRoute";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyOtp from "./pages/Auth/VerifyOtp";
import ResetPassword from "./pages/Auth/ResetPassword";
import VerifyRegistrationOtp from "./pages/Auth/VerifyRegistrationOtp";

// User Pages
import Home from "./pages/User/Home";
import ProductDetails from "./pages/User/ProductDetails";
import Cart from "./pages/User/Cart";
import Checkout from "./pages/User/Checkout";
import OrderConfirmation from "./pages/User/OrderConfirmation";
import Orders from "./pages/User/Orders";
import Profile from "./pages/User/Profile";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import ProductsManagement from "./pages/Admin/ProductsManagement";
import OrdersManagement from "./pages/Admin/OrdersManagement";
import UsersManagement from "./pages/Admin/UsersManagement";

// Legal / Policy Pages
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import ShippingPolicy from "./pages/Legal/ShippingPolicy";
import RefundPolicy from "./pages/Legal/RefundPolicy";
import TermsAndConditions from "./pages/Legal/TermsAndConditions";
import ContactUs from "./pages/Legal/ContactUs";

// Footer
import Footer from "./components/Layout/Footer";

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />

      {isAdmin ? (
        <div className="flex flex-1 min-h-screen">
          <AdminSidebar />
          <div className="flex-1 p-4 flex flex-col">
            <Routes>
              <Route path="/admin" element={<ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute adminOnly><ProductsManagement /></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute adminOnly><OrdersManagement /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute adminOnly><UsersManagement /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
            {/* Optional: Admin Footer if needed */}
            <Footer />
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/VerifyRegistrationOtp" element={<VerifyRegistrationOtp />} />

              {/* Legal & Policy Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/contact-us" element={<ContactUs />} />

              {/* User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<ProductDetails />} />

              {/* Protected User Routes */}
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/order-confirmation/:orderId" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer always visible at bottom */}
          <Footer />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;