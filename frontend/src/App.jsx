import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import RecipeDetails from './pages/RecipeDetails';
import MyRecipes from './pages/MyRecipes';
import NavBar from './components/NavBar';
import './index.css'
import './App.css';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';


function App() {

  return (
    <>
    <h1 className='text-yellow-800'> cool</h1>
      <NavBar />
      <Routes><Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path='/add' element={<PrivateRoute><AddRecipe/></PrivateRoute>}/>
        <Route path='/my-recipes' element={<PrivateRoute><MyRecipes/></PrivateRoute>}/>
      </Routes>
    </>
  );
}

export default App;
