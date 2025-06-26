// src/pages/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const API = 'http://localhost:5000/api';

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
        setErrors({ password: data.message || 'Login failed' });
        return;
      }

      localStorage.setItem('token', data.token);
      navigate('/my-recipes');
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ password: 'Server error. Try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Login</h1>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="space-y-4">
          <div>
            <label>Username</label>
            <Field name="username" className="w-full border p-2" />
            <ErrorMessage name="username" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label>Password</label>
            <Field name="password" type="password" className="w-full border p-2" />
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
          </div>

          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
