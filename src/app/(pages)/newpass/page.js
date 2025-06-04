"use client";

import styles from "../../styles/AthSvr.module.css";
import { useState } from "react";
import ShowPasswordToggle from "../../components/ShowPasswordToggle";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setMessage(data.message || "Password reset link sent to your email");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <img
          src={"../../../../prmptsite.svg"}
          alt="Logo"
          className={styles.lgcard}
          width={400}
        />
        <h2 className={styles.authTitle}>Create New Password</h2>

        {error && <div className={styles.authError}>{error}</div>}
        {message && <div className={styles.authMessage}>{message}</div>}

        <div className={styles.authFormGroup}>
          <label htmlFor="password" className={styles.authLabel}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.authInput}
              required
              minLength="6"
            />
          </div>
        </div>

        <div className={styles.authFormGroup}>
          <label htmlFor="confirmPassword" className={styles.authLabel}>
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.authInput}
            required
            minLength="6"
          />
          <ShowPasswordToggle
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>

        <button type="submit" className={styles.authButton} disabled={loading}>
          {loading ? "Creating..." : "Create New Password"}
        </button>
      </form>
    </div>
  );
}
