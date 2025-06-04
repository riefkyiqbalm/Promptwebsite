// pages/forgot-password.js
"use client";
import styles from "../../styles/AthSvr.module.css";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        <h2 className={styles.authTitle}>Forgot Password</h2>

        {error && <div className={styles.authError}>{error}</div>}
        {message && <div className={styles.authMessage}>{message}</div>}

        <div className={styles.authFormGroup}>
          <label htmlFor="email" className={styles.authLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.authInput}
            required
          />
        </div>

        <button type="submit" className={styles.authButton} disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className={styles.authSwitch}>
          Remember your password?{" "}
          <Link href="../login" className={styles.authLink}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
