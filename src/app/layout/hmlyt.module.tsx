import type { Metadata } from "next";
import "../globals.css";
import RightColumn from "../components/RightSidebar";
import styles from "../styles/hmsvr.module.css";
import dynamic from "next/dynamic";
import { getData } from "@/services";
import LeftNavbar from "@/app/components/LeftSideNavbar";

const Metadata: Metadata = {
  title: "root",
  description: "root",
};

const TopNavbar = dynamic(() => import("@/app/components/TopNavbar"));
const Footer = dynamic(() => import("@/app/components/Footer"));

export default async function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await getData(`http://localhost:3000/api/blog/prmpt`);
  return (
    <>
      <div className={styles.dashboardLayout}>
        <TopNavbar contentData={res} />
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
