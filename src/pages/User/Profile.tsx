// src/pages/User/Profile.tsx
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
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
    </div>
  );
};

export default Profile;
