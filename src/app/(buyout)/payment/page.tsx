import ExpandableSideNav from "@/app/components/expandSideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <ExpandableSideNav />
      <main style={{ marginLeft: "60px", flex: 1 }}>{children}</main>
    </div>
  );
}
