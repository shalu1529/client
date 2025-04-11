// import Link from 'next/link';

// export default function PostCard({ post }) {
//   return (
//     <div className="border p-4 rounded shadow hover:shadow-md transition">
//       <h2 className="text-xl font-semibold">{post.title}</h2>
//       <p className="text-gray-600 line-clamp-2">{post.content}</p>
//       <Link href={`/posts/${post._id}`} className="text-blue-500 mt-2 inline-block">Read More</Link>
//     </div>
//   );
// }


// import Link from 'next/link';

// export default function PostCard({ post }) {
//   return (
//     <div className="w-full max-w-sm p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white transition duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.15)]">
//       <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
//       <p className="text-gray-600 line-clamp-2 mt-2">{post.content}</p>
//       <Link
//         href={`/posts/${post._id}`}
//         className="text-blue-600 mt-4 inline-block font-medium hover:underline"
//       >
//         Read More →
//       </Link>
//     </div>
//   );
// }



import Link from 'next/link';

export default function PostCard({ post }) {
  const createdAt = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-sm p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white transition duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.15)] flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
        <p className="text-gray-600 line-clamp-2 mt-2">{post.content}</p>
        <Link
          href={`/posts/${post._id}`}
          className="text-blue-600 mt-4 inline-block font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>

      {/* Created Date Bottom-Right */}
      <div className="mt-4 text-right text-sm text-gray-400">
        {createdAt}
      </div>
    </div>
  );
}
