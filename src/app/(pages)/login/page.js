"use client";
// pages/login.js

import styles from "@/app/styles/AthSvr.module.css";
import { useState } from "react";
import SocialAuth from "@/app/components/SocialAuth";
import ShowPasswordToggle from "@/app/components/ShowPasswordToggle";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e = any) => {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      }),
    });
  };

  return (
    <>
      <div className={styles.authContainer}>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <img
            src={"../../../../prmptsite.svg"}
            alt="Logo"
            className={styles.lgcard}
            width={400}
          />
          <h2 className={styles.authTitle}>Login</h2>

          {error && <div className={styles.authError}>{error}</div>}

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
              />
              <ShowPasswordToggle
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>
          </div>

          <div className={styles.authLinks}>
            <Link href="../forgot-password" className={styles.authLink}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={styles.authButton}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className={styles.authDivider}>OR</div>

          <SocialAuth action="login" />

          <div className={styles.authSwitch}>
            Don't have an account?{" "}
            <Link href="../register" className={styles.authLink}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
