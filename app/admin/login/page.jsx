"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // API_KEY yang Anda pasang di backend Express (misal: ISUZU_SUPER_SECRET_2026)
    // Disimpan ke memori browser untuk digunakan setiap kali fetch ke backend
    localStorage.setItem("isuzu_admin_key", password);
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-slate-200 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-2">
          Admin Bahana Isuzu
        </h1>
        <p className="text-center text-slate-500 mb-6 text-sm">
          Masukkan kunci rahasia untuk mengakses dashboard
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Kunci Rahasia..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-slate-700 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Buka Pintu
          </button>
        </form>
      </div>
    </div>
  );
}