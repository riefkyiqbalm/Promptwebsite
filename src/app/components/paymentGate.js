// components/PaymentGatewayPage.js
// This is a Client Component because it uses useState.
"use client";

import React, { useState } from "react";

export default function PaymentGatewayPage() {
  const [sellPromptDetails, setSellPromptDetails] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [buyPromptSearch, setBuyPromptSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showQrisModal, setShowQrisModal] = useState(false); // State for QRIS modal
  const [selectedPromptForPayment, setSelectedPromptForPayment] =
    useState(null); // To store which prompt is being paid for

  // Dummy list of prompts for buying
  const dummyPrompts = [
    { id: 1, name: "Creative Story Idea", price: 5.99, seller: "Alice" },
    { id: 2, name: "Marketing Campaign Slogan", price: 12.5, seller: "Bob" },
    { id: 3, name: "Python Code Snippet", price: 8.0, seller: "Charlie" },
    { id: 4, name: "Fantasy World Lore", price: 20.0, seller: "Eve" },
  ];

  // Filtered prompts based on search query
  const filteredPrompts = dummyPrompts.filter(
    (prompt) =>
      prompt.name.toLowerCase().includes(buyPromptSearch.toLowerCase()) ||
      prompt.seller.toLowerCase().includes(buyPromptSearch.toLowerCase())
  );

  // Handles input changes for selling prompt form
  const handleSellInputChange = (e) => {
    const { name, value } = e.target;
    setSellPromptDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Simulates selling a prompt
  const handleSellPrompt = () => {
    if (
      !sellPromptDetails.name ||
      !sellPromptDetails.description ||
      !sellPromptDetails.price
    ) {
      setMessage("Please fill in all fields to sell your prompt.");
      return;
    }
    if (
      isNaN(sellPromptDetails.price) ||
      parseFloat(sellPromptDetails.price) <= 0
    ) {
      setMessage("Price must be a positive number.");
      return;
    }
    setMessage(
      `Prompt "${sellPromptDetails.name}" listed for $${parseFloat(
        sellPromptDetails.price
      ).toFixed(2)}! (Simulated)`
    );
    console.log("Selling prompt:", sellPromptDetails);
    setSellPromptDetails({ name: "", description: "", price: "" }); // Clear form
  };

  // Initiates the buying process, setting the selected prompt and potentially opening a modal
  const handleBuyPrompt = (prompt) => {
    setSelectedPromptForPayment(prompt);
    // For demonstration, we'll open a modal or show payment options
    setMessage(
      `Choose a payment method for "${prompt.name}" ($${prompt.price.toFixed(
        2
      )}).`
    );
  };

  // Simulates QRIS payment
  const handleQrisPayment = () => {
    if (!selectedPromptForPayment) {
      setMessage("No prompt selected for QRIS payment.");
      return;
    }
    setMessage(
      `Initiating QRIS payment for "${
        selectedPromptForPayment.name
      }" ($${selectedPromptForPayment.price.toFixed(
        2
      )}). Scan the QR code! (Simulated)`
    );
    setShowQrisModal(true);
    console.log("QRIS payment initiated for:", selectedPromptForPayment);
    // In a real app, this would generate and display a QR code
  };

  // Simulates PayPal payment
  const handlePaypalPayment = () => {
    if (!selectedPromptForPayment) {
      setMessage("No prompt selected for PayPal payment.");
      return;
    }
    setMessage(
      `Redirecting to PayPal for "${
        selectedPromptForPayment.name
      }" ($${selectedPromptForPayment.price.toFixed(2)}). (Simulated)`
    );
    console.log("PayPal payment initiated for:", selectedPromptForPayment);
    // In a real app, this would redirect to PayPal's payment gateway
    setSelectedPromptForPayment(null); // Clear selected prompt after "payment"
  };

  // QRIS Modal Component
  const QrisModal = ({ show, prompt, onClose }) => {
    if (!show || !prompt) return null;

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Scan for QRIS Payment
          </h3>
          <p className="text-gray-600 mb-4">
            Pay for <span className="font-semibold">"{prompt.name}"</span> for{" "}
            <span className="font-bold text-purple-700">
              ${prompt.price.toFixed(2)}
            </span>
          </p>
          {/* Dummy QR Code Image */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=QRIS_PAYMENT_FOR_${prompt.id}_${prompt.price}`}
            alt="QRIS QR Code"
            className="mx-auto my-6 border border-gray-300 rounded-lg p-2"
          />
          <p className="text-sm text-gray-500 mb-6">
            Open your mobile banking or e-wallet app and scan this QR code.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            Done / Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-purple-800 mb-8">
        Prompt Marketplace
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sell Prompt Section */}
        <div className="bg-purple-50 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">
            Sell Your Prompt
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="sell-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Prompt Name
              </label>
              <input
                type="text"
                id="sell-name"
                name="name"
                value={sellPromptDetails.name}
                onChange={handleSellInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="e.g., Sci-Fi Story Outline"
              />
            </div>
            <div>
              <label
                htmlFor="sell-description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="sell-description"
                name="description"
                value={sellPromptDetails.description}
                onChange={handleSellInputChange}
                rows="3"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="A detailed description of your prompt..."
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="sell-price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price ($)
              </label>
              <input
                type="number"
                id="sell-price"
                name="price"
                value={sellPromptDetails.price}
                onChange={handleSellInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="e.g., 9.99"
                step="0.01"
              />
            </div>
            <button
              onClick={handleSellPrompt}
              className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
              List Prompt for Sale
            </button>
          </div>
        </div>

        {/* Buy Prompt Section */}
        <div className="bg-blue-50 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Buy Prompts</h2>
          <div className="mb-4">
            <label htmlFor="buy-search" className="sr-only">
              Search Prompts
            </label>
            <input
              type="text"
              id="buy-search"
              value={buyPromptSearch}
              onChange={(e) => setBuyPromptSearch(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search for prompts..."
            />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {filteredPrompts.length > 0 ? (
              filteredPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between border border-gray-200 hover:shadow-lg transition duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {prompt.name}
                    </h3>
                    <p className="text-sm text-gray-600">By {prompt.seller}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <span className="text-lg font-bold text-purple-700">
                      ${prompt.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleBuyPrompt(prompt)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No prompts found. Try a different search!
              </p>
            )}
          </div>

          {/* Payment Options Section */}
          {selectedPromptForPayment && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Payment Options for "{selectedPromptForPayment.name}"
              </h3>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleQrisPayment}
                  className="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                  Pay with QRIS
                </button>
                <button
                  onClick={handlePaypalPayment}
                  className="w-full px-6 py-3 bg-indigo-500 text-white font-bold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
                >
                  Pay with PayPal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QRIS Modal */}
      <QrisModal
        show={showQrisModal}
        prompt={selectedPromptForPayment}
        onClose={() => {
          setShowQrisModal(false);
          setSelectedPromptForPayment(null); // Clear selected prompt after closing QRIS modal
          setMessage(
            `Successfully purchased "${
              selectedPromptForPayment.name
            }" for $${selectedPromptForPayment.price.toFixed(
              2
            )}! (Simulated via QRIS)`
          );
        }}
      />
    </div>
  );
}
