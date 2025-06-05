"use client";
import { useState } from "react";
import styles from "@/app/styles/snavsvr.module.css";
import { useRouter } from "next/navigation";

export default function ExpandableSideNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLoginIn = useState(false);

  // Navigation items with HTML symbols

  const navItems = [
    { name: "Office", icon: "📂" },
    { name: "Engineering", icon: "🛠️" },
    { name: "Image", icon: "🖼️" },
    { name: "Film", icon: "🎬" },
    { name: "Settings", icon: "⚙️" },
    { name: "", icon: "☰", className: styles.moreButton },
  ];
  const navItemsPlusAdd = [
    { name: "Add Prompt", icon: "➕" },
    { name: "Office", icon: "📂" },
    { name: "Engineering", icon: "🛠️" },
    { name: "Image", icon: "🖼️" },
    { name: "Films", icon: "🎬" },
    { name: "Settings", icon: "⚙️" },
    { name: "", icon: "☰", className: styles.moreButton },
  ];

  const router = useRouter();

  const handleNavigation = (item) => {
    // Convert first letter to lowercase
    const lowerCaseName =
      item.name.charAt(0).toLowerCase() + item.name.slice(1);

    if (!isLoginIn) {
      router.push(`/${lowerCaseName}`);
      return;
    }

    if (item.name === "Add Prompt") {
      router.push("/dashboard/add");
    } else {
      router.push(`/dashboard/${lowerCaseName}`);
    }
  };

  return (
    <div className={`${styles.sideNav} ${isExpanded ? styles.expanded : ""}`}>
      <button
        className={styles.expandButton}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {isExpanded ? "" : ""}
      </button>
      <nav className={styles.navContent}>
        {isLoginIn ? (
          <>
            {navItems.map((item) => (
              <a
                key={item.name}
                className={styles.navItem}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                onClick={() => handleNavigation(item)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {isExpanded && (
                  <span className={styles.navText}>{item.name}</span>
                )}
              </a>
            ))}
          </>
        ) : (
          <>
            {navItemsPlusAdd.map((item) => (
              <a
                key={item.name}
                className={styles.navItem}
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                onClick={() => handleNavigation(item)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                {isExpanded && (
                  <span className={styles.navText}>{item.name}</span>
                )}
              </a>
            ))}
          </>
        )}
      </nav>

      <button
        className={styles.expandButtonBottom}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {isExpanded ? "" : ""}
      </button>
    </div>
  );
}
