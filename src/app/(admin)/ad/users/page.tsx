// src/app/admin/users/page.tsx
import { fetchAllUsers } from "@/app/lib/utils"; // Import the mock API utility
import { User } from "@/app/lib/types"; // Import the User type
import UserList from "@/app/components/userLists"; // Client-side JS component
import styles from "@/app/styles/users.module.css"; // Page-specific styles
import Link from "next/link";

// Using server component for initial data fetch (SSR)
export default async function AdminUsersPage() {
  let users: User[] = [];
  let error: string | null = null;

  try {
    users = await fetchAllUsers(); // Fetch users on the server
  } catch (err) {
    console.error("Failed to fetch users:", err);
    error = "Failed to load users. Please try again.";
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>User Management</h1>
        <Link href="/ad/users/newuser" className={`${styles.addButton} button`}>
          Add New User
        </Link>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      {/* Render the client-side UserList component */}
      <UserList initialUsers={users} />
    </div>
  );
}
