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
        const likeRes = await fetch(`${API}/likes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const liked = await likeRes.json();

        const allRes = await fetch(`${API}/recipes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allRecipes = await allRes.json();

        const likedRecipeList = allRecipes.filter(r =>
          liked.some(like => like.recipe_id === r.id)
        );

        setRecipes(likedRecipeList);
      } catch (err) {
        console.error('Failed to load liked recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedRecipes();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Liked Recipes 💖</h1>

      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>You haven’t liked any recipes yet.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedRecipes;
