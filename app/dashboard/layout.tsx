import SideNav from "@/components/layout/Sidenav";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow px-6 md:overflow-y-auto md:px-12">{children}</div>
    </div>
  );
}
