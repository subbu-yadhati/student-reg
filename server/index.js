import express from 'express';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors()); // Add CORS middleware

// Connect to MongoDB
connectDB();


// Routes
app.use('/api', studentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Default route
app.get('/', (req, res) => {
  res.send('Backend is working');
});