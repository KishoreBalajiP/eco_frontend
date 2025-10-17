import React, { useState, useEffect } from 'react';
import { authAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('resetPasswordEmail');
    if (storedEmail) setEmail(storedEmail);
    else setError('Email not found. Please start the password reset process again.');

    setAnimateCard(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) return setError('Email is required.');

    if (password !== confirmPassword) return setError('Passwords do not match.');
    if (password.length < 6) return setError('Password must be at least 6 characters long.');

    setLoading(true);
    try {
      await authAPI.resetPassword(email, password);
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        localStorage.removeItem('resetPasswordEmail');
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-700
          ${animateCard ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      >
        <div className="flex justify-center mb-4 animate-bounce-slow">
          <Lock className="h-12 w-12 text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4 animate-fade-in">
          Reset Password
        </h2>

        {message && <p className="text-green-600 mb-3 text-center animate-fade-in">{message}</p>}
        {error && <p className="text-red-600 mb-3 text-center animate-shake">{error}</p>}

        {email && (
          <p className="text-gray-600 text-center mb-4 animate-fade-in">
            Resetting password for: <strong>{email}</strong>
          </p>
        )}

        <input
          type="password"
          placeholder="New Password (min. 6 characters)"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2 transform transition hover:scale-105 disabled:opacity-50"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        <button
          type="button"
          onClick={handleGoBack}
          className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transform transition hover:scale-105"
        >
          Go Back
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

export default ResetPassword;
