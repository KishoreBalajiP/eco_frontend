// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType } from '../types';
import { authAPI } from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser && savedUser !== "undefined") {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user:", err);
        localStorage.removeItem('user'); // clean corrupted value
      }
    }
    setLoading(false);
  }, []);

  // ---------------- LOGIN ----------------
  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unable to sign in. Please try again.';
      throw new Error(message);
    }
  };

  // ---------------- OTP-BASED REGISTRATION ----------------
  const register = async (name: string, email: string, password: string) => {
    try {
      // initiate OTP
      const response = await authAPI.initiateRegistrationOtp(email);

      // Save temp registration data for complete step
      localStorage.setItem('registrationName', name);
      localStorage.setItem('registrationEmail', email);
      localStorage.setItem('registrationPassword', password);

      return response; // { success: boolean; message: string }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unable to create account. Please try again.';
      throw new Error(message);
    }
  };

  const completeRegistration = async () => {
    try {
      const name = localStorage.getItem('registrationName') || '';
      const email = localStorage.getItem('registrationEmail') || '';
      const password = localStorage.getItem('registrationPassword') || '';

      if (!name || !email || !password) {
        throw new Error('Registration data missing. Please start again.');
      }

      const response = await authAPI.completeRegistration(name, email, password);
      const { token, user } = response;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);

      // Cleanup temporary registration data
      localStorage.removeItem('registrationName');
      localStorage.removeItem('registrationEmail');
      localStorage.removeItem('registrationPassword');

      return { success: true, user };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Unable to complete registration. Please try again.';
      throw new Error(message);
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    completeRegistration,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
