// src/app/lib/hooks/useAlert.js
"use client"; // This is a client component

import { useState, useContext, createContext, useCallback } from "react";
import { generateUniqueId } from "../lib/utils"; // Assume utils.ts is also client-compatible or separate this part

// Define the shape of the Alert context value
/**
 * @typedef {Object} AlertMessage
 * @property {string} id
 * @property {'success' | 'error' | 'warning' | 'info'} type
 * @property {string} message
 * @property {number} [timeout]
 */

/**
 * @typedef {Object} AlertContextType
 * @property {AlertMessage[]} alerts
 * @property {(type: 'success' | 'error' | 'warning' | 'info', message: string, timeout?: number) => void} showAlert
 * @property {(id: string) => void} dismissAlert
 */

/** @type {React.Context<AlertContextType | undefined>} */
const AlertContext = createContext(undefined);

/**
 * Provides the AlertContext to its children.
 * Manages the state of alerts.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function AlertProvider({ children }) {
  /** @type {[AlertMessage[], React.Dispatch<React.SetStateAction<AlertMessage[]>>]} */
  const [alerts, setAlerts] = useState([]);

  /**
   * Shows a new alert message.
   * @param {'success' | 'error' | 'warning' | 'info'} type
   * @param {string} message
   * @param {number} [timeout=5000] - Duration in milliseconds before the alert auto-dismisses.
   */
  const showAlert = useCallback((type, message, timeout = 5000) => {
    const id = generateUniqueId();
    const newAlert = { id, type, message, timeout };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    if (timeout > 0) {
      setTimeout(() => {
        setAlerts((prevAlerts) =>
          prevAlerts.filter((alert) => alert.id !== id)
        );
      }, timeout);
    }
  }, []);

  /**
   * Dismisses an alert by its ID.
   * @param {string} id
   */
  const dismissAlert = useCallback((id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  const value = {
    alerts,
    showAlert,
    dismissAlert,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}

/**
 * Custom hook to consume the AlertContext.
 * @returns {AlertContextType}
 * @throws {Error} If used outside of an AlertProvider.
 */
export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
