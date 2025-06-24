import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        title: 'Spaghetti Bolognese',
        description: 'Classic Italian pasta with meat sauce.',
        ingredients: ['pasta', 'minced beef', 'tomato sauce'],
        image_url: 'https://source.unsplash.com/400x300/?spaghetti',
      },
      {
        id: 2,
        title: 'Samosa',
        description: 'Crispy triangle snack with meat or veggie filling.',
        ingredients: ['flour', 'potato', 'peas', 'spices'],
        image_url: 'https://source.unsplash.com/400x300/?samosa',
      },
      {
        id: 3,
        title: 'Chicken Tikka',
        description: 'Grilled spicy chicken chunks with yogurt marinade.',
        ingredients: ['chicken', 'yogurt', 'spices'],
        image_url: 'https://source.unsplash.com/400x300/?chicken',
      },
    ];

    setRecipes(fakeData);
  }, []);

  return (
    <div>
      <h1>All Recipes</h1>
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
};

export default Home;
