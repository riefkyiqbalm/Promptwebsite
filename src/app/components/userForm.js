// src/app/components/user-form/UserForm.jsx
"use client"; // This is a client component

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/app/components/hooksAlert";
import { createUser, updateUser } from "@/app/lib/utils";
import styles from "@/app/styles/usrform.module.css";

/**
 * @typedef {import('../lib/types').User} User
 */
/**
 * @typedef {import('../../lib/types').User} UserType // Renamed to avoid conflict with `User`
 */
/**
 /**
 * UserForm component for creating and updating user details.
 * @param {Object} props
 * @param {UserType | null} [props.initialUser] - The user object to pre-fill the form for editing. Null for new user.
 * @param {boolean} [props.isNewUser=false] - True if this form is for creating a new user.
 */
export default function UserForm({ initialUser, isNewUser = false }) {
  // Removed onCreate, onUpdate from props
  const [name, setName] = useState(initialUser?.name || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [role, setRole] = useState(initialUser?.role || "user");
  const [password, setPassword] = useState(""); // Only for new user or password change
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showAlert } = useAlert();

  // Reset form when initialUser changes (e.g., navigating from edit to new user)
  useEffect(() => {
    if (initialUser) {
      setName(initialUser.name);
      setEmail(initialUser.email);
      setRole(initialUser.role);
      setPassword(""); // Always clear password on edit
    } else {
      setName("");
      setEmail("");
      setRole("user");
      setPassword("");
    }
  }, [initialUser]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      // Basic validation
      if (!name || !email || !role) {
        showAlert("error", "Please fill in all required fields.");
        setLoading(false);
        return;
      }
      if (!email.includes("@") || !email.includes(".")) {
        showAlert("error", "Please enter a valid email address.");
        setLoading(false);
        return;
      }
      if (isNewUser && !password) {
        showAlert("error", "Password is required for new users.");
        setLoading(false);
        return;
      }
      if (password && password.length < 6) {
        showAlert("error", "Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }

      try {
        if (isNewUser) {
          // Create new user (calling directly from Client Component)
          const newUser = await createUser({ name, email, role, password });
          if (newUser) {
            showAlert(
              "success",
              `User '${newUser.name}' created successfully!`
            );
            router.push("/ad/users"); // Redirect to user list
          } else {
            // This else might be hit if createUser explicitly returns undefined
            showAlert("error", "Failed to create user.");
          }
        } else if (initialUser) {
          // Update existing user (calling directly from Client Component)
          const updates = { name, email, role };
          // Only include password if it was changed
          if (password) {
            updates.password = password;
          }

          const updatedUser = await updateUser(initialUser.id, updates);
          if (updatedUser) {
            showAlert(
              "success",
              `User '${updatedUser.name}' updated successfully!`
            );
            router.push("/ad/users"); // Redirect to user list
          } else {
            // This else might be hit if updateUser explicitly returns undefined
            showAlert("error", "Failed to update user.");
          }
        }
      } catch (error) {
        console.error("Error submitting user form:", error);
        // More specific error handling could be added here based on API response
        showAlert("error", "An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [name, email, role, password, isNewUser, initialUser, router, showAlert]
  ); // Dependency array updated

  return (
    <form onSubmit={handleSubmit} className={`${styles.userForm} card`}>
      <h2 className={styles.formTitle}>
        {isNewUser ? "Create New User" : "Edit User"}
      </h2>

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
          placeholder="Enter user's name"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          placeholder="Enter user's email"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="role" className={styles.label}>
          Role:
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className={styles.select}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password:{" "}
          {isNewUser ? (
            <span className={styles.required}>(Required for new user)</span>
          ) : (
            <span className={styles.optional}>
              (Leave blank to keep current)
            </span>
          )}
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder={
            isNewUser
              ? "Enter password"
              : "Leave blank to keep current password"
          }
        />
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Saving..." : isNewUser ? "Create User" : "Update User"}
      </button>
      <button
        type="button"
        onClick={() => router.back()}
        className={styles.cancelButton}
        disabled={loading}
      >
        Cancel
      </button>
    </form>
  );
}
