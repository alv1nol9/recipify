import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import AddRecipe from './components/AddRecipe';
import ProfilePage from './components/ProfilePage';
import Navbar from './components/Navbar';
import './index.css'
const App = () => {
  return (
    <>
    <h1 className='text-yellow-800'> cool</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe" element={<AddRecipe />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
