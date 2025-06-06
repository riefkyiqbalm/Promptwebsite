// src/app/admin/layout.tsx
import type { Metadata } from "next";

import styles from "@/app/styles/admn.module.css"; // Admin-specific styles

export const metadata: Metadata = {
  title: "Admin Panel | User Management",
  description: "Admin panel for managing users and application settings.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <main className={styles.adminContent}>
        {/*
          In a real admin panel, you might have a sidebar here:
          <aside className={styles.sidebar}>
            {/* Sidebar links, e.g., nested navigation for users, settings, etc. }
          </aside>
        */}
        {children} {/* This is where the admin page content will be rendered */}
      </main>
    </div>
  );
}
