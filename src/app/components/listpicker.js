"use client"; // This component must be a Client Component

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const CombinedListPicker = ({ property, label }) => {
  // State to keep track of the currently selected item in the UI
  const [selectedItem, setSelectedItem] = useState(""); // Initialize with empty string for select
  // State to manage loading status during the API call
  // const [isLoading, setIsLoading] = useState(false);
  // State to store any error messages from the API call
  // const [error, setError] = useState(null);
  // State to store the server response message (not used in the provided render, but kept for context)
  // const [serverMessage, setServerMessage] = useState(null);
  // State for the custom message box (not used in the provided render, but kept for context)
  // const [messageBox, setMessageBox] = useState({
  //   visible: false,
  //   message: "",
  //   type: "",
  // });

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  /**
   * @param {Event} event The change event from the select element.
   */
  const selectitem = (event) => {
    const item = event.target.value;
    // Don't process if the placeholder option is selected or if an API call is in progress
    if (!item) {
      setSelectedItem(""); // Reset selectedItem state if placeholder is chosen
      return;
    }
    // Update the UI to show the selected item immediately
    setSelectedItem(item);
  };
  // const LoadingSpinner = () => (
  //   <p className="mt-4 text-center text-blue-600 flex items-center justify-center">
  //     <svg
  //       className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //     >
  //       <circle
  //         className="opacity-25"
  //         cx="12"
  //         cy="12"
  //         r="10"
  //         stroke="currentColor"
  //         strokeWidth="4"
  //       ></circle>
  //       <path
  //         className="opacity-75"
  //         fill="currentColor"
  //         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  //       ></path>
  //     </svg>
  //     Processing selection...
  //   </p>
  // );

  return (
    <div className=" block gap-20 mt-4">
      <label className="text-xl font-medium text-gray-800 font-mono ">
        {label}
      </label>
      {/*Selection */}
      <div className="p-4 mx-auto bg-white rounded-lg font-mono">
        <div className="w-30 relative items-center justify-center">
          <select
            value={selectedItem || ""} // Control the select's value with state
            onChange={selectitem}
            className="w-32 px-8 py-2 pr-8 rounded-md border-8 border-white bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-white appearance-none cursor-pointer"
          >
            <option value="field" disabled>
              Select
            </option>
            {property.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {/* Custom arrow for select dropdown */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {/* Display feedback based on loading, error */}
        {/* {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="mt-4 text-red-600 text-center">Error: {error}</p>
        ) : null} */}
      </div>
    </div>
  );
};

export default CombinedListPicker;
