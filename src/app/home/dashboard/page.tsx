"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();

  async function logout(e: any) {
    e.preventDefault();
    await signOut({ redirect: true, callbackUrl: "/" });
  }

  if (!session || session === undefined) return redirect("/");

  return (
    <main className="bg-gray-100 h-screen p-3">
      <h1>Dashboard</h1>
    </main>
  );
}
