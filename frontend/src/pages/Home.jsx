import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        title: 'Spaghetti Bolognese',
        description: 'Classic pasta dish',
        ingredients: ['pasta', 'tomato', 'meat'],
        image_url: 'https://picsum.photos/400/300?random=1',
      },
      {
        id: 2,
        title: 'Burger Deluxe',
        description: 'Beef burger with cheese and bacon',
        ingredients: ['bun', 'beef', 'cheese'],
        image_url: 'https://picsum.photos/400/300?random=2',
      },
      {
        id: 3,
        title: 'Nyama Choma',
        description: 'Grilled Kenyan-style meat',
        ingredients: ['goat meat', 'salt', 'lemon'],
        image_url: 'https://picsum.photos/400/300?random=3',
      },
    ];

    setRecipes(fakeData);
  }, []);

  console.log("🍝 Recipes loaded:", recipes);

  return (
    <div className="container mx-auto p-4  ">
      <h1 className="font-bold text-8xl font-mono tracking-tighter">All Recipes</h1>
      <div>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
