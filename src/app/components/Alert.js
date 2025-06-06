// src/app/components/alert/Alert.jsx
"use client"; // This is a client component

import { useAlert } from "@/app/components/hooksAlert";
import styles from "@/app/styles/Alert.module.css";

/**
 * @typedef {Object} AlertMessage
 * @property {string} id
 * @property {'success' | 'error' | 'warning' | 'info'} type
 * @property {string} message
 * @property {number} [timeout]
 */

/**
 * Alert component to display notifications.
 * It consumes alerts from the useAlert hook and renders them.
 */
export default function Alert() {
  const { alerts, dismissAlert } = useAlert();

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className={styles.alertContainer}>
      {alerts.map((/** @type {AlertMessage} */ alert) => (
        <div
          key={alert.id}
          className={`${styles.alert} ${styles[alert.type]}`}
          role="alert"
        >
          <div className={styles.alertContent}>
            {alert.type === "success" && <span className={styles.icon}>✔</span>}
            {alert.type === "error" && <span className={styles.icon}>✖</span>}
            {alert.type === "warning" && (
              <span className={styles.icon}>⚠️</span>
            )}
            {alert.type === "info" && <span className={styles.icon}>ℹ️</span>}
            <p className={styles.message}>{alert.message}</p>
          </div>
          <button
            onClick={() => dismissAlert(alert.id)}
            className={styles.dismissButton}
            aria-label="Dismiss alert"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
