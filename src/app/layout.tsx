import { ThemeModeScript } from "flowbite-react";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preload" href="globals.css" as="style"></link>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
