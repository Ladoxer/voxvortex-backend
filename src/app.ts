import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from "./routes/userRoutes";
import blogRouter from "./routes/blogRoutes";
import labelRouter from "./routes/labelRoutes";
import chatRouter from "./routes/chatRoutes";
import subscriptionRouter from "./routes/subscriptionRoutes";
import planRouter from "./routes/planRoutes";
import env from "dotenv";
env.config();

import { job } from "./config/job";
job.start();

const app = express();
app.use(cors({credentials: true, origin: process.env.FRONTEND_URL as string}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRouter);
app.use('/api/label', labelRouter);
app.use('/api/chat', chatRouter);
app.use('/api/subscription', subscriptionRouter);
app.use('/api/plan', planRouter);

export default app;