import Tab from "@/app/components/detailTabs";
import { getData } from "@/services";
import GoBackButton from "@/app/components/goback";
import Link from "next/link";

interface PromptItem {
  id: number;
  segment: string;
  date: string;
  engine: string;
  Description: string;
  title: string;
  content: string;
}

interface PageProps {
  params: Promise<{
    id: string; // The dynamic 'id' from the URL will be a string
  }>;
}

// Define the type for a single prompt item

export default async function dtlPromppage({ params }: PageProps) {
  const rparams = await params;
  const { id } = rparams;
  const numericID = parseInt(id, 10);
  const res = await getData(`http://localhost:3000/api/blog/prmpt`);
  const data = res.data;
  const dataByID = data.filter((item: PromptItem) => item.id === numericID);

  // console.log(dataByID);
  return (
    <div className="block min-h-screen w-full">
      <div className="inline-grid gap-8 [&>*]:col-start-2">
        <div className="inline-flex gap-175">
          <GoBackButton />
          <Link href="/dashboard">
            <img width={200} src={"../../../prmptsite.svg"} alt="Logo" />
          </Link>
        </div>
        <Tab contents={dataByID} />
      </div>
    </div>
  );
}
