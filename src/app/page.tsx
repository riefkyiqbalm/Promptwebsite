import styles from "./styles/crdsvr.module.css";
import BlogLayout from "@/app/layout/hmlyt.module";
// import dynamic from "next/dynamic";
import ContentCard from "@/app/components/ContentCard";
// import ContentCard from "@/app/components/ContentCard";
// const ContentCard = dynamic(() => import("@/app/components/ContentCard"));
async function getData() {
  const res = await fetch("http://localhost:3000/api/blog/prmpt", {
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

export default async function Home() {
  const prompt = await getData();
  const file = prompt;
  // console.log(prompt);
  return (
    <>
      <BlogLayout>
        <div className={styles.contentGrid}>
          {prompt.data.length > 0 &&
            prompt.data.map((prom: any) => (
              <div key={prom.id}>
                <ContentCard data={prom}></ContentCard>
              </div>
            ))}
        </div>
      </BlogLayout>
    </>
  );
}
