"use client";

import React, { useState, useRef } from "react";

// Generic Confirmation Modal Component (nested within EditProfilePage for simplicity,
// but could also be in its own file if reused elsewhere)
const ConfirmationModal = ({
  show,
  title,
  message,
  onConfirm,
  onCancel,
  confirmButtonClass = "bg-red-600 hover:bg-red-700",
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full transform transition-all duration-300 scale-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 text-white rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75 ${confirmButtonClass}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default function EditProfilePage() {
  // Dummy user profile data structure
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate developer and lifelong learner.",
    profilePhotoUrl: "https://placehold.co/150x150/a78bfa/ffffff?text=Profile", // Placeholder image
    isAccountTerminated: false,
    isAccountDeleted: false,
  });

  // State for form inputs (controlled components)
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
  });

  // State for messages and modal visibility
  const [message, setMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTerminateModal, setShowTerminateModal] = useState(false);

  // Ref for the hidden file input
  const fileInputRef = useRef(null);

  // Handles changes to text input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simulates photo upload by updating the profile photo URL
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real application, you'd upload this file to a service
      // and get a real URL. Here, we simulate it with a new placeholder.
      const newPhotoUrl = `https://placehold.co/150x150/6b7280/ffffff?text=New+Pic+${Date.now()}`;
      setProfile((prev) => ({ ...prev, profilePhotoUrl: newPhotoUrl }));
      setMessage(
        "Profile photo updated (simulated). Remember to save changes!"
      );
    }
  };

  // Handles saving changes to the profile
  const handleSaveChanges = () => {
    // In a real application, you would send this data to a backend API
    setProfile((prev) => ({ ...prev, ...formData }));
    setMessage("Profile changes saved successfully!");
    console.log("Profile saved:", profile);
  };

  // Handles account termination (simulated)
  const handleTerminateAccount = () => {
    // In a real app, this would involve backend API calls to deactivate/terminate
    setProfile((prev) => ({ ...prev, isAccountTerminated: true }));
    setMessage(
      "Account has been terminated. You will no longer be able to log in."
    );
    setShowTerminateModal(false);
    console.log("Account terminated.");
  };

  // Handles account deletion (simulated)
  const handleDeleteAccount = () => {
    // In a real app, this would involve backend API calls to permanently delete
    setProfile((prev) => ({ ...prev, isAccountDeleted: true }));
    setMessage("Account has been permanently deleted. All data is lost.");
    setShowDeleteModal(false);
    console.log("Account deleted.");
  };

  // If account is deleted or terminated, display a message instead of the form
  if (profile.isAccountDeleted) {
    return (
      <div className="bg-white rounded-xl shadow-2xl p-8 text-center text-red-700 font-bold text-2xl">
        Your account has been permanently deleted.
      </div>
    );
  }

  if (profile.isAccountTerminated) {
    return (
      <div className="bg-white rounded-xl shadow-2xl p-8 text-center text-orange-700 font-bold text-2xl">
        Your account has been terminated.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl mx-auto transform transition-all duration-300 hover:scale-[1.01]">
      <h1 className="text-3xl font-extrabold text-center text-purple-800 mb-8">
        Edit Profile
      </h1>

      {/* Message display area */}
      {message && (
        <div
          className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-md relative mb-6"
          role="alert"
        >
          <span className="block sm:inline">{message}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
            onClick={() => setMessage("")}
          >
            <svg
              className="fill-current h-6 w-6 text-blue-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697L11.819 10l3.029 2.651a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      {/* Profile Photo Section */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={profile.profilePhotoUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-purple-300 shadow-lg mb-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/150x150/a78bfa/ffffff?text=Error";
          }} // Fallback
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoUpload}
          className="hidden"
          accept="image/*"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-5 py-2 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
        >
          Update Photo
        </button>
      </div>

      {/* Profile Information Form */}
      <div className="space-y-6 mb-8">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-200"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-200"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-200"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>
        <button
          onClick={handleSaveChanges}
          className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Save Changes
        </button>
      </div>

      {/* Account Management Section */}
      <div className="border-t border-gray-200 pt-8 mt-8 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Account Management
        </h2>
        <p className="text-gray-600">
          These actions are irreversible. Please proceed with caution.
        </p>

        {/* Terminate Account */}
        <button
          onClick={() => setShowTerminateModal(true)}
          className="w-full px-6 py-3 bg-orange-600 text-white font-bold rounded-lg shadow-md hover:bg-orange-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75"
        >
          Terminate Account
        </button>

        {/* Delete Account */}
        <button
          onClick={() => setShowDeleteModal(true)}
          className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        >
          Delete Account
        </button>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        show={showDeleteModal}
        title="Confirm Account Deletion"
        message="Are you absolutely sure you want to delete your account? This action is permanent and cannot be undone."
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteModal(false)}
      />
      <ConfirmationModal
        show={showTerminateModal}
        title="Confirm Account Termination"
        message="Are you sure you want to terminate your account? This will deactivate your account and prevent future logins, but your data may be retained for a period."
        onConfirm={handleTerminateAccount}
        onCancel={() => setShowTerminateModal(false)}
        confirmButtonClass="bg-orange-600 hover:bg-orange-700"
      />
    </div>
  );
}
