import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { isLoggedIn } from '../utils/auth';


const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('token');

    fetch(`${API}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const currentUserId = JSON.parse(atob(token.split('.')[1])).sub; // decode token payload
        const userRecipes = data.filter((r) => r.user_id === currentUserId);
        setRecipes(userRecipes);
      })
      

      .catch((err) => console.error('Failed to load recipes:', err));
  }, []);
 console.log(import.meta.env.VITE_API_URL);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">My Recipes</h1>
      {recipes.length === 0 ? (
        <p>You haven’t added any recipes yet.</p>
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

export default MyRecipes;
