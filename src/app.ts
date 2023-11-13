import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(cookieParser());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

export default app;