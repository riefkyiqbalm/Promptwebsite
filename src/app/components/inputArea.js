"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";

// This component provides an auto-resizing textarea with customizable padding.
const Input = ({
  placeholder = "Type something...",
  className = "",

  rows = NumberConsturctor,
}) => {
  // State to hold the current value of the textarea
  const [value, setValue] = useState("");
  // Ref to directly access the textarea DOM element
  const textareaRef = useRef(null);

  // Function to adjust the height of the textarea based on its scrollHeight
  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      // Reset height to 'auto' to correctly calculate scrollHeight
      textareaRef.current.style.height = "auto";
      // Set the height to the scrollHeight, ensuring it fits the content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  // Effect to adjust height initially and whenever the value changes
  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]); // Re-run when value or adjustHeight (memoized) changes

  // Handle input changes and trigger height adjustment
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="w-full max-w-5xl bg-white border border-black rounded-lg shadow-md flex items-center justify-center">
      <textarea
        id="auto-input"
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        // Tailwind CSS classes for styling:
        // w-full: Takes full width of its parent
        // p-4: Adds padding on all sides (this addresses your left indent issue,
        //      you can adjust this to `pl-4` if you only want left padding)
        // border: Adds a border
        // border-gray-300: Border color
        // rounded-md: Rounded corners
        // shadow-sm: Small shadow
        // focus:ring-2 focus:ring-blue-500 focus:border-blue-500: Focus styles
        // resize-none: Prevents manual resizing by the user
        // overflow-hidden: Hides the scrollbar, as height is managed dynamically
        // min-h-[40px]: Sets a minimum height for the textarea (e.g., one row)
        // text-gray-800: Text color
        // font-inter: Uses the Inter font
        className={`w-full border-white border-8 rounded-md shadow-sm
                   overflow-hidden min-h-[40px] text-gray-800 font-mono font-bold
                    ${className}`} // Allows external classes to be passed
        rows={rows} // Start with 1 row, height will adjust dynamically
      />
    </div>
  );
};

export default Input;
