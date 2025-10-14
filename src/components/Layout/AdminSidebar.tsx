import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, ShoppingBag, Users, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Navigation - scrollable */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Footer / Logout - always visible */}
      <div className="p-6">
        <button
          onClick={logout}
          className="flex items-center w-full px-6 py-5 text-lg font-semibold text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="mr-4 h-7 w-7" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
