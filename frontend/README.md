# 🧑‍🍳 Recipify

**Recipify** is a full-stack recipe sharing application where users can register, log in, upload recipes with images, and interact through likes and comments.

## 🌐 Live Demo

> Deployed Frontend: [https://recipify.vercel.app](https://recipify.vercel.app)  
> Deployed Backend: [https://recipify-api.onrender.com](https://recipify-api.onrender.com)

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Router

### Backend
- Flask
- Flask-JWT-Extended (authentication)
- Flask-SQLAlchemy + PostgreSQL
- Flask-CORS
- Cloudinary (or local uploads for images)

---

## 🔐 Features

- User Registration & Login (JWT Auth)
- Add, View, Edit & Delete Recipes
- Upload Recipe Images
- Comment on Recipes
- Like/Unlike Recipes
- View Recipe Details

---

## 🚀 Running Locally

### Backend (Flask)
```bash
cd recipify_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
flask run
