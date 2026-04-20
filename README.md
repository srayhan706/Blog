# 📝 Blog Platform (FastAPI + React + PostgreSQL)

A full-stack blog application built using **FastAPI (backend)**, **React (frontend)**, and **PostgreSQL (database)** with secure **JWT authentication**. This project demonstrates modern web development practices including REST APIs, authentication, and full-stack integration.

---

## 🚀 Features

- 🔐 User authentication (Register / Login)
- 🪪 JWT-based authorization
- ✍️ Create, update, delete blog posts
- 📖 View all posts and individual post details
- 👤 User-specific post management
- 🗄️ PostgreSQL database integration
- ⚡ FastAPI backend with automatic API docs
- 🎨 React frontend (modern UI)

---

## 🏗️ Tech Stack

### Backend
- FastAPI
- SQLAlchemy / ORM
- PostgreSQL
- JWT (JSON Web Tokens)
- Pydantic

### Frontend
- React
- Axios
- React Router

### Database
- PostgreSQL

---

## 📁 Project Structure

Blog/
│
├── backend/
│ ├── app/
│ │ ├── routers/
│ │ ├── models/
│ │ ├── schemas/
│ │ ├── auth/
│ │ └── main.py
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js
│ └── package.json
│
└── README.md



---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/srayhan706/Blog-FastAPI-React-Learning-.git
cd Blog-FastAPI-React-Learning-


2️⃣ Backend Setup (FastAPI)
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt
Run backend
uvicorn app.main:app --reload

📍 Backend runs at:

http://127.0.0.1:8000

📚 API docs:

http://127.0.0.1:8000/docs
3️⃣ Frontend Setup (React)
cd frontend
npm install
npm start

📍 Frontend runs at:

http://localhost:3000
🔐 Authentication Flow
User registers or logs in
Backend returns a JWT token
Token is stored in frontend (localStorage/session)
Token is sent in headers for protected routes
Backend validates token for authorization
🗄️ Database Setup (PostgreSQL)

Update your .env file in backend:

DATABASE_URL=postgresql://username:password@localhost:5432/blogdb
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30