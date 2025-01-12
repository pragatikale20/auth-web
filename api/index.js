import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err.message));

const app = express();
app.use(express.json());

// Use user routes BEFORE starting the server
app.use("/api/user", userRoutes);
app.use("/api/auth" , authRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
