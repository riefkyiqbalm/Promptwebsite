// src/app/components/user-list/UserList.jsx
"use client"; // This is a client component

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For navigation after actions
import { useAlert } from "@/app/components/hooksAlert"; // Alert system hook
import { deleteUser } from "@/app/lib/utils"; // Mock API utility for deletion
import styles from "@/app/styles/usersList.module.css";

/**
 * @typedef {import('../../lib/types').User} User
 */

/**
 * UserList component displays a list of users and handles delete operations.
 * @param {Object} props
 * @param {User[]} props.initialUsers - The initial list of users fetched from the server.
 */
export default function UserList({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showAlert } = useAlert();

  /**
   * Handles the deletion of a user.
   * @param {string} userId - The ID of the user to delete.
   */
  const handleDelete = useCallback(
    async (userId) => {
      if (!window.confirm("Are you sure you want to delete this user?")) {
        return;
      }

      setLoading(true);
      try {
        const success = await deleteUser(userId);
        if (success) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
          showAlert("success", "User deleted successfully!");
        } else {
          showAlert("error", "Failed to delete user.");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        showAlert("error", "An error occurred while deleting the user.");
      } finally {
        setLoading(false);
      }
    },
    [showAlert]
  );

  if (users.length === 0 && !loading) {
    return (
      <div className={styles.noUsers}>
        <p>No users found. Start by adding a new user!</p>
      </div>
    );
  }

  // src/app/components/user-list/UserList.jsx (UPDATED PART)
  // ... (imports and useState/useCallback definitions)

  return (
    <div className={`${styles.userListContainer} card`}>
      {loading && <div className={styles.loadingOverlay}>Deleting...</div>}
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* Ensure no newlines or extra spaces directly between <tr> and <td> */}
              <td data-label="Name">{user.name}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Role">{user.role}</td>
              <td data-label="Actions">
                <div className={styles.actions}>
                  <Link
                    href={`/ad/users/${user.id}`}
                    className={`${styles.actionButton} ${styles.editButton}`}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
