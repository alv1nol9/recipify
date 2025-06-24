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

 const handleSubmit = (values, { resetForm }) => {
  const fakeUser = 'alvin'; // simulate logged-in user

  const newRecipe = {
    id: Date.now(),
    title: values.title,
    description: values.description,
    ingredients: values.ingredients,
    image_url: preview, // use preview as the fake uploaded image
    user: fakeUser,
  };

  const existing = JSON.parse(localStorage.getItem('recipes') || '[]');
  existing.push(newRecipe);
  localStorage.setItem('recipes', JSON.stringify(existing));

  alert('Recipe added successfully!');
  resetForm();
  setPreview(null);
};


  return (
    <div className='container mx-auto p-4 '>
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
              {preview && <img className= 'xl:w-16' src={preview} alt="preview" width="200px" />}
              <ErrorMessage name="image" component="div" />
            </div>

            <button  className='font-bold  box-border border sm:bg-yellow-900 border-black rounded hover:bg-yellow-500'type="submit">Submit Recipe</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipe;
