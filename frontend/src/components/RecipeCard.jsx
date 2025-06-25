import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likes') || '{}');
    setLikes(storedLikes[recipe.id] || 0);
  }, [recipe.id]);

  const handleLike = () => {
    const storedLikes = JSON.parse(localStorage.getItem('likes') || '{}');
    const newLikes = (storedLikes[recipe.id] || 0) + 1;
    storedLikes[recipe.id] = newLikes;
    localStorage.setItem('likes', JSON.stringify(storedLikes));
    setLikes(newLikes);
  };

  return (
    <div>
      <img src={recipe.image_url} alt={recipe.title} width="250" />
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <p className='text-blue-900'>Likes: {likes}</p>
      <button onClick={handleLike}>👍 Like</button>
      <br />
      <Link to={`/recipes/${recipe.id}`}>View</Link>
    </div>
  );
};

export default RecipeCard;
