import express from 'express';
import connectDB from './config/connection';
import userRoutes from './routes/api/userRoutes';
import thoughtRoutes from './routes/api/thoughtRoutes';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

connectDB();

app.use('/api', userRoutes);
app.use('/api', thoughtRoutes);

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}!`);
});

