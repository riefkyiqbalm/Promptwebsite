import { ThemeModeScript } from "flowbite-react";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html>
        <body>{children}</body>
      </html>
    </>
  );
}
