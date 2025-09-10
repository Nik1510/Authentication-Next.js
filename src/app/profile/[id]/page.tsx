"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserDto = {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
};

export default function UserProfile({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/users/${params.id}`, { cache: "no-store" });
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        if (mounted) setUser(json.data);
      } catch (e: any) {
        if (mounted) setErr("Failed to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [params.id]);

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200" />
      <section className="relative w-full max-w-2xl">
        <div className="rounded-2xl border border-white/30 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-white/40 p-6 md:p-8">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              Profile
            </h1>
            <p className="text-slate-600 mt-1">User overview</p>
          </header>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-5 w-40 rounded bg-slate-200" />
              <div className="h-5 w-64 rounded bg-slate-200" />
              <div className="h-5 w-52 rounded bg-slate-200" />
            </div>
          ) : err ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3">
              {err}
            </div>
          ) : user ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">User Id</span>
                <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  {user._id}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Username</span>
                <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200">
                  {user.username}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Email</span>
                <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200">
                  {user.email}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Status</span>
                <div className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-emerald-200">
                    {user.isVerified ? "Verified" : "Unverified"}
                  </span>
                  {user.isAdmin && (
                    <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-slate-200">
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          <hr className="my-8 border-white/40" />

          <div className="flex items-center justify-between">
            <Link
              href="/profile"
              className="text-sm font-medium text-slate-800 hover:text-slate-900 underline underline-offset-2"
            >
              Back to main page
            </Link>
            <Link
              href={`/settings`}
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
