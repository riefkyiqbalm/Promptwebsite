import Load from "@/app/components/loadDet";
export default function Loading() {
  const data = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
  }));
  return (
    <>
      <div className="flex items-center min-h-screen w-full">
        <div className="inline-grid gap-127.5 [&>*]:col-start-2">
          <Load></Load>
        </div>
      </div>
    </>
  );
}
