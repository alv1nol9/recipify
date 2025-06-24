// components/NavBar.jsx
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav>
    <Link to="/">Home</Link> | 
    <Link to="/add">Add Recipe</Link> | 
    <Link to="/my-recipes">My Recipes</Link>
  </nav>
);

export default NavBar;
