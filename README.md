🍬 Sweet Shop Management System

Incubyte Assessment – Full Stack Application

A full-stack Sweet Shop Management System built using the MERN stack, featuring role-based authentication, secure APIs, and a modern Tailwind CSS frontend.
This project demonstrates clean architecture, RESTful API design, and real-world frontend–backend integration.

🚀 Features
🔐 Authentication & Authorization

JWT-based authentication

Role-based access control:

Admin

User

Secure login & registration

🧑‍💼 Admin Features

Register admins

Add new sweets

View all available sweets

Manage sweet inventory

Purchase simulation with stock validation

👤 User Features

User registration & login

View sweets

Search sweets by:

Name

Category

Price range

Purchase sweets (with stock checks)

🍭 Sweet Management

Create sweets (Admin only)

List active sweets

Search sweets (filters supported)

Purchase sweets with quantity validation

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

Context API

Custom Hooks

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

bcrypt.js

Testing

Jest

Supertest

📂 Project Structure
Incubyte-Assessment/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

⚙️ Environment Variables
Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Frontend (.env)
VITE_API_URL=http://localhost:5000/api

▶️ Running the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

🧪 Running Tests
cd backend
npm test


All APIs are tested using Jest + Supertest.

📡 API Overview
Method	Endpoint	Description	Access
POST	/api/auth/register	Register user/admin	Public
POST	/api/auth/login	Login	Public
POST	/api/sweets	Create sweet	Admin
GET	/api/sweets	List sweets	Auth
GET	/api/sweets/search	Search sweets	Auth
POST	/api/sweets/:id/purchase	Purchase sweet	Auth
🎨 UI Highlights

Fully responsive

Clean & colorful Tailwind design

User-friendly forms

Role-aware navigation

✅ Assessment Goals Covered

Clean code structure

RESTful APIs

Proper error handling

Secure authentication

Role-based authorization

Frontend-backend integration

Automated testing

👨‍💻 Author

Rakesh Padala
Full Stack Developer
GitHub: Rakesh-Padala
