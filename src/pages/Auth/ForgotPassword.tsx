import React, { useState, useEffect } from 'react';
import { authAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimateCard(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await authAPI.sendOtp(email);
      setMessage('OTP sent to your email!');
      localStorage.setItem('resetPasswordEmail', email);
      setTimeout(() => navigate('/verify-otp'), 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-700
          ${animateCard ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      >
        <div className="flex justify-center mb-4 animate-bounce-slow">
          <Mail className="h-12 w-12 text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4 animate-fade-in">
          Forgot Password
        </h2>

        {message && <p className="text-green-600 mb-3 text-center animate-fade-in">{message}</p>}
        {error && <p className="text-red-600 mb-3 text-center animate-shake">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transform transition hover:scale-105 disabled:opacity-50"
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>

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
      </form>
    </div>
  );
};

export default ForgotPassword;
