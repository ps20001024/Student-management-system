# Online Student Management System (MERN)

A full-stack academic project starter built with MongoDB, Express, React and Node.js.

## Features
- JWT-based login and role-based access (`admin`, `student`)
- Admin dashboard with student, course, attendance and result summaries
- Student CRUD, course CRUD, attendance entry and result entry
- Students can view their own profile, attendance and results
- Password hashing with bcrypt, request validation and centralized error handling
- Responsive React interface

## Requirements
- Node.js 18 or newer
- MongoDB Community Server or a MongoDB Atlas connection
- npm

## 1. Configure the backend
```bash
cd backend
cp .env.example .env
```
Edit `.env` and set `MONGO_URI` and a long random `JWT_SECRET`.

Install dependencies and create the first administrator:
```bash
npm install
npm run seed:admin
npm run dev
```
The seed script reads `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` from `.env` (defaults are shown in `.env.example`). Change the default password before using the application.

Backend runs at `http://localhost:5000`.

## 2. Configure and run the frontend
Open a second terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

## 3. First login
Use the administrator email and password configured in `backend/.env`. From the dashboard you can add courses and students. When adding a student, the form also creates a student login account.

## API overview
Base URL: `http://localhost:5000/api`

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/auth/login` | Public | Login and receive JWT |
| GET | `/auth/me` | Logged in | Current user |
| GET/POST | `/students` | Admin | List/create students |
| GET/PUT/DELETE | `/students/:id` | Admin | Read/update/delete student |
| GET | `/students/me/profile` | Student | Own profile |
| GET/POST | `/courses` | Admin for writes | List/create courses |
| PUT/DELETE | `/courses/:id` | Admin | Update/delete course |
| GET/POST | `/attendance` | Admin for writes | List/mark attendance |
| GET | `/attendance/me` | Student | Own attendance |
| GET/POST | `/results` | Admin for writes | List/add results |
| GET | `/results/me` | Student | Own results |
| GET | `/dashboard/stats` | Admin | Dashboard totals |

## Project structure
```text
backend/   Express REST API, MongoDB models, authentication and routes
frontend/  React + Vite responsive website
```

## Academic submission note
This is a runnable project implementation template. Before submitting it as your own completed project, run it, test every workflow, add your own genuine screenshots, and update the report to match the final code and database. Do not claim deployment or testing that you have not personally completed. Store secrets only in `.env`; never upload `.env` to a public repository.
