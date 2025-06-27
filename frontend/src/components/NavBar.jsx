import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:space-x-6 text-lg sm:text-xl font-semibold">
          <Link to="/" className="hover:text-purple-200 transition duration-200">
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/add" className="hover:text-purple-200 transition duration-200">
                Add Recipe
              </Link>
              <Link to="/my-recipes" className="hover:text-purple-200 transition duration-200">
                My Recipes
              </Link>
            </>
          )}
        </div>

        <div className="flex gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-white text-pink-600 font-bold px-4 py-2 rounded-full hover:bg-pink-100 transition shadow"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-purple-600 font-bold px-4 py-2 rounded-full hover:bg-purple-100 transition shadow"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-white text-pink-600 font-bold px-4 py-2 rounded-full hover:bg-pink-100 transition shadow"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
