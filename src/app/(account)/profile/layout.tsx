// app/page.tsx
// This is a Server Component. It renders the initial HTML for the page.
// It imports and renders the MainClientApp, which contains all the client-side interactivity.

import MainClientApp from "@/app/(account)/profile/page";

// Define the HomePage component as a functional component.
// No specific props are expected for this root page, so React.FC is sufficient.
export default function HomePage() {
  return (
    // The main container for the application.
    // Tailwind CSS classes provide responsive styling.
    <div className="min-h-screen bg-gray-100 font-inter antialiased flex flex-col items-center py-8">
      {/* Render the MainClientApp, which is a client component */}
      <MainClientApp />
    </div>
  );
}
