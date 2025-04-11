"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';


export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json(); 
        localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); 
      window.dispatchEvent(new Event('userLogin')); 
        router.push("/");
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      

      
      <h1 className="text-white text-3xl font-bold mb-6">Login to your account</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="name@domain.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-gray-800 text-white p-3 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-gray-800 text-white p-3 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-bold"
        >
          Login
        </button>

        <p className="mt-4 text-center text-white">
          Don't have an account? <Link href="/register" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
