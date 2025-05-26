import type { Metadata } from "next";
import "../globals.css";
import TopNavbar from "../components/TopNavbar";
import LeftNavbar from "../components/LeftSideNavbar";
import Footer from "../components/Footer";
import RightColumn from "../components/RightSidebar";
import styles from "../styles/hmsvr.module.css";

const Metadata: Metadata = {
  title: "Home",
  description: "Home/Blog",
};

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
      <footer>
        <Footer />
      </footer>
    </>
  );
}
