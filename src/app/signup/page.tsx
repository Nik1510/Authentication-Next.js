"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "", username: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const usernameInvalid = user.username.length > 0 && user.username.length < 3;
  const emailInvalid = user.email.length > 0 && !validateEmail(user.email);
  const passwordInvalid = user.password.length > 0 && user.password.length < 7;

  const onSignup = async () => {
    try {
      if (!user.username || !user.email || !user.password) {
        toast.error("Please fill all fields");
        return;
      }
      if (usernameInvalid) {
        toast.error("Username must be at least 3 characters");
        return;
      }
      if (!validateEmail(user.email)) {
        toast.error("Please enter a valid email");
        return;
      }
      if (passwordInvalid) {
        toast.error("Password must be at least 7 characters");
        return;
      }

      setLoading(true);
      await axios.post("/api/users/signup", user);
      toast.success("Signup successful");
      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || error.message || "Signup failed");
      } else if (error instanceof Error) {
        toast.error(error.message || "Signup failed");
      } else {
        toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username));
  }, [user]);

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-white/40 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 text-center">
            {loading ? "Processing..." : "Sign Up"}
          </h1>
          <p className="text-sm text-slate-600 text-center mt-1">Create an account</p>
          <div className="mt-4 h-px w-full bg-white/60" />

          <div className="mt-6 space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">
                Username
              </label>
              <div
                className={[
                  "relative flex items-center rounded-lg border bg-white",
                  usernameInvalid
                    ? "border-rose-300 focus-within:ring-rose-500"
                    : "border-slate-300 focus-within:ring-blue-500",
                  "focus-within:ring-2 focus-within:border-transparent transition",
                ].join(" ")}
              >
                <span className="pl-3 text-slate-400">
                  {/* user icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4.5 19.5a7.5 7.5 0 0 1 15 0" />
                  </svg>
                </span>
                <input
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="Choose a username"
                  className="w-full px-3 py-3 text-slate-900 placeholder-slate-400 bg-transparent outline-none"
                  disabled={loading}
                  aria-invalid={usernameInvalid}
                  aria-describedby="username-help"
                />
              </div>
              <p id="username-help" className={`text-xs ${usernameInvalid ? "text-rose-600" : "text-slate-500"}`}>
                At least 3 characters
              </p>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <div
                className={[
                  "relative flex items-center rounded-lg border bg-white",
                  emailInvalid
                    ? "border-rose-300 focus-within:ring-rose-500"
                    : "border-slate-300 focus-within:ring-blue-500",
                  "focus-within:ring-2 focus-within:border-transparent transition",
                ].join(" ")}
              >
                <span className="pl-3 text-slate-400">
                  {/* mail icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 16.5v-9A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 8.25 6 8.25-6" />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3 py-3 text-slate-900 placeholder-slate-400 bg-transparent outline-none"
                  disabled={loading}
                  aria-invalid={emailInvalid}
                  aria-describedby="email-help"
                />
              </div>
              <p id="email-help" className={`text-xs ${emailInvalid ? "text-rose-600" : "text-slate-500"}`}>
                Use a valid email format like user@domain.com
              </p>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div
                className={[
                  "relative flex items-center rounded-lg border bg-white",
                  passwordInvalid
                    ? "border-rose-300 focus-within:ring-rose-500"
                    : "border-slate-300 focus-within:ring-blue-500",
                  "focus-within:ring-2 focus-within:border-transparent transition",
                ].join(" ")}
              >
                <span className="pl-3 text-slate-400">
                  {/* lock icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16.5 10.5V7.5a4.5 4.5 0 1 0-9 0v3M6.75 10.5h10.5a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18.75v-6a2.25 2.25 0 0 1 2.25-2.25z" />
                  </svg>
                </span>
                <input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="At least 7 characters"
                  className="w-full px-3 py-3 text-slate-900 placeholder-slate-400 bg-transparent outline-none"
                  disabled={loading}
                  aria-invalid={passwordInvalid}
                  aria-describedby="password-help"
                />
              </div>
              <p id="password-help" className={`text-xs ${passwordInvalid ? "text-rose-600" : "text-slate-500"}`}>
                At least 7 characters; mix letters, numbers, and symbols for better security
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={onSignup}
              disabled={buttonDisabled || loading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                buttonDisabled || loading
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md"
              }`}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
