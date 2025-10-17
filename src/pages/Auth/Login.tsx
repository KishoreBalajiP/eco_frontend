import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [showPasswordByEye, setShowPasswordByEye] = useState(false);
  const [showPasswordByCheckbox, setShowPasswordByCheckbox] = useState(false);
  const [animateCard, setAnimateCard] = useState(false); // for fade-in animation

  useEffect(() => {
    if (user) navigate(user.role === 'admin' ? '/admin' : '/');
    setAnimateCard(true); // trigger animation
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordType = () => {
    if (showPasswordByEye) return 'text';
    if (showPasswordByCheckbox) return 'text';
    return 'password';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={`max-w-md w-full space-y-8 bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-700 ease-out
          ${animateCard ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      >
        <div className="flex justify-center animate-bounce-slow">
          <Package className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 animate-fade-in">
          Sign in to JayaStores
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div className="relative group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition duration-300 ease-in-out group-hover:scale-101"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={getPasswordType()}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pr-10 px-3 py-2 border rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition duration-300 ease-in-out"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordByEye(!showPasswordByEye)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 
                    transition transform hover:scale-110 hover:text-blue-600"
                >
                  {showPasswordByEye ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="show-password"
                    type="checkbox"
                    checked={showPasswordByCheckbox}
                    onChange={() => setShowPasswordByCheckbox(!showPasswordByCheckbox)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded transition duration-200"
                  />
                  <label htmlFor="show-password" className="ml-2 text-sm text-gray-600">
                    Show password
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
              text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="text-center">
            <Link to="/register" className="text-blue-600 hover:text-blue-500">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
          }

          .animate-fade-in { animation: fade-in 0.8s ease-out; }
          .animate-shake { animation: shake 0.4s ease-in-out; }
          .animate-bounce-slow { animation: bounce 2s infinite; }
        `}
      </style>
    </div>
  );
};

export default Login;
