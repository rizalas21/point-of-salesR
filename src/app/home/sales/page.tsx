"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Sales() {
  const { data: session } = useSession();

  if (!session || session === undefined) return redirect("/");

  return (
    <main className="bg-gray-100 h-screen p-3">
      <h1>Sales</h1>
    </main>
  );
}
