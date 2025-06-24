import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const currentUser = 'alvin';
    const stored = JSON.parse(localStorage.getItem('recipes') || '[]');
    const mine = stored.filter((r) => r.user === currentUser);
    setMyRecipes(mine);
  }, []);

  return (
    <div>
      <h1>My Recipes</h1>
      {myRecipes.length === 0 ? (
        <p>No recipes added yet</p>
      ) : (
        myRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
    </div>
  );
};

export default MyRecipes;
