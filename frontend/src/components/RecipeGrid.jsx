import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeGrid = ({ food }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/recipes/${food.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("Recipe deleted!");
      navigate("/my-recipes");
    } else {
      alert("Failed to delete the recipe.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full sm:w-96 transition hover:shadow-lg">
      <img
        src={food.image_url}
        alt={food.title}
        className="w-full h-52 object-cover rounded-xl mb-3 border border-purple-200"
      />
      <h2 className="text-2xl font-semibold text-purple-700 truncate">{food.title}</h2>
      <p className="text-sm text-gray-600 mt-2 mb-4 line-clamp-3">{food.instructions || food.description}</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleDelete}
          className="bg-pink-500 hover:bg-pink-400 text-white px-4 py-1 rounded-full text-sm"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(`/recipes/edit/${food.id}`)}
          className="bg-purple-500 hover:bg-purple-400 text-white px-4 py-1 rounded-full text-sm"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default RecipeGrid;
