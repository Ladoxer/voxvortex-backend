import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from "./routes/userRoutes";
import blogRouter from "./routes/blogRoutes";
import labelRouter from "./routes/labelRoutes";
import chatRouter from "./routes/chatRoutes";

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRouter);
app.use('/api/label', labelRouter);
app.use('/api/chat', chatRouter);

export default app;