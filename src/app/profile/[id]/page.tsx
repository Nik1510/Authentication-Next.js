"use client";

import { useRouter } from "next/navigation";

export default function UserProfile({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <section className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6 md:p-8">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              Profile
            </h1>
            <p className="text-slate-500 mt-1">Dynamic user profile page</p>
          </header>

          <div className="mt-2">
            <p className="text-xl md:text-2xl text-slate-800">
              Profile page{" "}
              <span className="align-middle ml-2 inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 px-3 py-1.5 text-base md:text-lg font-semibold ring-1 ring-inset ring-amber-200">
                ID
                <span className="font-mono text-sm md:text-base text-amber-950 bg-amber-200/70 px-2 py-0.5 rounded">
                  {params.id}
                </span>
              </span>
            </p>
          </div>

          <hr className="my-8 border-slate-200" />

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              This page uses a card layout and a badge-style ID chip for clarity.
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-emerald-200">
                Active
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-slate-200">
                Member
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex">
          <button
            onClick={() => router.push("/profile")}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
          >
            Back to main page
          </button>
        </div>
      </section>
    </main>
  );
}
