import { Router } from "express";
import BlogController from "../controllers/blogController";
import upload from "../utils/multer";

const blogRouter = Router();
const blogController = new BlogController();

blogRouter.post('/',upload,blogController.createBlog.bind(blogController));

export default blogRouter;