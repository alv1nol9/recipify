// pages/Home.jsx
import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then((res) => res.json())
      .then(setRecipes);
  }, []);

  const filteredRecipes = recipes.filter((r) =>
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>All Recipes</h1>

      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
      />

      {filteredRecipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
};

export default Home;
