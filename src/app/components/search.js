import { useState, useEffect, useMemo } from "react";

export default function useSearch(contentData) {
  const initialContentArray = useMemo(() => {
    return Array.isArray(contentData)
      ? contentData
      : typeof contentData === "object" && contentData !== null
      ? (console.warn("obj to arr"), Object.values(contentData))
      : (console.error("!obj || arr", contentData), []);
  }, [contentData]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(initialContentArray[1]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const currentContent = initialContentArray[1];
      if (searchQuery.trim() === "") {
        setSearchResults(currentContent);
        setSuggestions([]);
        setIsSearching(false);
        console.log("Search Query Empty: Suggestions cleared.");
        return;
      }
      setIsSearching(true);
      console.log("Debounced Search Query:", searchQuery);
      const contentSuggestions = [
        ...new Set(
          currentContent
            .flatMap((item) => [item.title, item.Description, item.engine])
            .filter(
              (text) =>
                text &&
                typeof text === "string" &&
                text.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ),
      ].slice(0, 10);

      console.log("Generated Suggestions:", contentSuggestions);
      setSuggestions(contentSuggestions);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchQuery, initialContentArray]);

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    setShowSuggestions(true);
    console.log(
      "handleSearchChange called. New Query:",
      newValue,
      "Show Suggestions:",
      true
    ); // Debug log
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    console.log(
      "Suggestion clicked. Query:",
      suggestion,
      "Show Suggestions:",
      false
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      e.target.blur();
      console.log("Enter key pressed. Show Suggestions:", false);
    }
  };

  return {
    searchQuery,
    searchResults,
    suggestions,
    showSuggestions,
    isSearching,
    handleSearchChange,
    handleSuggestionClick,
    handleKeyDown,
    setShowSuggestions,
    setSearchQuery,
  };
}
