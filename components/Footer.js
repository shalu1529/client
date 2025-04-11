import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Blogify
          </h2>
          <p className="text-sm">
            Share your thoughts and ideas with the world. Crafted by Shalu.
          </p>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/posts" className="hover:text-white">
                Posts
              </a>
            </li>
            <li>
              <a href="/create" className="hover:text-white">
                Create Post
              </a>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: support@blogify.com</li>
            <li>Phone: +91 9876543210</li>
            <li>India</li>
          </ul>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Follow Me On
          </h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://github.com/YOUR_GITHUB"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/YOUR_LINKEDIN"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 text-center py-4 text-sm">
        © {new Date().getFullYear()} <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">Blogify</span>. All rights reserved.
      </div>
    </footer>
  );
}
