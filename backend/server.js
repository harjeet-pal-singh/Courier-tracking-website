// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import courierRoutes from './routes/courierRoutes.js';
import authRoutes from './routes/auth.js';



dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
console.log('server')
app.use('/api', authRoutes);
app.use('/api/couriers', courierRoutes);

app.get('/', (req, res) => {
  res.send('Courier backend running');
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.error(err));
