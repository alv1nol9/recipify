import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({recipe}) => {
  
    <div className='card'>
      <h3>{recipe.title}</h3>
      <img src={recipe.image_url} alt="#" className='recipe-image' />
      <p>{recipe.description}</p>
     <Link to={`/recipes/${recipe.id}`}>View Details</Link>
    </div>
  
}

export default RecipeCard