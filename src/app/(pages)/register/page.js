"use client";
// pages/register.js

import styles from "../../styles/AthSvr.module.css";
import { useState } from "react";

import SocialAuth from "../../components/SocialAuth";
import ShowPasswordToggle from "../../components/ShowPasswordToggle";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e = any) => {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: e.currentTarget.name.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      }),
    });
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          <img
            src={"../../../../prmptsite.svg"}
            alt="Logo"
            className={styles.lgcard}
            width={100}
          />
          <h2 className={styles.authTitle}>Register</h2>

          {error && <div className={styles.authError}>{error}</div>}

          <div className={styles.authFormGroup}>
            <label htmlFor="name" className={styles.authLabel}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.authInput}
              required
            />
          </div>

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
          <div className="flex gap-8">
            <button type="submit" className={styles.authButton}>
              {loading ? "Registering..." : "Register"}
            </button>

            <SocialAuth action="register" />
          </div>
          <div className={styles.authDivider}>OR</div>
          <div className={styles.authSwitch}>
            Already have an account?{" "}
            <Link href="../login" className={styles.authSwitchLink}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
