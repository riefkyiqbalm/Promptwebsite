import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preload" href="globals.css" as="style"></link>
          {/* <ThemeModeScript /> */}
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
