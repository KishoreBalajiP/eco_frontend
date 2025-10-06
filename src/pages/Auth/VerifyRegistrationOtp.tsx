// src/pages/Auth/VerifyRegistrationOtp.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import { Package } from "lucide-react";

const VerifyRegistrationOtp: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load registration data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("pendingRegistration");
    if (stored) {
      const parsed = JSON.parse(stored);
      setEmail(parsed.email);
    } else {
      setError("Registration data missing. Please register again.");
    }
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Verify OTP
      await authAPI.verifyRegistrationOtp(email, otp);

      // Step 2: Complete registration
      const stored = JSON.parse(localStorage.getItem("pendingRegistration") || "{}");
      const { name, password } = stored;
      await authAPI.completeRegistration(name, email, password);

      // Step 3: Clear pending registration
      localStorage.removeItem("pendingRegistration");

      // Step 4: Show success message and redirect to login
      setMessage("Registration completed successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    localStorage.removeItem("pendingRegistration");
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <div className="flex justify-center mb-4">
          <Package className="h-10 w-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Verify Your Email
        </h2>

        {message && <p className="text-green-600 mb-3 text-center">{message}</p>}
        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

        {email && (
          <p className="text-gray-600 text-center mb-4">
            OTP sent to: <strong>{email}</strong>
          </p>
        )}

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-center"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
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

export default VerifyRegistrationOtp;
