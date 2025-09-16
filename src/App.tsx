import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import AdminSidebar from './components/Layout/AdminSidebar';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// User Pages
import Home from './pages/User/Home';
import ProductDetails from './pages/User/ProductDetails';
import Cart from './pages/User/Cart';
import Checkout from './pages/User/Checkout';
import OrderConfirmation from './pages/User/OrderConfirmation';
import Orders from './pages/User/Orders';
import Profile from './pages/User/Profile'; // <-- Import Profile (case matches file)

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import ProductsManagement from './pages/Admin/ProductsManagement';
import OrdersManagement from './pages/Admin/OrdersManagement';
import UsersManagement from './pages/Admin/UsersManagement';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdmin ? (
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute adminOnly>
                  <ProductsManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute adminOnly>
                  <OrdersManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute adminOnly>
                  <UsersManagement />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            {/* Protected User Routes */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/order-confirmation/:orderId" element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile /> {/* <-- Fixed */}
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
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
