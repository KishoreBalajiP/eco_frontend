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
  const [animateCard, setAnimateCard] = useState(false); // for animation

  // Load registration data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("pendingRegistration");
    if (stored) {
      const parsed = JSON.parse(stored);
      setEmail(parsed.email);
    } else {
      setError("Registration data missing. Please register again.");
    }
    setAnimateCard(true);
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
      await authAPI.verifyRegistrationOtp(email, otp);

      const stored = JSON.parse(localStorage.getItem("pendingRegistration") || "{}");
      const { name, password } = stored;
      await authAPI.completeRegistration(name, email, password);

      localStorage.removeItem("pendingRegistration");

      setMessage("Registration completed successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 px-4">
      <form
        onSubmit={handleVerify}
        className={`bg-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-700
          ${animateCard ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
      >
        <div className="flex justify-center mb-4 animate-bounce-slow">
          <Package className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 animate-fade-in">
          Verify Your Email
        </h2>

        {message && <p className="text-green-600 mb-3 text-center animate-fade-in">{message}</p>}
        {error && <p className="text-red-600 mb-3 text-center animate-shake">{error}</p>}

        {email && (
          <p className="text-gray-600 text-center mb-4 animate-fade-in">
            OTP sent to: <strong>{email}</strong>
          </p>
        )}

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={6}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2 transform transition hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          type="button"
          onClick={handleGoBack}
          className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transform transition hover:scale-105"
        >
          Go Back
        </button>

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
      </form>
    </div>
  );
};

export default VerifyRegistrationOtp;
