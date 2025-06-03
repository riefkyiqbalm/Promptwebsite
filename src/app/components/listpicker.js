"use client"; // This component must be a Client Component

import { useState } from "react";

const CombinedListPicker = ({ items }) => {
  // State to keep track of the currently selected item in the UI
  const [selectedItem, setSelectedItem] = useState(null);
  // State to manage loading status during the API call
  const [isLoading, setIsLoading] = useState(false);
  // State to store any error messages from the API call
  const [error, setError] = useState(null);
  // State to store the server response message
  const [serverMessage, setServerMessage] = useState(null);

  /**
   * handleItemClick
   * This function is executed when an item in the list is clicked.
   * It updates the local UI state and then makes a POST request
   * to the /api/select-item API route.
   *
   * @param {string} item The item selected by the user.
   */
  const handleItemClick = async (item) => {
    // Update the UI to show the selected item immediately
    setSelectedItem(item);
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors
    setServerMessage(null); // Clear previous messages

    try {
      // Make the POST request to the /api/select-item route.
      // Use a relative path for client-side fetches if the API is on the same domain.
      const response = await fetch("api/select", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedItem: item }),
      });

      const result = await response.json();

      if (!response.ok) {
        // If the API response indicates an error (e.g., 4xx, 5xx status)
        throw new Error(
          result.message || "Failed to process selection on server."
        );
      }

      // Set the success message from the server
      setServerMessage(result.message);
      console.log("API Route Result:", result);

      // Optionally, you could provide more detailed feedback based on result.details
      if (result?.details?.details) {
        // Using alert for demonstration, consider a more user-friendly notification system
        alert(
          `Server responded: ${result.message}\nDetails: ${result.details.details}`
        );
      } else {
        alert(`Server responded: ${result.message}`);
      }
    } catch (err) {
      console.error("Error calling /api/selectitems:", err);
      setError(err.message || "An unknown error occurred.");
      alert(`Error: ${err.message || "An unknown error occurred."}`); // Provide user feedback
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Select an Item
      </h2>
      <ul className="border border-gray-200 rounded-md overflow-hidden">
        {/* Map over the `items` prop to render each list item */}
        {items.map((item, index) => (
          <li
            key={index} // Using index as key for simplicity; a unique ID is preferred for stable lists
            className={`
              p-3 cursor-pointer transition-colors duration-200
              ${
                selectedItem === item
                  ? "bg-blue-500 text-white" // Styling for the selected item
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700" // Styling for unselected items
              }
              ${index < items.length - 1 ? "border-b border-gray-200" : ""}
            `}
            onClick={() => handleItemClick(item)} // Handle click event
            tabIndex={0} // Make list items focusable for keyboard navigation
            onKeyDown={(e) => {
              // Handle keyboard events for accessibility
              if (e.key === "Enter" || e.key === " ") {
                handleItemClick(item);
              }
            }}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Display feedback based on loading, error, or success */}
      {isLoading && (
        <p className="mt-4 text-blue-600">Processing selection...</p>
      )}
      {error && <p className="mt-4 text-red-600">Error: {error}</p>}
      {!isLoading && !error && selectedItem && (
        <>
          <p className="mt-4 text-gray-700">
            Selected:{" "}
            <span className="font-medium text-blue-600">{selectedItem}</span>
          </p>
          {serverMessage && (
            <p className="mt-2 text-green-600 text-sm">
              Server: {serverMessage}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CombinedListPicker;
