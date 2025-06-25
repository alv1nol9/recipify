import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then(res => res.json())
      .then(setRecipe)
      .catch(err => console.error('there was an error loading the recipe', err));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image_url} alt={recipe.title} style={{ width: '400px', borderRadius: '10px' }} />
      <p>{recipe.description}</p>

            <h4>Vitu za kutumia</h4>
        <ul>
        {recipe.ingredients?.map((i, index) => (
            <li key={index}>{i}</li>
        ))}
        </ul>

      <hr />

      <h3 className=''>Comments</h3>
      <CommentForm onAddComment={handleAddComment} />

      <ul>
        {comments.map((c) => (
          <li key={c.id}>{c.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetails;
