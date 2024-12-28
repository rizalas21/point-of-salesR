"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session || session !== null) {
      localStorage.setItem("token", session?.token);
      router.push("/");
    }
  }, [router, session]);

  const handleForm = async (e: any) => {
    try {
      e.preventDefault();
      const hook = await signIn("auth-session", {
        ...input,
        redirect: false,
      });
      if (!hook?.ok || hook?.error) {
        return null;
      }
      await setInput({ email: "", password: "" });
      router.push("/");
    } catch (err) {
      return err;
    }
  };

  return (
    <main className="h-screen w-screen flex justify-center bg-blue-600 items-center">
      <div className="bg-white flex justify-between h-3/4 w-3/4 rounded-md">
        <div className="w-1/2 h-full content-center px-2.5 bg-black">
          <Image
            src="/rubicamp.png"
            alt="Not Source"
            layout="responsive"
            width={200}
            height={200}
            priority
          />
        </div>
        <div className="w-1/2 h-full py-5 flex flex-col items-center flex-wrap justify-evenly">
          <h1 className="font-medium text-slate-700 h-auto">Point Of Sales</h1>
          <div className="text-slate-700 h-3/4 w-full flex flex-col items-center p-2.5 my-2.5 border-y border-slate-400">
            <h2 className="font-medium text-3xl mt-2">Welcome Back!</h2>
            <form
              className="flex flex-col w-4/5 h-4/5 items-center py-2"
              onSubmit={(e) => handleForm(e)}
            >
              <input
                className="w-full px-5 py-3.5 m-2.5 border border-slate-300 rounded-3xl"
                placeholder="Enter Email Adress..."
                type="text"
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
              <input
                className="w-full px-5 py-3.5 m-2.5 border border-slate-300 rounded-3xl"
                placeholder="Password"
                type="password"
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
              <div className="w-11/12 flex items-center justify-start m-2.5">
                <input placeholder="Remember Me" type="checkbox" />
                <p className="ml-3">Remember Me</p>
              </div>
              <div className="my-2.5 flex flex-col w-11/12 h-1/2 items-center">
                <button
                  className="w-full py-3 px-4 rounded-3xl bg-blue-700 text-white text-lg cursor-pointer hover:bg-blue-900"
                  onClick={(e) => handleForm(e)}
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <button className="bg-white w-auto cursor-pointer text-blue-500 text-xs">
            Forgot Password?
          </button>
        </div>
      </div>
    </main>
  );
}
