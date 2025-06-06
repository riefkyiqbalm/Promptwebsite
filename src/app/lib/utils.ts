// src/app/lib/utils.ts
import { User } from './types';


// --- Mock API Data (for demonstration purposes) ---
// In a real application, this would fetch data from a database
let mockUsers: User[] = [
    { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'admin', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '2', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export async function fetchAllUsers(): Promise<User[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers;
}

export async function fetchUserById(id: string): Promise<User | undefined> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers.find(user => user.id === id);
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = {
        id: String(Date.now()), // Simple unique ID
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return newUser;
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User | undefined> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex > -1) {
        mockUsers[userIndex] = {
            ...mockUsers[userIndex],
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        return mockUsers[userIndex];
    }
    return undefined; // User not found
}

export async function deleteUser(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const initialLength = mockUsers.length;
    mockUsers = mockUsers.filter(user => user.id !== id);
    return mockUsers.length < initialLength; // True if user was deleted
}

// --- General Utilities ---

// Function to generate a unique ID (useful for alerts)
export const generateUniqueId = (): string => {
    return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};