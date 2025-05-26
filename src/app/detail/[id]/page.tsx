import Tab from "@/app/components/detailTabs";
import { getData } from "@/services";
import GoBackButton from "@/app/components/goback";

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
    <>
      <div className="h-fit">
        <GoBackButton />
        <Tab contents={dataByID} />
      </div>
    </>
  );
}
