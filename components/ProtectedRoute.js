"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      router.push("/login"); // or your login route
    }
  }, []);

  return children;
}

