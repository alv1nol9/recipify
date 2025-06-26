import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex justify-center text-4xl space-x-3">
      <span className="hover:bg-green-400 sm:bg-green-500 border-black font-sans">
        <Link to="/"><strong>Home</strong></Link>
      </span>
      |
      <span className="hover:bg-green-400 border-black font-sans">
        <Link to="/add"><strong>Add Recipe</strong></Link>
      </span>
      |
      <span className="hover:bg-green-400 border-black font-sans">
        <Link to="/my-recipes"><strong>My Recipes</strong></Link>
      </span>
      |
      <button
        onClick={handleLogout}
        className="hover:bg-red-400 border-black font-sans text-2xl px-2"
      >
        <strong>Logout</strong>
      </button>
    </nav>
  );
};

export default NavBar;
