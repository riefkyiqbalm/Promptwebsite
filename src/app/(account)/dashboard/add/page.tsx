import ContentCard from "@/app/components/ContentCard";
import styles from "@/app/styles/addsvr.module.css";
import sty from "@/app/styles/crdsvr.module.css";
import GoBackButton from "@/app/components/goback";
import Input from "@/app/components/inputArea";
import CombinedListPicker from "@/app/components/listpicker";
import FlowbiteDatepicker from "@/app/components/datepicker";

interface SelectItemData {
  id: number;
  field: string;
  engine: string;
}

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
async function getItemsFromApi(): Promise<SelectItemData[]> {
  try {
    // Use `fetch` to call your internal API route
    const response = await fetch("http://localhost:3000/api/selectitems", {
      // `cache: 'no-store'` ensures data is always fresh, not cached by Next.js or browser
      // For static data, you might use `cache: 'force-cache'` or `revalidate: 3600`
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Failed to fetch items: ${response.status} - ${errorText}`);
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }

    const items: SelectItemData[] = await response.json();
    return items;
  } catch (error) {
    console.error("Error in getItemsFromApi:", error);
    // Return an empty array or handle the error gracefully
    return [];
  }
}

export default async function Dashboard() {
  // const { params } = props;
  const allItems = await getItemsFromApi();
  const itemsFieldPicker = allItems.map((item) => item.field);
  const itemsEnginePicker = allItems.map((item) => item.engine);
  const prompt = await getData();
  return (
    <div className={styles.dshBlck}>
      <section className={styles.secOne}>
        <GoBackButton />
        <div>
          <form className="flex flex-col">
            <label
              htmlFor="auto-input"
              className="block text-xl font-bold text-gray-700"
            >
              Title
            </label>
            <Input
              className="text-shadow-slate-500"
              placeholder="Give Title To Your's Prompt"
              rows={0}
            />
            <label
              htmlFor="auto-input"
              className="block text-xl font-bold text-gray-700"
            >
              Description
            </label>
            <Input
              placeholder="A Brief Description of Your's Prompt"
              rows={4}
            />
            <label
              htmlFor="auto-input"
              className="block text-xl font-bold text-gray-700"
            >
              Prompt
            </label>
            <Input placeholder="Your's Prompt" rows={4} />
          </form>
        </div>
        <div className={styles.pick}>
          <CombinedListPicker property={itemsFieldPicker} label="Field: " />
          <CombinedListPicker property={itemsEnginePicker} label="Engine: " />
          <FlowbiteDatepicker />
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
