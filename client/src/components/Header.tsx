import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaBlog, FaUserCircle } from 'react-icons/fa';
import car from '../assets/carlosas.jpeg';
import { axiosInstance } from '../lib/axiosInsatnce';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false); // State for profile dropdown
  const { user, setUser } = useAuth(); // Use the custom useAuth hook
  const navigate = useNavigate();

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = (): void => {
    setProfileOpen(!profileOpen);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/auth/logout');
      toast.success('Logged out successfully');
      setUser(null); // Make sure this updates the context
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold flex items-center">
            <img
              src={car}
              alt="logo-png"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="ml-2 text-2xl font-display">Carlosas</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="flex items-center hover:text-gray-300 transition-colors duration-200">
              <FaHome className="mr-1" />
              Home
            </Link>
            <Link to="/about" className="flex items-center hover:text-gray-300 transition-colors duration-200">
              <FaInfoCircle className="mr-1" />
              About
            </Link>
            <Link to="/blog" className="flex items-center hover:text-gray-300 transition-colors duration-200">
              <FaBlog className="mr-1" />
              Blog
            </Link>
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 hover:text-gray-300 transition"
                  onClick={toggleProfileMenu}
                >
                  <FaUserCircle className="text-xl" />
                  <span>{user.name || 'Profile'}</span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      View Profile
                    </Link>
                    <a
                      href="/logout"
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </NavLink>
            )}
          </nav>
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6 transition-transform duration-300 ease-in-out transform rotate-180" />
            ) : (
              <FaBars className="w-6 h-6 transition-transform duration-300 ease-in-out" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <nav className="flex flex-col items-center py-4 space-y-2">
          <Link to="/" className="flex items-center hover:text-gray-300 transition-colors duration-200">
            <FaHome className="mr-2" />
            Home
          </Link>
          <Link to="/about" className="flex items-center hover:text-gray-300 transition-colors duration-200">
            <FaInfoCircle />
            About
          </Link>
          <Link to="/blog" className="flex items-center hover:text-gray-300 transition-colors duration-200">
            <FaBlog className="mr-2" />
            Blog
          </Link>
          {user ? (
            <div className="flex flex-col items-center">
              <button
                className="flex items-center space-x-2 hover:text-gray-300 transition"
                onClick={toggleProfileMenu}
              >
                <FaUserCircle className="text-xl" />
                <span>{user.name || 'Profile'}</span>
              </button>
              {profileOpen && (
                <div className="mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-700 transition"
                  >
                    View Profile
                  </Link>
                  <a
                    href="/logout"
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-700 transition"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
