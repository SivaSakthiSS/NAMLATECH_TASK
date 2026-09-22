# NamlaTech Interview Task

## Project
GrandStay Hotel List Page - CRUD Form with Responsive UI

## Technologies

Frontend:
- ReactJS
- Redux Toolkit
- Axios
- React Router
- React Helmet Async
- HTML
- CSS

Backend:
- Node.js
- Express.js
- PostgreSQL
- Multer

## Features

- Add hotel
- Edit hotel
- Delete hotel
- Hotel image upload and preview
- Form validation
- Search by title
- Minimum and maximum price filter
- Pagination
- Hotel detail page
- OpenStreetMap location
- Browser geolocation
- Responsive UI
- SEO meta tags

## Backend Setup

cd backend

npm install

npm start

## Frontend Setup

cd frontend

npm install

npm run dev

## Database

Create a PostgreSQL database named:

hotel_db

Create the hotels table according to the provided SQL structure.

## Environment Variables

Create a .env file inside backend with:

DB_USER=postgres
DB_HOST=localhost
DB_NAME=hotel_db
DB_PASSWORD=your_password
DB_PORT=5432

## Backend API

GET /api/hotels

GET /api/hotels/:id

POST /api/hotels

PUT /api/hotels/:id

DELETE /api/hotels/:id