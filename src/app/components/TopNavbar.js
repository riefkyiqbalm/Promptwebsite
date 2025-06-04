"use client";
import { FiSearch, FiUser, FiX } from "react-icons/fi";
import useSearch from "./search";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/styles/hmsvr.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TopNavbar({ contentData }) {
  const {
    searchQuery,
    suggestions,
    showSuggestions,
    isSearching,
    searchResults,
    setSearchQuery,
    handleSearchChange,
    handleSuggestionClick,
    handleKeyDown,
    setShowSuggestions,
  } = useSearch(contentData);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  return (
    <nav className={styles.topNavbar}>
      {isLoggedIn ? (
        <Link href="/dashboard">
          <div className={styles.logo}>
            <img width={200} src={"../../../prmptsite.svg"} alt="Logo" />
          </div>
        </Link>
      ) : (
        <Link href="/">
          <div className={styles.logo}>
            <img width={200} src={"../../../prmptsite.svg"} alt="Logo" />
          </div>
        </Link>
      )}

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
          </div>
        ) : (
          <Link href="/login" className={styles.signupButton}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
