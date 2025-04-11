"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
    

    
      <h1 className="text-white text-3xl font-bold mb-6">Sign up to start listening</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="name">Username</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your username"
            className="w-full bg-gray-800 text-white p-3 rounded"
            required
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@domain.com"
            className="w-full bg-gray-800 text-white p-3 rounded"
            required
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="w-full bg-gray-800 text-white p-3 rounded"
            required
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded font-bold">
          Sign Up
        </button>

        <p className="mt-4 text-center text-white">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
}
