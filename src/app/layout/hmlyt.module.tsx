import type { Metadata } from "next";
import "../globals.css";
import RightColumn from "../components/RightSidebar";
import styles from "../styles/hmsvr.module.css";
import dynamic from "next/dynamic";

const Metadata: Metadata = {
  title: "root",
  description: "root",
};

const TopNavbar = dynamic(() => import("@/app/components/TopNavbar"));
const LeftNavbar = dynamic(() => import("@/app/components/LeftSideNavbar"));
const Footer = dynamic(() => import("@/app/components/Footer"));

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={styles.dashboardLayout}>
        <TopNavbar />
        <div className={styles.dashboardContent}>
          <LeftNavbar />
          <div className={styles.dashboardPage}>{children}</div>
        </div>
        <RightColumn />
      </div>
      <Footer />
    </>
  );
}
