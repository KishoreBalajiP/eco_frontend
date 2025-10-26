import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Layout/Navbar";
import AdminSidebar from "./components/Layout/AdminSidebar";
import ProtectedRoute from "./components/Common/ProtectedRoute";

// Added import for animations
import { AnimatePresence, motion } from "framer-motion";

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
import PaymentCallback from "./pages/User/PaymentCallback"; // <-- NEW

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
  const location = useLocation(); // Added for AnimatePresence

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

            {/* Animation wrapper added here */}
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <motion.div
                        key="admin-dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Dashboard />
                      </motion.div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute adminOnly>
                      <motion.div
                        key="admin-products"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductsManagement />
                      </motion.div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute adminOnly>
                      <motion.div
                        key="admin-orders"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <OrdersManagement />
                      </motion.div>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute adminOnly>
                      <motion.div
                        key="admin-users"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <UsersManagement />
                      </motion.div>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </AnimatePresence>

            {/* Optional: Admin Footer if needed */}
            <Footer />
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="flex-1 flex flex-col">

            {/* Animation wrapper for user routes */}
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/login" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Login /></motion.div>} />
                <Route path="/register" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Register /></motion.div>} />
                <Route path="/forgot-password" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ForgotPassword /></motion.div>} />
                <Route path="/verify-otp" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><VerifyOtp /></motion.div>} />
                <Route path="/reset-password" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ResetPassword /></motion.div>} />
                <Route path="/VerifyRegistrationOtp" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><VerifyRegistrationOtp /></motion.div>} />

                {/* Legal & Policy Pages */}
                <Route path="/privacy-policy" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><PrivacyPolicy /></motion.div>} />
                <Route path="/shipping-policy" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ShippingPolicy /></motion.div>} />
                <Route path="/refund-policy" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><RefundPolicy /></motion.div>} />
                <Route path="/terms-and-conditions" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><TermsAndConditions /></motion.div>} />
                <Route path="/contact-us" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ContactUs /></motion.div>} />

                {/* User Routes */}
                <Route path="/" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Home /></motion.div>} />
                <Route path="/products/:id" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProductDetails /></motion.div>} />

                {/* Protected User Routes */}
                <Route path="/cart" element={<ProtectedRoute><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Cart /></motion.div></ProtectedRoute>} />
                <Route path="/checkout" element={<ProtectedRoute><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Checkout /></motion.div></ProtectedRoute>} />
                <Route path="/order-confirmation/:orderId" element={<ProtectedRoute><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><OrderConfirmation /></motion.div></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Orders /></motion.div></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Profile /></motion.div></ProtectedRoute>} />

                {/* NEW: Payment Callback */}
                <Route
                  path="/payment-callback"
                  element={
                    <ProtectedRoute>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <PaymentCallback />
                      </motion.div>
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
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
