"use client";

import UsersBox from "@/app/component/users/UsersBox";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Users() {
  const { data: session } = useSession();

  if (!session || session === undefined) return redirect("/");

  return (
    <main className="bg-slate-100 h-full p-5">
      <h1>Users</h1>
      <p className="mb-1">This is data of Users</p>
      <UsersBox />
    </main>
  );
}
