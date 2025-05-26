"use client";

import { FiGrid, FiSettings, FiPlusCircle } from "react-icons/fi";
import { TbBriefcase, TbPhotoAi } from "react-icons/tb";
import { TiVideoOutline } from "react-icons/ti";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { BiCodeBlock } from "react-icons/bi";
import styles from "@/app/styles/hmsvr.module.css";
import { useRouter } from "next/navigation";

export default function LeftSideNavbar() {
  const router = useRouter();
  return (
    <nav className={styles.leftSideNavbar}>
      <ul className={styles.navTabs}>
        <div className={styles.navTab}>
          <li onClick={() => router.push("/dashboard/add")}>
            <span className={styles.tabIcon}>
              <FiPlusCircle />
              <span className={styles.tooltiptext}>Add Prompt</span>
            </span>
          </li>
        </div>

        <div className={styles.navTab}>
          <li onClick={() => router.push("/dashboard/engineering")}>
            <span className={styles.tabIcon}>
              <HiOutlineWrenchScrewdriver />
              <span className={styles.tooltiptext}>Engineering</span>
            </span>
          </li>
        </div>

        <div className={styles.navTab}>
          <li onClick={() => router.push("/dashboard/office")}>
            <span className={styles.tabIcon}>
              <TbBriefcase />
              <span className={styles.tooltiptext}>Office</span>
            </span>
          </li>
        </div>

        <div className={styles.navTab}>
          <li onClick={() => router.push("/dashboard/image")}>
            <span className={styles.tabIcon}>
              <TbPhotoAi />
              <span className={styles.tooltiptext}>Image</span>
            </span>
          </li>
        </div>

        <div className={styles.navTab}>
          <li onClick={() => router.push("/dashboard/films")}>
            <span className={styles.tabIcon}>
              <TiVideoOutline />
              <span className={styles.tooltiptext}>Film</span>
            </span>
          </li>
        </div>

        <div className={styles.navTab}>
          <li onClick={() => router.push("/dashboard/software")}>
            <span className={styles.tabIcon}>
              <BiCodeBlock />
              <span className={styles.tooltiptext}>Software</span>
            </span>
          </li>
        </div>

        <div className={styles.navTab}>
          <li onClick={() => router.push("/dashboard/settings")}>
            <span className={styles.tabIcon}>
              <FiSettings />
              <span className={styles.tooltiptext}>Settings</span>
            </span>
          </li>
        </div>

        <div className={styles.navTab}>
          <li onClick={() => router.push("/dashboard/more")}>
            <span className={styles.tabIcon}>
              <FiGrid />
              <span className={styles.tooltiptext}>More</span>
            </span>
          </li>
        </div>
      </ul>
    </nav>
  );
}
