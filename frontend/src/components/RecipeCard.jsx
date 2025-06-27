import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const RecipeCard = ({ recipe }) => {
  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/likes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const likedIds = data.map(l => l.recipe_id);
        setLiked(likedIds.includes(recipe.id));
      })
      .catch(err => console.error('Like check failed', err));
  }, [recipe.id]);

  const toggleLike = async () => {
    if (!token) return;
    const url = `${API}/likes/${recipe.id}`;
    const method = liked ? 'DELETE' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) setLiked(!liked);
    else alert('Failed to toggle like');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-full sm:w-72 transition hover:shadow-xl">
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="w-full h-44 object-cover rounded-xl mb-3 border border-purple-200"
      />
      <h2 className="text-xl font-semibold text-purple-700 mb-2 truncate">{recipe.title}</h2>
      <div className="flex justify-between items-center">
        <button
          onClick={toggleLike}
          className={`text-sm px-3 py-1 rounded-full transition ${
            liked ? 'bg-pink-500 text-white' : 'bg-purple-200 text-purple-800'
          } hover:opacity-90`}
        >
          {liked ? '💖 Unlike' : '🤍 Like'}
        </button>
        <Link
          to={`/recipes/${recipe.id}`}
          className="text-sm text-pink-600 hover:underline"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;

