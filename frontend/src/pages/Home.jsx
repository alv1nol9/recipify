import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const API = 'http://localhost:5000/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('🚫 No token found — user must be logged in');
      return;
    }

    fetch(`${API}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log("🍝 Real recipes loaded:", data);
        setRecipes(data);
      })
      .catch(err => {
        console.error('❌ Failed to fetch recipes:', err);
      });
  }, []);


  console.log("🍝 Recipes loaded:", recipes);

 return (
  <div className="container mx-auto px-4 py-6">
    <h1 className="text-4xl sm:text-5xl font-bold text-center text-purple-700 mb-8">
      🍽️ All Recipes
    </h1>

    {recipes.length === 0 ? (
      <p className="text-center text-gray-500">No recipes found. Start by adding one!</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    )}
  </div>
);

};

export default Home;
