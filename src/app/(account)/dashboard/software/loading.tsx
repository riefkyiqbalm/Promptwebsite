import styles from "@/app/styles/ldClt.module.css";
import Load from "@/app/components/load";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  const data = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
  }));
  return (
    <div className={styles.Grdlog}>
      {data.length > 0 &&
        data.map((prom: any) => (
          <div key={prom.id}>
            <Load data={prom}></Load>
          </div>
        ))}
    </div>
  );
}
