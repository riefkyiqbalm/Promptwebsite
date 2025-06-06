import ContentCard from "@/app/components/ContentCard";
import styles from "@/app/styles/addsvr.module.css";
import sty from "@/app/styles/crdsvr.module.css";

async function getData() {
  const res = await fetch("http://localhost:3000/api/admin/user", {
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

export default async function Dashboard() {
  const prompt = await getData();
  return (
    <div className={styles.dshBlck}>
      <section className={styles.secTw}>
        <h1 className={styles.youPrompt}>Yours Prompt's</h1>
        <div className={sty.grdUsr}>
          {prompt.data.length > 0 &&
            prompt.data.map((prom: any) => (
              <div key={prom.id}>
                <ContentCard data={prom}></ContentCard>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
