import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { isLoggedIn } from '../utils/auth';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const LikedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    const fetchLikedRecipes = async () => {
      try {
        const [likesRes, recipesRes] = await Promise.all([
          fetch(`${API}/likes`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API}/recipes`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const liked = await likesRes.json();
        const allRecipes = await recipesRes.json();

        const likedRecipeList = allRecipes.filter(r =>
          liked.some(l => l.recipe_id === r.id)
        );

        setRecipes(likedRecipeList);
      } catch (err) {
        console.error('❌ Failed to load liked recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedRecipes();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 py-10 px-4 sm:px-6 lg:px-16">
      <h1 className="text-4xl font-bold text-center text-pink-600 mb-8">💖 Liked Recipes</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading liked recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t liked any recipes yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedRecipes;
