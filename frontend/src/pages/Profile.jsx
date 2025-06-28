import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

const API = 'https://recipify-backend-ewh5.onrender.com/api';

const Profile = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  let userId = null;
  try {
    userId = token ? JSON.parse(atob(token.split('.')[1])).identity : null;
  } catch {
    localStorage.removeItem('token');
    navigate('/login');
    return;
  }

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const recipesRes = await fetch(`${API}/recipes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allRecipes = await recipesRes.json();
        const mine = allRecipes.filter((r) => r.user_id === userId);
        setMyRecipes(mine);

        const likesRes = await fetch(`${API}/likes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const likesData = await likesRes.json();
        const likedIds = likesData.map((l) => l.recipe_id);
        const liked = allRecipes.filter((r) => likedIds.includes(r.id));
        setLikedRecipes(liked);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-purple-700">👤 My Profile</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-pink-600">📌 My Recipes</h2>
        {myRecipes.length === 0 ? (
          <p>You haven’t added any recipes yet.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {myRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-pink-600">💖 Liked Recipes</h2>
        {likedRecipes.length === 0 ? (
          <p>You haven’t liked any recipes yet.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {likedRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
