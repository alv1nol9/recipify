// components/NavBar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">MySite</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/recipe">Recipes</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
