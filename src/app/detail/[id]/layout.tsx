import type { Metadata } from "next";
import "@/app/globals.css";
import Footer from "@/app/components/Footer";
import RightColumn from "@/app/components/RightBarDetail";
import styles from "@/app/styles/hmsvr.module.css";

const Metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={styles.dashboardLayout}>
        <div className={styles.dashboardContent}>{children}</div>
        <RightColumn />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
