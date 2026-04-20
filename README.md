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

```text
Blog/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── auth/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
│
└── README.md