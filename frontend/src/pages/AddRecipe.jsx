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
    <div className='container mx-auto p-4 flex content-center '>
      <h1 className='font-bold text-8xl'>Add a New Recipe</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form encType="multipart/form-data">
            <div>
              <label className='font-bold'>Title</label><br/>
              <Field name="title" className='border-2 h-6' /><br/>
              <ErrorMessage name="title" component="div" />
            </div>

            <div>
              <label className='font-bold '>Description</label><br/>
              <Field name="description"className='border-2 h-6' as="textarea" />
              <ErrorMessage name="description" component="div" />
            </div>

            <div>
              <label className='font-bold'>Ingredients</label>
              <FieldArray name="ingredients">
                {({ remove, push }) => (
                  <div>
                    {values.ingredients.map((ing, index) => (
                      <div key={index}>
                        <Field name={`ingredients[${index}]`} className='border-2 h-6'/>
                        <button className='text-white font-semibold border-none sm:bg-green-900   hover:bg-green-500'type="button" onClick={() => remove(index)}>
                          - Remove
                        </button>
                      </div>
                    ))}
                    <button className=' text-white border-none sm:bg-green-900   hover:bg-green-500 font-semibold'type="button" onClick={() => push('')}>
                      Add Ingredient
                    </button>
                  </div>
                )}
              </FieldArray>
              <ErrorMessage name="ingredients" component="div" />
            </div>

            <div>
              <label className='font-bold'>Image</label><br/>
              <input className='border-2 h-52'
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue('image', file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
              {preview && <img className= ' h-52 border' src={preview} alt="preview" width="200px" />}
              <ErrorMessage name="image" component="div" />
            </div>

            <button  className='font-semibold text-white border-none sm:bg-green-900   hover:bg-green-500' type="submit">Submit Recipe</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipe;
