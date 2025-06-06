import type { Metadata } from "next";
import "../../globals.css";
import TopNavbar from "@/app/components/TopNavbar";
import LeftNavbar from "@/app/components/LeftSideNavbar";
import RightColumn from "@/app/components/RightSidebar";
import Footer from "@/app/components/Footer";
import styles from "@/app/styles/hmsvr.module.css";
import { getData } from "@/services";
// import { useRouter } from "next/navigation";

import { FiActivity, FiPlusCircle } from "react-icons/fi";
const Metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await getData(`http://localhost:3000/api/blog/prmpt`);
  // const router = useRouter();
  return (
    <>
      <div className={styles.dashboardLayout}>
        <TopNavbar contentData={res} />
        <div className={styles.dashboardContent}>
          <nav className={styles.LeftSideNavbar}>
            <ul className={styles.navTab}>
              {/* <li onClick={() => router.push("/dashboard")}> */}
              <span className={styles.tabIcon}>
                <FiPlusCircle />
                <span className={styles.tooltiptext}>Dashboard</span>
              </span>
              {/* </li> */}
            </ul>
          </nav>
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
