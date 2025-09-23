import React, { useState, useEffect } from 'react';
import { authAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
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

    // Clean and validate OTP
    const cleanOtp = otp.trim().replace(/\s/g, '');
    
    if (!cleanOtp) {
      setError('OTP is required.');
      return;
    }

    if (cleanOtp.length !== 6 || !/^\d+$/.test(cleanOtp)) {
      setError('OTP must be 6 digits.');
      return;
    }

    console.log('Sending to backend - Email:', email, 'OTP:', cleanOtp);

    try {
      await authAPI.verifyOtp(email, cleanOtp);
      setMessage('OTP verified successfully!');
      
      // Keep email in localStorage for the next step
      setTimeout(() => {
        navigate('/reset-password');
      }, 1000);
    } catch (err: any) {
      console.error('API Error:', err);
      
      if (err.response?.status === 400) {
        setError(err.response.data?.message || 'Invalid OTP or email.');
      } else if (err.response?.status === 404) {
        setError('User not found.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem('resetPasswordEmail');
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 font-bold">Verify OTP</h2>
        {message && <p className="text-green-600 mb-2">{message}</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}
        
        {email && (
          <p className="text-gray-600 mb-4">Verifying OTP for: {email}</p>
        )}
        
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />
        
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
        >
          Verify OTP
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

export default VerifyOtp;