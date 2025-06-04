// app/api/store-content/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises'; // Node.js File System module for async operations
import path from 'path';     // Node.js Path module for resolving file paths

// Define the path to your contentbyuser.json file.
// The user specified that the JSON content path is "@/app/lib/a".
// Assuming this means the 'contentbyuser.json' file should reside within
// a directory structure like 'project_root/app/lib/a'.
const CONTENT_FILE_PATH = path.join(process.cwd(), 'src', 'app', 'lib', 'contentbyuser.json');
const CONTENT_DIR_PATH = path.dirname(CONTENT_FILE_PATH); // Get the directory path

/**
 * Handles POST requests to the /api/store-content endpoint.
 * This function receives data from the client and appends it to contentbyuser.json.
 *
 * @param {Request} request The incoming Next.js Request object.
 * @returns {NextResponse} A Next.js Response object with a JSON body and status.
 */
export async function POST(request: Request) {
    console.log('API Route: /api/store-content POST request received.');
    try {
        const { selectedItem } = await request.json();
        console.log(`API Route: Received selectedItem: ${selectedItem}`);

        if (!selectedItem) {
            console.error('API Route: No item provided to store (400 Bad Request).');
            return NextResponse.json({ message: 'No item provided to store.' }, { status: 400 });
        }

        let existingContent: string[] = []; // Initialize as an empty array

        // --- Ensure the directory exists before reading/writing the file ---
        try {
            await fs.mkdir(CONTENT_DIR_PATH, { recursive: true });
            console.log(`API Route: Ensured directory exists: ${CONTENT_DIR_PATH}`);
        } catch (dirError) {
            console.error(`API Route: Failed to create directory ${CONTENT_DIR_PATH}:`, dirError);
            return NextResponse.json({ message: 'Server error: Could not ensure directory for file.' }, { status: 500 });
        }
        // --- End directory check ---

        try {
            // Read the existing content from the file
            const fileContent = await fs.readFile(CONTENT_FILE_PATH, 'utf-8');
            console.log('API Route: Successfully read existing file content.');
            // Parse the JSON content. Ensure it's an array.
            existingContent = JSON.parse(fileContent);
            // Basic validation: ensure it's an array
            if (!Array.isArray(existingContent)) {
                console.warn('API Route: contentbyuser.json is not an array. Initializing as empty array.');
                existingContent = [];
            }
        } catch (readError: any) {
            // If the file doesn't exist (ENOENT) or is empty/malformed (SyntaxError), proceed with an empty array
            if (readError.code === 'ENOENT') {
                console.log('API Route: contentbyuser.json not found, initializing as empty array.');
                existingContent = [];
            } else if (readError instanceof SyntaxError) {
                console.log('API Route: contentbyuser.json is malformed JSON, initializing as empty array.');
                existingContent = [];
            } else {
                // Re-throw other unexpected read errors
                console.error('API Route: Unexpected error reading contentbyuser.json:', readError);
                throw readError; // This will be caught by the outer try-catch
            }
        }

        // Add the new selected item to the array
        existingContent.push(selectedItem);
        console.log('API Route: Content updated in memory.');

        // Write the updated content back to the file
        await fs.writeFile(CONTENT_FILE_PATH, JSON.stringify(existingContent, null, 2), 'utf-8');
        console.log(`API Route: Stored "${selectedItem}" to ${CONTENT_FILE_PATH}`);

        return NextResponse.json(
            { message: `Item "${selectedItem}" stored successfully to contentbyuser.json.` },
            { status: 200 }
        );
    } catch (error) {
        console.error('API Route: Critical Error storing content:', error);
        return NextResponse.json({ message: 'Internal Server Error storing content.' }, { status: 500 });
    }
}
