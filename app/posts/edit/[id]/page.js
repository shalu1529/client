// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';

// export default function EditPostPage() {
//   const router = useRouter();
//   const { id } = useParams(); // ✅ Access id from useParams
//   const [formData, setFormData] = useState({
//     title: '',
//     category: '',
//     content: '',
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPost = async () => {
//       const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
//         credentials: 'include'
//       });
//       const post = await res.json();
//       if (post?._id) {
//         setFormData({
//           title: post.title,
//           category: post.category,
//           content: post.content,
          
//         });
//       }
//       setLoading(false);
//     };

//     if (id) fetchPost();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: 'include',
//       body: JSON.stringify(formData)
//     });

//     if (res.ok) {
//       router.push(`/posts/${id}`);
//     } else {
//       alert('Failed to update post');
//     }
//   };

//   if (loading) return <div className="text-center mt-20">Loading...</div>;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 px-4">
//       <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Post Title"
//           className="w-full border border-gray-300 p-3 rounded"
//           required
//         />
//         <textarea
//           name="content"
//           value={formData.content}
//           onChange={handleChange}
//           placeholder="Post Content"
//           rows={10}
//           className="w-full border border-gray-300 p-3 rounded"
//           required
//         />
//         <input
//           type="text"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           placeholder="Category"
//           className="w-full border border-gray-300 p-3 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        credentials: 'include'
      });
      const post = await res.json();
      if (post?._id) {
        setFormData({
          title: post.title,
          category: post.category,
          content: post.content,
        });
      }
      setLoading(false);
    };

    if (id) fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      router.push(`/posts/${id}`);
    } else {
      alert('Failed to update post');
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <ProtectedRoute>
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Post Title"
          className="w-full p-3 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Post Content"
          rows={10}
          className="w-full p-3 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded shadow-md transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
    </ProtectedRoute>
  );
}
