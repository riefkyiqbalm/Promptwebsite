import { useState, useEffect } from "react";

export default function useSearch(contentData) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(contentData);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchResults(contentData);
        setSuggestions([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      // Generate suggestions based on content
      const contentSuggestions = [
        ...new Set(
          contentData
            .flatMap((item) => [
              item.Title,
              item.Description,
              item.engine,
              item.id.charAt(0).toUpperCase() + item.id.slice(1),
            ])
            .filter((text) =>
              text.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ),
      ].slice(0, 5);

      setSuggestions(contentSuggestions);

      // Filter results
      const results = contentData.filter(
        (item) =>
          item.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.Prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.engine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchQuery, contentData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
      e.target.blur();
    }
  };

  return {
    searchQuery,
    searchResults,
    suggestions,
    showSuggestions,
    isSearching,
    searchResults,
    handleSearchChange,
    handleSuggestionClick,
    handleKeyDown,
    setShowSuggestions,
    setSearchQuery,
  };
}
