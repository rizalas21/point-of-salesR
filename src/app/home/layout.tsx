"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SideBar from "../component/sidebar";
import SearchBar from "../component/searchbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  if (status === "loading") return <p>Loading...</p>;

  if (!session || session === undefined) {
    redirect("/signin");
  }

  return (
    <div className="flex">
      <div className="fixed w-1/5">
        <SideBar />
      </div>
      <div className="ml-[20%] w-4/5">
        <SearchBar />
        <div className="h-auto bg-white pt-12">{children}</div>
      </div>
    </div>
  );
}
