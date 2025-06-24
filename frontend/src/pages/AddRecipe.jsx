import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const AddRecipe = () => {
  const [preview, setPreview] = useState(null);

  const initialValues = {
    title: '',
    description: '',
    ingredients: [''],
    image: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    ingredients: Yup.array().of(Yup.string().required('Required')),
    image: Yup.mixed().required('Image is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    values.ingredients.forEach((ingredient, i) =>
      formData.append(`ingredients[${i}]`, ingredient)
    );
    formData.append('image', values.image);

    try {
      const res = await fetch('http://localhost:5000/recipes', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to submit');
      alert('Recipe added!');
      resetForm();
      setPreview(null);
    } catch (err) {
      console.error('Submission error:', err);
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
          <Form encType="multipart/form-data">
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
              <label>Ingredients</label>
              <FieldArray name="ingredients">
                {({ remove, push }) => (
                  <div>
                    {values.ingredients.map((ing, index) => (
                      <div key={index}>
                        <Field name={`ingredients[${index}]`} />
                        <button type="button" onClick={() => remove(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => push('')}>
                      Add Ingredient
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="ingredients" component="div" />
            </div>

            <div>
              <label>Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue('image', file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
              {preview && <img src={preview} alt="preview" width="200px" />}
              <ErrorMessage name="image" component="div" />
            </div>

            <button type="submit">Submit Recipe</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipe;
