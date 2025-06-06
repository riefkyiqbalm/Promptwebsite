"use client";
import { useState } from "react";
import EditProfilePage from "@/app/components/editProfile";
import PaymentGatewayPage from "@/app/components/paymentGate";

const [currentPage, setCurrentPage] =
  (useState < "profile") | ("payment" > "profile");

export default function UploadPict() {
  return (
    <>
      /* Navigation buttons to switch between pages */
      <div className="mb-8 flex space-x-4">
        <button
          onClick={() => setCurrentPage("profile")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300
                             ${
                               currentPage === "profile"
                                 ? "bg-purple-600 text-white shadow-lg"
                                 : "bg-white text-gray-700 hover:bg-gray-200 shadow-md"
                             }`}
        >
          Edit Profile
        </button>
        <button
          onClick={() => setCurrentPage("payment")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300
                             ${
                               currentPage === "payment"
                                 ? "bg-purple-600 text-white shadow-lg"
                                 : "bg-white text-gray-700 hover:bg-gray-200 shadow-md"
                             }`}
        >
          Payment Gateway
        </button>
      </div>
      ;{/* Container for the active page component */}
      <div className="w-full max-w-4xl">
        {/* Conditionally render the selected page component */}
        {currentPage === "profile" && <EditProfilePage />}
        {currentPage === "payment" && <PaymentGatewayPage />}
      </div>
      ;
    </>
  );
}
