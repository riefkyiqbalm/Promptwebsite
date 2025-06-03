"use client"; // This directive marks the component as a Client Component

import { useEffect, useRef } from "react";
// Import the Datepicker class directly
import Datepicker from "flowbite-datepicker/Datepicker";

/**
 * DatepickerComponent
 *
 * A Next.js client component demonstrating how to programmatically
 * initialize and use the Flowbite Datepicker.
 *
 * It uses a ref to target the input element and initializes the Datepicker
 * instance within a useEffect hook to ensure it runs on the client side
 * after the component has mounted.
 *
 * This component now includes specific styling for the input field
 * and its surrounding elements, as provided by the user.
 */
const DatepickerComponent = () => {
  // Create a ref to attach to the input element
  const datepickerRef = useRef(null);
  // Create a ref to store the Datepicker instance
  const datepickerInstanceRef = useRef(null);

  useEffect(() => {
    // Ensure the ref is attached to an element and we are on the client side
    if (datepickerRef.current && typeof window !== "undefined") {
      // Initialize the Datepicker instance
      // You can pass an options object as the second argument
      datepickerInstanceRef.current = new Datepicker(datepickerRef.current, {
        // Example options (customize as needed):
        format: "yyyy-mm-dd", // Date format
        autohide: true, // Hide the datepicker when a date is selected
        todayBtn: true, // Show a "Today" button
        clearBtn: true, // Show a "Clear" button
        orientation: "bottom", // Position of the datepicker
        // You can add more options here:
        // minDate: new Date(),
        // maxDate: new Date(2025, 11, 31),
        // datesDisabled: ['2023-01-01', '2023-01-02'],
        // ... and many more as per Flowbite Datepicker documentation
      });

      // Optional: Add event listeners if you need to react to date changes
      // datepickerRef.current.addEventListener('changeDate', (event) => {
      //   console.log('Selected date:', event.detail.date);
      //   console.log('Formatted date:', event.detail.datepicker.getFormattedDate());
      // });
    }

    // Cleanup function:
    // When the component unmounts, destroy the datepicker instance if it exists.
    // flowbite-datepicker doesn't have a direct .destroy() method,
    // but setting it to null and allowing garbage collection is usually sufficient
    // if the DOM element itself is removed. If you had custom event listeners,
    // you would remove them here.
    return () => {
      if (datepickerInstanceRef.current) {
        // For flowbite-datepicker, simply nullifying the reference is often enough
        // as its lifecycle is tied to the DOM element.
        datepickerInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount and unmount

  return (
    <div className="flex gap-4 p-4 max-w-sm mx-auto">
      <p className="font-semibold font-mono text-l mb-4">Select a Date</p>
      {/* Applied the provided styling for the datepicker container */}
      <div className="border border-black rounded-lg relative max-w-sm">
        <div className="absolute inset-y-0 start-35 flex items-center ps-3.5 pointer-events-none">
          {/* Calendar icon (example SVG) */}
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          type="text"
          ref={datepickerRef}
          className="h-8 bg-gray-50 border-4 border-white text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Select date"
        />
      </div>
    </div>
  );
};

export default DatepickerComponent;
