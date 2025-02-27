import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection';
import userRoutes from './routes/api/userRoutes';
import thoughtRoutes from './routes/api/thoughtRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.listen(PORT, () => {
  console.log(`API Server is running on http://localhost:${PORT}`);
});
