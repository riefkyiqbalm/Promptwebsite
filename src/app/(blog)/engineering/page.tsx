import styles from "@/app/styles/crdsvr.module.css";
import ContentCard from "@/app/components/ContentCard";

type engineringPageProps = { params: { slug: string[] } };

async function getData() {
  const res = await fetch("http://localhost:3000/api/blog/eng", {
    cache: "no-store",
    next: {
      revalidate: 10,
    },
  });
  // console.log(cache);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default async function Engineering(props: engineringPageProps) {
  const { params } = props;
  const prompt = await getData();
  // console.log(data);
  return (
    <div className={styles.contentGrid}>
      {prompt.segment.length > 0 &&
        prompt.segment.map((prom: any) => (
          <div key={prom.id}>
            <ContentCard data={prom}></ContentCard>
          </div>
        ))}
    </div>
  );
}
