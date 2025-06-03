// app/api/items/route.ts
import { NextResponse } from 'next/server';
// Import your JSON data. Adjust the path based on your project structure.
// Example: if select.json is in a 'data' folder at the root of your project:
import selectData from '@/app/lib/select.json'; // Adjust this path if your data/select.json is in a different location

// Define an interface for the structure of items within your select.json
interface SelectItemData {
    id: number;
    name: string;
    details: string;
}

/**
 * Handles GET requests to the /api/items endpoint.
 * This function serves the list of items from the imported 'select.json' data.
 *
 * @returns {NextResponse} A Next.js Response object with a JSON body containing the items
 * and an appropriate HTTP status.
 */
export async function GET() {
    try {
        // Log a message to the server console to confirm this route is being hit
        console.log('API Route: Received GET request for /api/items');

        // Return the entire selectData array as JSON.
        // Cast it to an array of SelectItemData for type safety.
        return NextResponse.json(selectData as SelectItemData[], { status: 200 });
    } catch (error) {
        // Catch any errors that occur during the process (e.g., file not found, parsing error)
        console.error('API Error fetching items:', error);
        // Return a 500 Internal Server Error response if something goes wrong
        return NextResponse.json({ message: 'Internal Server Error fetching items' }, { status: 500 });
    }
}
