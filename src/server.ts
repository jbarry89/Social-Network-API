import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connection';
import userRoutes from './routes/api/userRoutes';
import thoughtRoutes from './routes/api/thoughtRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(express.json());

//connects to the database in the connection.ts file
connectDB();

// Defining API Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Starts the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`API Server is running on http://localhost:${PORT}`);
});
