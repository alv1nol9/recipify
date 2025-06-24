// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import RecipeDetails from './pages/RecipeDetails';
import MyRecipes from './pages/MyRecipes';
import Navbar from './components/Navbar';
<<<<<<< HEAD
import './index.css'
const App = () => {
=======

function App() {
>>>>>>> dccfe41009714b91acc0eff00c5ad39906450b2c
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
