import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const API = 'https://recipify-backend-ewh5.onrender.com/api';

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ password: data.error || 'Login failed' });
        return;
      }

      localStorage.setItem('token', data.access_token);
      navigate('/my-recipes');
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ password: 'Server error. Try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">Login to Recipify</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-purple-600">Username</label>
              <Field
                name="username"
                className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-pink-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-purple-600">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-pink-600 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold py-2 rounded transition duration-200"
            >
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
