// components/Auth/SocialAuth.js
import styles from "../styles/AthSvr.module.css";

import React from "react";

// Main App component that renders the GoogleAuthButton
export default function App() {
  return (
    <div className="min-h-fit flex items-center justify-center bg-gray-100 p-4">
      <GoogleAuthButton />
    </div>
  );
}

// GoogleAuthButton component
function GoogleAuthButton() {
  // Function to handle the click event for the Google button
  const handleGoogleSignIn = () => {
    // In a real Next.js application, you would integrate with a library
    // like NextAuth.js or directly with Firebase/Supabase for Google OAuth.
    // This is a placeholder for the actual authentication logic.
    console.log("Google Sign-In button clicked!");
    alert("Google Sign-In initiated! (This is a placeholder action)");
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center p-3 bg-white text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105 w-12 h-12" /* Adjusted for square icon */
      aria-label="Sign in with Google"
    >
      {/* Google Icon (SVG for better scalability and styling) */}
      <svg
        className="w-6 h-6"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44.5 20H24V28.5H35.25C34.72 31.02 33.07 33.17 30.5 34.5V39.5C34.72 38.02 38.07 34.5 40.5 30.5L44.5 20Z"
          fill="#4285F4"
        />
        <path
          d="M24 44C29.5 44 34.25 42.02 37.75 38.5L30.5 34.5C28.47 35.83 26.02 36.5 24 36.5C19.5 36.5 15.5 33.5 13.5 29.5H8.5V34.5C10.5 38.5 16.5 44 24 44Z"
          fill="#34A853"
        />
        <path
          d="M13.5 29.5C12.5 27.5 12 25.5 12 23.5C12 21.5 12.5 19.5 13.5 17.5V12.5H8.5C6.5 16.5 6 20.5 6 23.5C6 26.5 6.5 30.5 8.5 34.5L13.5 29.5Z"
          fill="#FBBC05"
        />
        <path
          d="M24 11.5C26.5 11.5 28.5 12.5 30.5 14.5L37.75 8.5C34.25 5.02 29.5 3 24 3C16.5 3 10.5 8.5 8.5 12.5L13.5 17.5C15.5 13.5 19.5 11.5 24 11.5Z"
          fill="#EA4335"
        />
      </svg>
      {/* Removed the text "Sign in with Google" */}
    </button>
  );
}
