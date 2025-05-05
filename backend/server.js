import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import courierRoutes from './routes/courierRoutes.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS Fix
const allowedOrigins = ['https://singhcourierservice.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
   methods: ['GET', 'POST', 'PUT', 'DELETE']

}));

// Middleware
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/couriers', courierRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Courier backend is running 🚀');
});

// Start Server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
