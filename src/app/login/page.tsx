"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  function ForgotPasswordLink() {
  return (
    <Link
      href="#"
      role="button"
      onClick={(e) => {
        e.preventDefault();
        toast("Forgot password will be added soon", {
          icon: "⏳",
        });
      }}
      className="text-xs font-medium text-blue-600 hover:text-blue-500"
    >
      Forgot password?
    </Link>
  );
}

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onLogin = async () => {
    try {
      if (!validateEmail(user.email)) {
        toast.error("Please enter a valid email");
        return;
      }
      if (!user.password) {
        toast.error("Password is required");
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  const emailInvalid =
    user.email.length > 0 && !validateEmail(user.email);

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10">
      {/* soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200" />
      {/* decorative blurred blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/30 bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-white/40 p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              {loading ? "Processing..." : "Login"}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Access the dashboard securely
            </p>
            <div className="mt-4 h-px w-full bg-white/60" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Email Field */}
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
                  "focus-within:ring-2 focus-within:border-transparent transition"
                ].join(" ")}
              >
                <span className="pl-3 text-slate-400">
                  {/* mail icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 7.5v9a2.25 2.25 0 0 1-2.25 2.25h-15A2.25 2.25 0 0 1 2.25 16.5v-9A2.25 2.25 0 0 1 4.5 5.25h15A2.25 2.25 0 0 1 21.75 7.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="m3 7 8.25 6 8.25-6" />
                  </svg>
                </span>
                <input
                  className="w-full px-3 py-3 text-slate-900 placeholder-slate-400 bg-transparent outline-none"
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="name@example.com"
                  disabled={loading}
                  aria-invalid={emailInvalid}
                  aria-describedby="email-help"
                />
              </div>
              <p
                id="email-help"
                className={`text-xs ${emailInvalid ? "text-rose-600" : "text-slate-500"}`}
              >
                Use a valid email format like user@domain.com
              </p>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative flex items-center rounded-lg border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
                <span className="pl-3 text-slate-400">
                  {/* lock icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M16.5 10.5V7.5a4.5 4.5 0 1 0-9 0v3M6.75 10.5h10.5a2.25 2.25 0 0 1 2.25 2.25v6a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18.75v-6a2.25 2.25 0 0 1 2.25-2.25z" />
                  </svg>
                </span>
                <input
                  className="w-full px-3 py-3 text-slate-900 placeholder-slate-400 bg-transparent outline-none"
                  type={showPwd ? "text" : "password"}
                  id="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-2 inline-flex items-center justify-center rounded-md p-2 text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {/* eye icons */}
                  {showPwd ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3.98 8.223a10.477 10.477 0 0 0-.727 1.018C2.518 10.217 2.25 11 2.25 11s2.25 6.75 9.75 6.75c1.51 0 2.89-.252 4.103-.674M9.879 9.879A3 3 0 1 0 14.12 14.12M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M2.25 12s2.25-6.75 9.75-6.75S21.75 12 21.75 12 19.5 18.75 12 18.75 2.25 12 2.25 12z" />
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Minimum 7 characters recommended
                </p>
                {/* will add soon  */}
                {/* <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link> */}
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={onLogin}
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
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/60" />
            <span className="text-xs text-slate-500">or</span>
            <div className="h-px flex-1 bg-white/60" />
          </div>

          {/* Secondary actions (optional) */}
          <div className="flex items-center justify-between text-sm">
            <div className="text-slate-600">
              New here?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Create an account
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
