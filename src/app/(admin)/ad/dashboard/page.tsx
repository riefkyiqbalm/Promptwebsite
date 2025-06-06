// src/app/admin/page.tsx
import styles from "@/app/styles/admn.module.css"; // Admin-specific styles
import Link from "next/link";

/**
 * Admin Dashboard Page.
 * This is the landing page for the /admin route.
 * It provides a summary or quick links for administrative tasks.
 */
export default function AdminDashboardPage() {
  return (
    <div className={`${styles.adminDashboard} card`}>
      {" "}
      {/* Use card class for consistent styling */}
      <h1 className={styles.title}>Admin Dashboard</h1>
      <p className={styles.description}>
        Welcome to the admin panel. Use the navigation to manage users and view
        system insights.
      </p>
      <div className={styles.dashboardGrid}>
        <Link href="/ad/users" className={`${styles.dashboardCard} card`}>
          <h2>User Management</h2>
          <p>View, add, edit, and delete user accounts.</p>
        </Link>

        <div className={`${styles.dashboardCard} card`}>
          <h2>System Overview</h2>
          <p>Get a summary of application activity and status.</p>
          {/* Placeholder for future charts/data */}
        </div>

        <div className={`${styles.dashboardCard} card`}>
          <h2>Settings</h2>
          <p>Configure application-wide settings.</p>
          {/* Placeholder for settings links */}
        </div>

        {/* Add more dashboard sections as needed */}
      </div>
    </div>
  );
}
