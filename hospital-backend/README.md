# Hospital Backend API

This Express.js application provides a RESTful API for managing hospital patient records. It uses MongoDB as the database and Mongoose for object modeling.

## Features

- Register new patients
- View all patient records
- Get a single patient by ID
- Update patient details
- Delete patient records
- Search patients by name or disease

## Patient Schema

Fields:
- Full Name (required)
- Email (required, unique)
- Phone Number (required)
- Age (positive number)
- Gender
- Disease/Diagnosis (required)
- Doctor Assigned (required)
- Admission Date
- Room Number
- Patient Type (Inpatient/Outpatient)
- Status (Admitted/Discharged, default `Admitted`)

## Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `PORT`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev   # nodemon
   # or
   npm start
   ```

## API Endpoints

| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| POST   | `/patients`               | Register a new patient       |
| GET    | `/patients`               | Get all patient records      |
| GET    | `/patients/:id`           | Get patient by ID            |
| PUT    | `/patients/:id`           | Update patient              |
| DELETE | `/patients/:id`           | Delete patient              |
| GET    | `/patients/search?name=&disease=` | Search by name or disease |

## Error Handling

The API uses proper HTTP status codes and includes an error-handling middleware. All controllers are async and use try/catch blocks.

---

Feel free to extend this project with authentication, pagination, or frontend integration.