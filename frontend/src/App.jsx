// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import RecipeDetails from './pages/RecipeDetails';
import MyRecipes from './pages/MyRecipes';
import Navbar from './components/Navbar';

import './index.css'
import './App.css';


function App() {

  return (
    <>
    <h1 className='text-yellow-800'> cool</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
      </Routes>
    </>
  );
}

export default App;
