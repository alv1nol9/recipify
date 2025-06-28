import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

const API = 'http://localhost:5000/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('🚫 No token found — user must be logged in');
      window.location.href = '/login';
      return;
    }

    fetch(`${API}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          console.error('❌ Expected an array of recipes, got:', data);
          setRecipes([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Failed to fetch recipes:', err);
        if (err.message.includes('401')) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          setRecipes([]);
          setLoading(false);
        }
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-purple-700 mb-8">
          🍽️ All Recipes
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes found. Start by adding one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
