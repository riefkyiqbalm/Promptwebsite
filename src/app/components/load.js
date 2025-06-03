"use client";

import styles from "@/app/styles/ldClt.module.css";

export default function loadCard({ data }) {
  return (
    <div className={data.length}>
      <div className={styles.Crd}>
        <div className={styles.Hdr}>
          <span className={styles.Bdg}></span>
          <span className={styles.Date}></span>
        </div>
        <h3 className={styles.TitleRow1}></h3>
        <h3 className={styles.TitleRow2}></h3>
        <p className={styles.Desc}></p>
        <div className={styles.Prompt}>
          <h4></h4>
        </div>
        <div className={styles.ftr}></div>
      </div>
    </div>
  );
}
