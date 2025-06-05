import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/auth.route.js';
import cors from 'cors';

const app = express(); 

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));



app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
