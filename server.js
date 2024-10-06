import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import statusRoute from "./route/status.route.js";
import completionsRoute from "./route/completions.route.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Apply CORS middleware
app.use(cors())

app.use(express.json())

// Add logging middleware for request-response time and status
app.use(morgan(':method :url :status - :response-time ms'));

app.use('/api', statusRoute);
app.use('/api', completionsRoute);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));