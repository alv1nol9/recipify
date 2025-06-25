// components/NavBar.jsx
import { Link } from 'react-router-dom';


const NavBar = () => (
  <nav className='flex justify-center  text-4xl space-x-3'>
    <span className='hover:bg-green-400 sm:bg-green-500 border-black font-sans'><Link to="/"> <strong>Home</strong></Link> </span>|
    <span className='hover:bg-green-400 border-black font-sans'><Link to="/add"><strong>Add Recipe</strong></Link></span>|
    <span className='hover:bg-green-400 border-black font-sans'><Link to="/my-recipes"><strong>My Recipes</strong></Link></span>
  </nav>
);


export default NavBar;
