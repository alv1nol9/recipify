

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
      <h1 className='flex justify-center font-bold text-3xl'>My Recipes</h1>
      {myRecipes.length === 0 ? (
        <p className='font-bold text-yellow-500 flex justify-center' >No recipes added yet</p>
      ) : (
        myRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
    </div>
  );
};

export default MyRecipes;
