"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      setData(res?.data?.data?._id ?? "");
      toast.success("Fetched user details");
    } catch (e: any) {
      toast.error("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  // Optional: prefetch on mount to demonstrate skeleton
  useEffect(() => {
    // getUserDetails();
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      {/* soft background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200" />
      {/* decorative blurred blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />

      <Toaster position="top-right" toastOptions={{ className: "text-sm" }} />

      <section className="relative w-full max-w-xl">
        <div className="rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-white/40 p-6 md:p-8 transition-all">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Profile</h1>
            <p className="text-slate-600 mt-1">Profile page</p>
          </header>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">User Id</span>

              {/* Data area: skeleton → content → empty state */}
              {loading ? (
                <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 bg-slate-100 text-slate-400 animate-pulse">
                  <span className="h-4 w-24 rounded bg-slate-200" />
                </span>
              ) : data ? (
                <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  <Link
                    href={`/profile/${data}`}
                    className="underline underline-offset-2 hover:text-emerald-800 transition-colors"
                  >
                    {data}
                  </Link>
                </span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200">
                    No data yet
                  </span>
                  <button
                    onClick={getUserDetails}
                    className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white px-3 py-1.5 text-xs font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                  >
                    Fetch now
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={logout}
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Logout
            </button>
           
          </div>

          <hr className="my-8 border-white/40" />

          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Need to manage account settings? (will be added soon)
            </p>
            <Link
              href="/settings"
              className="text-sm font-medium text-slate-800 hover:text-slate-900 underline underline-offset-2"
            >
              Go to Settings
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
