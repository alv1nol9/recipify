import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const AddRecipe = () => {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, []);

  const initialValues = {
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    image_url: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    instructions: Yup.string().required('Instructions are required'),
    ingredients: Yup.array().of(Yup.string().required('Required')),
    image_url: Yup.string().url('Must be a valid URL').required('Image URL is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          ingredients: values.ingredients.join(','),
          instructions: values.instructions,
          image_url: values.image_url,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');
      alert('Recipe added!');
      resetForm();
      setPreview(null);
      navigate('/');
    } catch (err) {
      console.error('Error:', err);
      alert('There was a problem submitting the recipe.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-4xl mb-4">Add a New Recipe</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label className="font-bold">Title</label>
              <Field name="title" className="border p-1 w-full" />
              <ErrorMessage name="title" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label className="font-bold">Description</label>
              <Field name="description" as="textarea" className="border p-1 w-full" />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label className="font-bold">Instructions</label>
              <Field name="instructions" as="textarea" className="border p-1 w-full" />
              <ErrorMessage name="instructions" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label className="font-bold">Ingredients</label>
              <FieldArray name="ingredients">
                {({ remove, push }) => (
                  <div>
                    {values.ingredients.map((_, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <Field name={`ingredients[${index}]`} className="border p-1 w-full" />
                        <button type="button" onClick={() => remove(index)} className="text-red-600 font-bold">−</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push('')} className="text-green-700 font-bold">
                      + Add Ingredient
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="ingredients" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label className="font-bold">Image URL</label>
              <Field
                name="image_url"
                className="border p-1 w-full"
                onChange={(e) => {
                  setFieldValue('image_url', e.target.value);
                  setPreview(e.target.value);
                }}
              />
              {preview && <img src={preview} alt="preview" className="h-40 mt-2 border" />}
              <ErrorMessage name="image_url" component="div" className="text-red-500" />
            </div>

            <button
              type="submit"
              className="bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded font-semibold"
            >
              Submit Recipe
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipe;
