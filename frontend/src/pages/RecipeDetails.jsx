import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentForm from '../components/CommentForm';

const API = 'https://recipify-backend-ewh5.onrender.com/api';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = token ? JSON.parse(atob(token.split('.')[1])).identity : null;

  useEffect(() => {
    fetch(`${API}/recipes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setComments(data.comments || []);
      })
      .catch((err) => console.error('Error loading recipe:', err));
  }, [id]);

  const handleAddComment = async (text) => {
    try {
      const res = await fetch(`${API}/comments/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, { id: data.id, text, user_id: userId }]);
      } else {
        alert('Failed to post comment');
      }
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    const res = await fetch(`${API}/comments/${commentId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } else {
      alert('Failed to delete comment');
    }
  };

  const handleDeleteRecipe = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    const res = await fetch(`${API}/recipes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert('Recipe deleted');
      navigate('/');
    } else {
      alert('Failed to delete recipe');
    }
  };

  if (!recipe) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 py-8 px-4 sm:px-8 md:px-16">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-start">
          <h2 className="text-4xl font-bold text-purple-700 mb-4">{recipe.title}</h2>
          {recipe.user_id === userId && (
            <button
              onClick={handleDeleteRecipe}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              🗑️ Delete
            </button>
          )}
        </div>

        {recipe.image_url && (
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full max-h-96 object-cover rounded-md mb-4"
          />
        )}

        <p className="text-gray-700 text-md mb-4">{recipe.description}</p>

        <h4 className="text-xl text-pink-700 font-semibold mb-2">Ingredients</h4>
        <ul className="list-disc list-inside text-gray-800 mb-6">
          {recipe.ingredients?.split(',').map((i, index) => (
            <li key={index}>{i.trim()}</li>
          ))}
        </ul>

        <h3 className="text-xl text-purple-700 font-semibold mb-2">Instructions</h3>
        <p className="text-gray-800 leading-relaxed mb-6">{recipe.instructions}</p>

        <div className="border-t pt-4 mt-4">
          <h3 className="text-xl text-pink-600 font-semibold mb-2">Comments</h3>
          <CommentForm onAddComment={handleAddComment} />

          <ul className="mt-4 space-y-3">
            {comments.map((c) => (
              <li
                key={c.id}
                className="bg-purple-50 border border-purple-200 p-3 rounded-lg flex justify-between items-center"
              >
                <span className="text-gray-800">{c.text}</span>
                {c.user_id === userId && (
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
