import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeGrid = ({ food }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/recipes/${food._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("Deleted!");
      navigate("/recipe");
    } else {
      alert("Failed to delete");
    }
  };

  return (
    <div>
      <div>
        <img src={food.image} alt={food.title} />
      </div>
      <div>
        <h1>{food.title}</h1>
        <p>{food.recipe}</p>
        <button className="delete" onClick={handleDelete}>Delete</button>
        <button className="update">Update</button>
      </div>
    </div>
  );
};

export default RecipeGrid;
