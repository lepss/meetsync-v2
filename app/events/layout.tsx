import SideNav from "@/components/layout/Sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow px-6 md:overflow-y-auto md:px-12">{children}</div>
    </div>
  );
}
