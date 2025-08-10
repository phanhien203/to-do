import express from 'express';
import * as path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import todoRoutes from './routes/todo.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// CORS Configuration
const allowedOrigins = [process.env.FRONTEND_URL].filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma',
  ],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

// Static & API routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/todos', todoRoutes);

// Start server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
