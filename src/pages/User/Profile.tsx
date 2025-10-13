// src/pages/User/Profile.tsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../../services/api";

interface Shipping {
  shipping_name: string;
  shipping_mobile: string;
  shipping_line1: string;
  shipping_line2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [shipping, setShipping] = useState<Shipping>({
    shipping_name: "",
    shipping_mobile: "",
    shipping_line1: "",
    shipping_line2: "",
    shipping_city: "",
    shipping_state: "",
    shipping_postal_code: "",
    shipping_country: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        const { data } = await api.get("/users/me/shipping");
        setShipping(data);
      } catch (err) {
        console.error("Failed to fetch shipping", err);
      }
    };
    if (user) fetchShipping();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put("/users/me/shipping", shipping);
      toast.success("Shipping info updated successfully");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update shipping info");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {/* User Info */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-900">{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Email:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Role:</span>
            <span className="text-gray-900">{user.role}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm transition"
            >
              {editing ? "Cancel" : shipping.shipping_name ? "Edit Address" : "Add Address"}
            </button>
          </div>

          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <input
                type="text"
                name="shipping_name"
                value={shipping.shipping_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="shipping_mobile"
                value={shipping.shipping_mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="shipping_line1"
                value={shipping.shipping_line1}
                onChange={handleChange}
                placeholder="Address Line 1"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="shipping_line2"
                value={shipping.shipping_line2}
                onChange={handleChange}
                placeholder="Address Line 2"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="shipping_city"
                value={shipping.shipping_city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="shipping_state"
                value={shipping.shipping_state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="shipping_postal_code"
                value={shipping.shipping_postal_code}
                onChange={handleChange}
                placeholder="Postal Code"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="shipping_country"
                value={shipping.shipping_country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="md:col-span-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Address"}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-gray-700 mt-2 space-y-1">
              {shipping.shipping_name ? (
                <>
                  <p>{shipping.shipping_name}</p>
                  <p>{shipping.shipping_mobile}</p>
                  <p>{shipping.shipping_line1}</p>
                  {shipping.shipping_line2 && <p>{shipping.shipping_line2}</p>}
                  <p>
                    {shipping.shipping_city}, {shipping.shipping_state} - {shipping.shipping_postal_code}
                  </p>
                  <p>{shipping.shipping_country}</p>
                </>
              ) : (
                <p className="text-gray-500">No shipping address added yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Legal Links */}
        <p className="text-xs text-gray-500 mt-6">
          By using our platform, you agree to our{" "}
          <Link to="/terms-and-conditions" className="underline">
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="underline">
            Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
};

export default Profile;
