"use client";

import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || ""; // expects /verifyemail?token=...

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null); // store message for debugging

  const verifyUserEmail = useCallback(async () => {
    if (!token) return;
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(null);
    } catch (err: unknown) {
      setVerified(false);
      // Narrow safely
      if (axios.isAxiosError(err)) {
        const msg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Verification failed";
        setError(msg);
        // console.log(err.response?.data);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Verification failed");
      }
    }
  }, [token]);

  useEffect(() => {
    if (token) verifyUserEmail();
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6 md:p-8">
        <h1 className="text-3xl font-semibold text-slate-900 text-center">Verify Email</h1>
        <p className="text-center text-slate-600 mt-2">
          {token ? "Processing your verification..." : "No token found in URL"}
        </p>

        <div className="mt-6 space-y-4">
          {verified && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 px-4 py-3">
              <h2 className="text-lg font-medium">Email Verified</h2>
              <p className="mt-1 text-sm">You can now log in to your account.</p>
              <div className="mt-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          {!verified && token && !error && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 text-slate-700 px-4 py-3">
              Verifying your email...
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3">
              <h2 className="text-lg font-medium">Verification Error</h2>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Token debug display (optional, remove in prod) */}
        <div className="mt-6">
          <h3 className="text-xs font-medium text-slate-500">Token</h3>
          <code className="mt-1 inline-block w-full truncate rounded bg-slate-100 px-2 py-1 text-xs text-slate-800">
            {token || "—"}
          </code>
        </div>
      </div>
    </div>
  );
}
