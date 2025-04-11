'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    };

    fetchUser();
    window.addEventListener('userLogin', fetchUser);
    return () => window.removeEventListener('userLogin', fetchUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowProfile(false);
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Blogify</Link>

    
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/posts"
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">BlogPost</Link>
        {user ? (
          <>
            <Link href="/createPost"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Create Post</Link>
            <Link href="/dashboard"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Dashboard</Link>
            
            <FaUserCircle
              size={28}
              className="cursor-pointer"
              onClick={() => setShowProfile(true)}
            />


          </>
        ) : (
          <Link href="/login"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Login</Link>
        )}
      </div>

      
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center space-y-4 py-4 md:hidden z-40">
          <Link href="/posts" onClick={() => setMenuOpen(false)}>BlogPost</Link>
          {user ? (
            <>
              <Link href="/createPost" onClick={() => setMenuOpen(false)}>Create Post</Link>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <FaUserCircle
                size={28}
                className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
                onClick={() => {
                  setShowProfile(true);
                  setMenuOpen(false);
                }}
              />
            </>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}

  
      {showProfile && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 w-80 relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <FaTimes />
            </button>
            <div className="flex flex-col items-center">
              <FaUserCircle size={48} className="mb-2" />
              <span className="font-semibold text-lg mb-4">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded w-full"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
