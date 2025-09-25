// src/pages/User/Profile.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

// TypeScript type for shipping info (matching DB columns)
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

  // Load shipping info from API
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
      alert("Shipping info updated successfully");
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update shipping info");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        {/* Basic Info */}
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

        {/* Shipping Info */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Shipping Address
            </h2>
            <button
              onClick={() => setEditing(!editing)}
              className="text-blue-600 hover:underline text-sm"
            >
              {editing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-3">
            {editing ? (
              <>
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
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <div className="space-y-1 text-gray-700">
                <p>{shipping.shipping_name}</p>
                <p>{shipping.shipping_mobile}</p>
                <p>{shipping.shipping_line1}</p>
                <p>{shipping.shipping_line2}</p>
                <p>
                  {shipping.shipping_city}, {shipping.shipping_state} -{" "}
                  {shipping.shipping_postal_code}
                </p>
                <p>{shipping.shipping_country}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
