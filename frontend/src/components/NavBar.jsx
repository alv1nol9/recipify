
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiSilverware } from '@mdi/js';

const NavBar = () => (
  <nav className='flex justify-start text-4xl space-x-8 sm:bg-green-900 h-14'>
   <div className='flex justify-start'>
     <div><Icon className='bg-indigo-700 '  path={mdiSilverware} size={2} /></div>
     </div>
    <span className='hover:text-green-300 text-sm text-white border-black sans-serif p-5'><Link to="/"> <strong>Home</strong></Link> </span>
    <span className=' hover:text-green-300 text-sm text-white border-black sans-serif p-5'><Link to="/add"><strong>Add Recipe</strong></Link></span>
    <span className='hover:text-green-300 text-sm text-white border-black sans-serif p-5'><Link to="/my-recipes"><strong>My Recipes</strong></Link></span>
  </nav>
);


export default NavBar;
