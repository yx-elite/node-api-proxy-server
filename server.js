import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import proxyRoute from "./route/proxy.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Apply CORS middleware
app.use(cors())

app.use(express.json())

// Logging middleware for request-response time and status
app.use(morgan(':method :url :status - :response-time ms'));

app.use('/api', proxyRoute);

app.listen(PORT, () => console.log(`Server running at https://localhost:${PORT}`));