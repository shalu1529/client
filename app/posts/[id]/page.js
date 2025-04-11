"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";

export default function SinglePostPage(props) {
  const { id } = use(props.params); 
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        cache: "no-store",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        setPost(null);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      alert("Post deleted successfully");
      router.push("/posts");
    } else {
      alert("Failed to delete post.");
    }
  };

  if (!post) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        Post not found!
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center">
      
      <div className="text-left mb-6">
        <Link href="/posts" className="text-blue-500 hover:underline inline-block">
          ← Back to Posts
        </Link>
      </div>

      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

    
      <div className="flex flex-col items-center mb-6">
        <FaUserCircle className="text-5xl text-gray-500" />
        <p className="text-gray-700 mt-2 font-medium">
          {post.author?.name || "Unknown Author"}
        </p>
      </div>

      
      <div className="flex justify-between items-center text-gray-600 mb-4">
        <p>
          <span className="font-semibold">Category:</span>{" "}
          <span className="capitalize">{post.category}</span>
        </p>
        <div className="flex gap-3">
          <Link href={`/posts/edit/${post._id}`}>
            <div className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full cursor-pointer transition">
              <FaEdit className="text-lg" />
            </div>
          </Link>
          <button onClick={handleDelete}>
            <div className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full cursor-pointer transition">
              <FaTrash className="text-lg" />
            </div>
          </button>
        </div>
      </div>

      
      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line text-left">
        {post.content}
      </p>
    </div>
  );
}
