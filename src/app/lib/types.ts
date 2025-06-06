// src/app/lib/types.ts

// Define the structure for a User
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user'; // Example roles
    createdAt: string; // ISO 8601 string
    updatedAt: string; // ISO 8601 string
}

// Define the structure for an Alert message
export interface AlertMessage {
    id: string; // Unique ID for the alert
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timeout?: number; // Optional timeout in ms
}