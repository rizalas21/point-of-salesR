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
      <SideBar />
      <div className="h-screen w-4/5">
        <SearchBar />
        <div className="h-auto bg-white">{children}</div>
      </div>
    </div>
  );
}
