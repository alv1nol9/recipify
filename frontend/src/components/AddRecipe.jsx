import React, { useState } from 'react';

const AddRecipe = () => {
  const [f, setF] = useState({
    title: '',
    recipe: '',
    description: '',
    images: [],
  });

  const [loading, setLoading] = useState(false);

  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Log in to upload images');
    }

    // Upload logic goes here
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setF({ ...f, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Submit logic here
  };

  return (
    <div>
      <h1>Add a new food</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={f.title}
          onChange={(e) => setF({ ...f, title: e.target.value })}
          placeholder="Name"
        />
        <input
          type="text"
          value={f.description}
          onChange={(e) => setF({ ...f, description: e.target.value })}
          placeholder="Description"
        />
        <input
          type="text"
          value={f.recipe}
          onChange={(e) => setF({ ...f, recipe: e.target.value })}
          placeholder="Recipe"
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
