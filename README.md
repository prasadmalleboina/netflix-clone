# 🎬 Netflix Clone – Full Stack Streaming Platform

A full-stack Netflix-inspired movie streaming web application built using React, Node.js, Express.js, MongoDB, Prisma ORM, and Tailwind CSS.

The application provides separate User and Admin functionality, including movie management, genre management, authentication, movie discovery, My List, video playback, and Continue Watching.

---

## 🚀 Features

### 👤 User Features

- User Registration & Login
- JWT-based Authentication
- Protected User Routes
- Netflix-style Home Dashboard
- Dynamic Hero Movie Banner
- Browse Movies
- Search Movies
- Filter Movies by Genre
- Trending Movies
- Top Rated Movies
- New & Popular Movies
- Movie Details
- Add Movies to My List
- Remove Movies from My List
- Movie Video Player
- Continue Watching
- Watch Progress Tracking
- Resume Playback
- User Profile
- Secure Logout

### 🛡️ Admin Features

- Secure Admin Login
- Protected Admin Dashboard
- View Registered Users
- Delete Users
- Admin Account Protection
- Add Genres
- View Genres
- Delete Genres
- Add Movies
- View Movies
- Edit Movie Details
- Delete Movies
- Movie Trailer Integration
- Change Admin Password

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcrypt Password Hashing

### Database

- MongoDB Atlas
- Prisma ORM

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman / Browser API Testing

---

## 🏗️ Project Architecture

```text
netflix/
│
├── client/
│   └── watchflix/
│       ├── public/
│       │   └── banners/
│       │
│       └── src/
│           ├── assets/
│           │
│           ├── components/
│           │   ├── adminUi/
│           │   ├── common/
│           │   └── userUi/
│           │
│           ├── App.jsx
│           ├── index.css
│           └── main.jsx
│
├── server/
│   ├── controller/
│   ├── middleware/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── router/
│   ├── utils/
│   └── index.js
│
└── README.md
