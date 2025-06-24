import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className=" flex ">
      <h2 className=" ">MySite</h2>
      <ul className="flex flex-row">
        <li  className=' sm:bg-green-500'><Link to="/">Home</Link></li>
        <li className='hover:bg-green-500'><Link to="/about">About</Link></li>
        <li className='hover:bg-green-500'><Link to="/profile">Profile</Link></li>
        <li className='hover:bg-green-500'><Link to="/recipe">Recipes</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
