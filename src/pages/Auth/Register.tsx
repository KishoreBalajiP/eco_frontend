import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showPasswordByEye, setShowPasswordByEye] = useState(false);
  const [showPasswordByCheckbox, setShowPasswordByCheckbox] = useState(false);
  const isPasswordVisible = showPasswordByEye || showPasswordByCheckbox;

  const [agreed, setAgreed] = useState(false);
  const [animateCard, setAnimateCard] = useState(false); // for animation

  useEffect(() => {
    const pending = localStorage.getItem('pendingRegistration');
    if (user && !pending) {
      navigate(user.role === 'admin' ? '/admin' : '/');
    }
    setAnimateCard(true); // trigger card animation
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!agreed) {
      setError('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      await authAPI.initiateRegistrationOtp(formData.email);
      setMessage('OTP sent to your email. Please verify to complete registration.');
      localStorage.setItem('pendingRegistration', JSON.stringify(formData));
      navigate('/VerifyRegistrationOtp');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          Create your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded animate-shake">{error}</div>}
          {message && <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded animate-fade-in">{message}</div>}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out group-hover:scale-101"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pr-10 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordByEye(!showPasswordByEye)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 transition transform hover:scale-110 hover:text-blue-600"
                >
                  {showPasswordByEye ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="mt-2 flex items-center">
                <input
                  id="show-password"
                  type="checkbox"
                  checked={showPasswordByCheckbox}
                  onChange={() => setShowPasswordByCheckbox(!showPasswordByCheckbox)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded transition duration-200"
                />
                <label htmlFor="show-password" className="ml-2 text-sm text-gray-600">Show password</label>
              </div>
            </div>
          </div>

          <div className="flex items-start mt-2">
            <input
              id="terms"
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded mt-1 transition duration-200"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree to the{' '}
              <a href="/terms-and-conditions" target="_blank" className="underline text-blue-600 hover:text-blue-500 transition">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="/privacy-policy" target="_blank" className="underline text-blue-600 hover:text-blue-500 transition">
                Privacy Policy
              </a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !agreed}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
              text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-transform transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'Sending OTP...' : 'Sign up'}
          </button>

          <div className="text-center">
            <Link to="/login" className="text-blue-600 hover:text-blue-500 transition">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
          @keyframes bounce-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

          .animate-fade-in { animation: fade-in 0.8s ease-out; }
          .animate-shake { animation: shake 0.4s ease-in-out; }
          .animate-bounce-slow { animation: bounce-slow 2s infinite; }
        `}
      </style>
    </div>
  );
};

export default Register;
