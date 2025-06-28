import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { isLoggedIn } from '../utils/auth';

const API = import.meta.env.VITE_API_URL;


const AddRecipe = () => {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !isLoggedIn()) {
      navigate('/login');
    }
  }, []);

  const initialValues = {
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    image_url: '',
    image: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    instructions: Yup.string().required('Instructions are required'),
    ingredients: Yup.array().of(Yup.string().required('Required')),
    image_url: Yup.string().url('Must be a valid URL'),
  });

  const uploadImage = async (file, token) => {
    if (!file) throw new Error('No image file selected');

    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Image upload failed');
    return data.url;
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem('token');
      let image_url = values.image_url;

      if (values.image) {
        image_url = await uploadImage(values.image, token);
      }

      const res = await fetch(`${API}/recipes`, {
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
          image_url,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to submit recipe');
      }

      alert('✅ Recipe added!');
      resetForm();
      setPreview(null);
      navigate('/');
    } catch (err) {
      console.error('🚨 Error in submit handler:', err);
      alert('There was a problem submitting the recipe.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-purple-700">Add a New Recipe</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-5">
            <div>
              <label className="font-semibold text-pink-600">Title</label>
              <Field name="title" className="border rounded px-3 py-2 w-full mt-1" />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="font-semibold text-pink-600">Description</label>
              <Field name="description" as="textarea" rows={3} className="border rounded px-3 py-2 w-full mt-1" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="font-semibold text-pink-600">Instructions</label>
              <Field name="instructions" as="textarea" rows={5} className="border rounded px-3 py-2 w-full mt-1" />
              <ErrorMessage name="instructions" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="font-semibold text-pink-600">Ingredients</label>
              <FieldArray name="ingredients">
                {({ remove, push }) => (
                  <div className="space-y-2 mt-1">
                    {values.ingredients.map((_, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Field name={`ingredients[${index}]`} className="border rounded px-3 py-2 w-full" />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500 text-xl"
                        >
                          −
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push('')}
                      className="text-purple-600 mt-2 font-semibold"
                    >
                      + Add Ingredient
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div>
              <label className="font-semibold text-pink-600">Upload Image (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFieldValue('image', file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="border rounded px-3 py-2 w-full mt-1"
              />
            </div>

            <div>
              <label className="font-semibold text-pink-600">Or Paste Image URL</label>
              <Field
                name="image_url"
                className="border rounded px-3 py-2 w-full mt-1"
                onChange={(e) => {
                  setFieldValue('image_url', e.target.value);
                  setPreview(e.target.value);
                }}
              />
              <ErrorMessage name="image_url" component="div" className="text-red-500 text-sm" />
            </div>

            {preview && (
              <div className="mt-4">
                <img src={preview} alt="preview" className="h-40 border rounded-lg mx-auto" />
              </div>
            )}

            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-500 text-white py-2 px-6 rounded-full font-bold w-full transition"
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
