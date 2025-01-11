import dotenv from 'dotenv';
dotenv.config();  // No need to specify a path if .env is in the root

import express from 'express';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO, {
  
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err.message));

const app = express();

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
