import type { Metadata } from "next";
import "../globals.css";
import TopNavbar from "../components/TopNavbar";
import LeftNavbar from "../components/LeftSideNavbar";
import Footer from "../components/Footer";
import RightColumn from "../components/RightSidebar";
import styles from "../styles/hmsvr.module.css";
import { getData } from "@/services"; // Assuming getData is an async function

const metadata: Metadata = {
  // Changed to lowercase 'metadata' to match Next.js convention
  title: "Home",
  description: "Home/Blog",
};

export default async function BlogLayout({
  // Make the component async
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Await the data fetch here. This runs on the server.
  const res = await getData(`http://localhost:3000/api/blog/prmpt`);
  return (
    <>
      <div className={styles.dashboardLayout}>
        {/* Pass the fetched data as 'contentData' prop */}
        <TopNavbar contentData={res} />
        <div className={styles.dashboardContent}>
          <LeftNavbar />
          <div className={styles.dashboardPage}>{children}</div>
        </div>
        <RightColumn />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
