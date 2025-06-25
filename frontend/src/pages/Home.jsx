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

  return (
    <div>
      <h1>All Recipes</h1>
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
      
      )}
    </div>
  );
};

export default Home;
