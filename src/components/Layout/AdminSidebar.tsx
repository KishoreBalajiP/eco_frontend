import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Package, ShoppingBag, Users, BarChart3, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
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
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <div className="p-6">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>

          <nav className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <button
            onClick={logout}
            className="flex items-center w-full px-6 py-4 text-base text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="mr-4 h-6 w-6" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 min-h-screen bg-gray-50 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;