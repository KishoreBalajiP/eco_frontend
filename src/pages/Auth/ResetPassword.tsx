import React, { useState, useEffect } from 'react';
import { authAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Get email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('resetPasswordEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      console.log('Email from localStorage:', storedEmail);
    } else {
      setError('Email not found. Please start the password reset process again.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required. Please go back and try again.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await authAPI.resetPassword(email, password);
      setMessage('Password reset successful! Redirecting to login...');
      
      // Clear localStorage and redirect to login
      setTimeout(() => {
        localStorage.removeItem('resetPasswordEmail');
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleGoBack = () => {
    navigate('/verify-otp');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-bold">Reset Password</h2>
        {message && <p className="text-green-600 mb-2">{message}</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}
        
        {email && (
          <p className="text-gray-600 mb-4">Resetting password for: {email}</p>
        )}
        
        <input
          type="password"
          placeholder="New Password (min. 6 characters)"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
        />
        
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
        >
          Reset Password
        </button>
        
        <button 
          type="button"
          onClick={handleGoBack}
          className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
        >
          Go Back
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;