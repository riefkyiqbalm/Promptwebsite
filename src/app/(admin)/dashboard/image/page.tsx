import styles from "@/app/styles/addsvr.module.css";
import sty from "@/app/styles/crdsvr.module.css";
import ContentCard from "@/app/components/ContentCard";

async function getData() {
  const res = await fetch("http://localhost:3000/api/blog/imgpg", {
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

export default async function imagePage() {
  const prompt = await getData();
  return (
    <div className={styles.dshBlck}>
      <section className={sty.secTw}>
        <div className={sty.grdUsr}>
          {prompt.segment.length > 0 &&
            prompt.segment.map((prom: any) => (
              <div key={prom.id}>
                <ContentCard data={prom}></ContentCard>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
