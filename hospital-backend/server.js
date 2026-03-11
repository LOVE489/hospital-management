const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');
const errorHandler = require('./middleware/errorMiddleware');

// load env variables
dotenv.config();

// connect to database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/patients', patientRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
