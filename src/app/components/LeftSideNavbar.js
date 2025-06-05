"use client";

import styles from "@/app/styles/snavsvr.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LeftSideNavbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const isLoginIn = true;
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
          <a
            className={styles.navItemadd}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={() => router.push("/dashboard/add")}
          >
            ➕<span className={styles.navTextadd}>Add Icon</span>
          </a>
        ) : null}

        <a
          className={styles.navItem}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => router.push("/engineering")}
        >
          <span className={styles.navIcon}>
            🛠️<span className={styles.navText}>Engineering</span>
          </span>
        </a>

        <a
          className={styles.navItem}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => router.push("/office")}
        >
          <span className={styles.navIcon}>
            📂
            <span className={styles.navText}>Office</span>
          </span>
        </a>

        <a
          className={styles.navItem}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => router.push("/image")}
        >
          <span className={styles.navIcon}>
            🖼️
            <span className={styles.navText}>Image</span>
          </span>
        </a>

        <a
          className={styles.navItem}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => router.push("/films")}
        >
          <span className={styles.navIcon}>
            🎬
            <span className={styles.navText}>Film</span>
          </span>
        </a>

        <a
          className={styles.navItem}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => router.push("/software")}
        >
          <span className={styles.navIcon}>
            👨🏽‍💻
            <span className={styles.navText}>Software</span>
          </span>
        </a>

        <a
          className={styles.navItem}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => router.push("/settings")}
        >
          <span className={styles.navIcon}>
            ⚙️
            <span className={styles.navText}>Settings</span>
          </span>
        </a>

        <a
          className={styles.navItem}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          onClick={() => router.push("/more")}
        >
          <span className={styles.moreButton}>
            <span className={styles.navIcon}>
              ☰<span className={styles.navText}>More</span>
            </span>
          </span>
        </a>
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
