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
    <div className="container mx-auto p-4   ">
      <h1 className="font-bold text-8xl font-mono tracking-tighter">All Recipes</h1>
      <div className='flex flex-wrap space-x-9'>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

    </div>
  );
};

export default Home;
