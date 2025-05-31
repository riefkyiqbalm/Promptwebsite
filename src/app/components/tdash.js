"use client";
import { FiSearch, FiUser, FiX } from "react-icons/fi";
import useSearch from "./search";
import { useEffect, useRef } from "react";
import styles from "@/app/styles/hmsvr.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TopNavbar({ onSearch }) {
  const {
    searchQuery,
    suggestions,
    showSuggestions,
    isSearching,

    setSearchQuery,
    handleSearchChange,
    handleSuggestionClick,
    handleKeyDown,
    setShowSuggestions,
    searchResults,
  } = useSearch("");

  const searchRef = useRef(null);
  const isLoggedIn = true;
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Notify parent component when search results change
  useEffect(() => {
    if (onSearch) {
      onSearch(searchResults);
    }
  }, [searchResults]);

  const router = useRouter();
  // const isLogg = true;
  return (
    <nav className={styles.topNavbar}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        <img width={200} src={"../../../prmptsite.svg"}></img>
      </div>

      <div className={styles.searchContainer} ref={searchRef}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search content, prompts, engines..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
          />
          {searchQuery && (
            <button
              className={styles.clearSearch}
              onClick={() => {
                setSearchQuery("");
                setShowSuggestions(false);
              }}
            >
              <FiX />
            </button>
          )}
        </div>

        {showSuggestions && (
          <div className={styles.suggestionsDropdown}>
            {isSearching ? (
              <div className={styles.suggestionItemLoading}>Searching...</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={styles.suggestionItem}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))
            ) : searchQuery ? (
              <div className={styles.suggestionItemNoResults}>
                No suggestions found for "{searchQuery}"
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className={styles.authSection}>
        {isLoggedIn ? (
          <div className={styles.userAvatar}>
            <FiUser />
            <img src="public/Logo.svg"></img>
          </div>
        ) : (
          <Link href="/login">
            <button
              className={styles.signupButton}
              // onClick={() => router.push("/login")}
            >
              Logout
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
