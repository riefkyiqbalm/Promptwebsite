"use client";

import styles from "@/app/styles/hmsvr.module.css";

export default function RightSidebar() {
  return (
    <aside className={styles.rightSidebardtl}>
      <div className={styles.sidebarSection}>
        <h3>Advertisement</h3>
        <div className={styles.adBox}>
          <p>Upgrade to Pro for more features</p>
        </div>
      </div>

      <div className={styles.sidebarSection}>
        <div className={styles.adBox}>
          <p>New AI models available now</p>
        </div>
      </div>
      <div className={styles.sidebarSection}>
        <h3>Information</h3>
        <p>
          Welcome to your dashboard. Here you can manage all your content and
          explore new prompts.
        </p>
      </div>
    </aside>
  );
}
