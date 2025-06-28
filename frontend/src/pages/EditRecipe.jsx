import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${API}/recipes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setInitialValues({
          title: data.title,
          description: data.description || '',
          ingredients: data.ingredients?.split(',').map(i => i.trim()) || [''],
          instructions: data.instructions || '',
          image_url: data.image_url || '',
        });
      })
      .catch(err => console.error('Failed to fetch recipe:', err));
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    instructions: Yup.string().required('Instructions are required'),
    ingredients: Yup.array().of(Yup.string().required('Required')),
    image_url: Yup.string().url('Must be a valid URL').required('Image URL is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(`${API}/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          ingredients: values.ingredients.join(','),
        }),
      });

      if (!res.ok) throw new Error('Update failed');
      alert('✅ Recipe updated!');
      navigate(`/recipes/${id}`);
    } catch (err) {
      console.error('Error updating recipe:', err);
      alert('Failed to update recipe.');
    }
  };

  if (!initialValues) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-purple-700">Edit Recipe</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
              <label className="font-semibold text-pink-600">Image URL</label>
              <Field
                name="image_url"
                className="border rounded px-3 py-2 w-full mt-1"
              />
              <ErrorMessage name="image_url" component="div" className="text-red-500 text-sm" />
              {values.image_url && (
                <img src={values.image_url} alt="preview" className="h-40 mt-4 border rounded-lg mx-auto" />
              )}
            </div>

            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-500 text-white py-2 px-6 rounded-full font-bold w-full transition"
            >
              Update Recipe
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditRecipe;
