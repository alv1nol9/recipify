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
      .catch(err => console.error('💔 Like check failed', err));
  }, [recipe.id]);

  const toggleLike = async () => {
    if (!token) return alert('Please log in to like recipes.');
    const url = `${API}/likes/${recipe.id}`;
    const method = liked ? 'DELETE' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) setLiked(!liked);
      else alert('Failed to toggle like');
    } catch (err) {
      console.error('Toggle like failed:', err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/recipes/${recipe.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Recipe deleted.");
        window.location.reload(); // or notify parent to update UI
      } else {
        alert("Failed to delete recipe.");
      }
    } catch (err) {
      console.error("🗑️ Delete failed:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 w-full sm:w-72 transition hover:shadow-xl">
      <img
        src={
          recipe.image_url
            ? `http://localhost:5000${recipe.image_url}`
            : 'https://via.placeholder.com/400x300?text=No+Image'
        }
        alt={recipe.title}
        className="w-full h-44 object-cover rounded-xl mb-3 border border-purple-200"
      />
      <h2 className="text-xl font-semibold text-purple-700 mb-2 truncate">{recipe.title}</h2>
      <div className="flex flex-col gap-2 items-start">
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
        <button
          onClick={handleDelete}
          className="text-sm px-3 py-1 rounded-full bg-red-500 text-white hover:bg-red-600"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
