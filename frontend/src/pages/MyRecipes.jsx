import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { isLoggedIn } from '../utils/auth';

const API = import.meta.env.VITE_API_URL;


const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('token');
    let currentUserId = null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      currentUserId = payload.identity;
    } catch (err) {
      console.error('Invalid token:', err);
      localStorage.removeItem('token');
      navigate('/login');
      return;
    }

    fetch(`${API}/my-recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load recipes:', err);
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 py-8 px-4 sm:px-6 lg:px-16">
      <h1 className="text-5xl text-purple-700 font-bold text-center mb-8 font-mono">My Recipes</h1>

      {loading ? (
        <p className="text-center text-lg text-gray-700">Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="text-center text-lg text-gray-700">You haven’t added any recipes yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
