"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token") || "";
    setToken(t);
  }, []);

  const validate = () => {
    if (!password || password.trim().length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      return "Use upper, lower, and a number.";
    }
    if (password !== confirm) {
      return "Passwords do not match.";
    }
    if (!token) {
      return "Reset token missing.";
    }
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/users/reset-password", { token, password });
      setVerified(true);
      setMessage(res.data?.message || "Password reset successful. You can sign in now.");
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Reset failed. The link may be invalid or expired.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Reset password</h1>
          <p className="text-slate-300 text-sm mb-6">
            Enter a new password for the account linked to this reset link.
          </p>

          {message && (
            <div className="mb-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 px-3 py-2">
              {message}
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-lg border border-rose-400/30 bg-rose-500/10 text-rose-300 px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-200 text-sm mb-1">New password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-slate-200"
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                At least 8 characters, with upper, lower, and a number.
              </p>
            </div>

            <div>
              <label className="block text-slate-200 text-sm mb-1">Confirm password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute inset-y-0 right-0 px-3 text-slate-400 hover:text-slate-200"
                  aria-label="Toggle confirm visibility"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors px-4 py-3 text-white font-medium"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
              Back to sign in
            </Link>
          </div>

          {verified && (
            <p className="mt-3 text-center text-slate-400 text-sm">
              Password changed. Proceed to sign in. 
              <Link href="/login" className="ml-1 text-indigo-400 hover:text-indigo-300 underline">Login</Link>
            </p>
          )}
        </div>
        <p className="text-center text-slate-500 text-xs mt-4">
          Having trouble? Request a new reset email.
        </p>
      </div>
    </div>
  );
}
