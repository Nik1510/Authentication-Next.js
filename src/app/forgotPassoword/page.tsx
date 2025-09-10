"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      // Fixed: Added leading slash to make it an absolute path
      const response = await axios.post("/api/users/forgotPassword", { email });
      setMessage("If the email exists, a reset link has been sent");
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-xl font-semibold mb-4">Forgot password</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="name@example.com"
          />
        </label>
        <button
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
      {message && <p className="mt-3 text-green-700">{message}</p>}
      {error && <p className="mt-3 text-red-700">{error}</p>}
      
      <div className="mt-4 text-center">
        <button
          onClick={() => router.push('/login')}
          className="text-sm text-blue-600 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </main>
  );
}