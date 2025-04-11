"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, []);

  const myPosts = posts.filter(
    (post) => post.author === user?._id || post.author?._id === user?._id
  );

  return (
    <ProtectedRoute>
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Posts</h1>

        {myPosts.length === 0 ? (
          <p className="text-gray-600">You haven't created any posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPosts.map((post) => (
              <Link
                key={post._id}
                href={`/posts/${post._id}`}
                className="bg-white border border-gray-200 shadow hover:shadow-xl transition duration-300 rounded-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {post.content.slice(0, 100)}...
                  </p>
                </div>

                
                <div className="text-right mt-4">
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
    </ProtectedRoute>
  );
}

