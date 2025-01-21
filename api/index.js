import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import blogRoutes from './routes/blog.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Get the current directory of the file (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "https://carlos-mls2.onrender.com", // Replace with your actual client URL if needed
  credentials: true,             // Allows cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);

// Serve static files (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve React frontend (client)
app.use(express.static(path.join(__dirname, "..", "client", "dist"))); 

// Fallback route for any unmatched routes (React's index.html)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
});

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
