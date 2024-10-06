import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import statusRouter from "./route/status.route.js";
import chatRouter from "./route/chat.route.js"
import imagesRouter from "./route/images.route.js";
import embeddingsRouter from "./route/embeddings.route.js"
import audioRouter from "./route/audio.route.js"


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Apply CORS middleware
app.use(cors())

app.use(express.json())

// Add logging middleware for request-response time and status
app.use(morgan(':method :url :status - :response-time ms'));

app.use('/api', statusRouter);
app.use('/api', chatRouter);
app.use('/api', imagesRouter);
app.use('/api', embeddingsRouter);
app.use('/api', audioRouter);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));