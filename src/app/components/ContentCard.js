"use client";

import styles from "../styles/crdsvr.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ContentCard({ data }) {
  const router = useRouter();
  return (
    <div className={styles.contentCard}>
      <div className={styles.cardHeader}>
        <span
          className={`${styles.cardBadge}${data.segment}`}
          onClick={() =>
            router.push(
              "/" + data.segment.charAt(0).toLowerCase() + data.segment.slice(1)
            )
          }
        >
          {data.segment.charAt(0).toUpperCase() + data.segment.slice(1)}
        </span>
        <span className={styles.cardDate}>
          {new Date(data.date).toLocaleDateString()}
        </span>
      </div>
      <Link href={"../detail/" + data.id} className={styles.link}>
        <h3 className={styles.cardTitle}>{data.title}</h3>
      </Link>
      <div className="truncate">
        <p className={styles.cardDescription}>{data.Description}</p>
      </div>
      <div className={styles.cardPrompt}>
        <h4>Prompt:</h4>
        <p className="truncate">{data.content}</p>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.cardEngine}>{data.engine}</span>
      </div>
    </div>
  );
}
