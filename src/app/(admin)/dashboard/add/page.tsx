import ContentCard from "@/app/components/ContentCard";
import styles from "@/app/styles/addsvr.module.css";
import sty from "@/app/styles/crdsvr.module.css";
import { Datepicker } from "flowbite-react";
import GoBackButton from "@/app/components/goback";

// type promptData = { params: { slug: string[] } };

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
  // const { params } = props;
  const prompt = await getData();
  return (
    <div className={styles.dshBlck}>
      <section className={styles.secOne}>
        <GoBackButton />

        <div>
          <form className="flex flex-col">
            <input
              className="w-xl h-8 outline-none transition-all resize-none"
              placeholder="Prompt Title"
            ></input>
            <hr></hr>
            <textarea
              className=" h-24 outline-none transition-all resize-none"
              placeholder="Prompt Description"
            ></textarea>
            <hr></hr>
            <textarea
              rows={4}
              className="h-24 outline-none transition-all resize-none h-8rem"
              placeholder="Send Your Prompt"
            ></textarea>
            <hr></hr>
            <div className="flex justify-between items-center">
              <span id="charCount" className="text-sm text-gray-500">
                0/500
              </span>
            </div>
          </form>
        </div>
        <div className="flex justify-around items-center">
          <label>Choose a Field:</label>
          <select name="mainfield" id="field">
            <option value="Engineering">Engineering</option>
            <option value="Films">Films</option>
            <option value="Images">Images</option>
            <option value="Sofware">Software</option>
          </select>
          <label>Choose a engine:</label>
          <select name="AIengine" id="engine">
            <option value="Chat-GpT">Chat-GpT</option>
            <option value="DeepSeek">DeepSeek</option>
            <option value="Midjourney">Midjourney</option>
            <option value="Gemini">Gemini</option>
          </select>
          <Datepicker className={styles.datepick} />
          <button className={styles.postButton}>Post</button>
        </div>
      </section>
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
