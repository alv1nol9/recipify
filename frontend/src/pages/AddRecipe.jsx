import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const AddRecipe = () => {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login'); // block unauthenticated users
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
    <div>
      <h1>Add a New Recipe</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div>
              <label>Title</label>
              <Field name="title" />
              <ErrorMessage name="title" component="div" />
            </div>

            <div>
              <label>Description</label>
              <Field name="description" as="textarea" />
              <ErrorMessage name="description" component="div" />
            </div>

            <div>
              <label>Instructions</label>
              <Field name="instructions" as="textarea" />
              <ErrorMessage name="instructions" component="div" />
            </div>

            <div>
              <label>Ingredients</label>
              <FieldArray name="ingredients">
                {({ remove, push }) => (
                  <div>
                    {values.ingredients.map((_, index) => (
                      <div key={index}>
                        <Field name={`ingredients[${index}]`} />
                        <button type="button" onClick={() => remove(index)}>Remove</button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push('')}>Add Ingredient</button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="ingredients" component="div" />
            </div>

            <div>
              <label>Image URL</label>
              <Field
                name="image_url"
                onChange={(e) => {
                  setFieldValue('image_url', e.target.value);
                  setPreview(e.target.value);
                }}
              />
              {preview && <img src={preview} alt="preview" width="200px" />}
              <ErrorMessage name="image_url" component="div" />
            </div>

            <button type="submit">Submit Recipe</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipe;
