import { Router } from "express";
import BlogController from "../controllers/blogController";
import upload from "../utils/multer";

const blogRouter = Router();
const blogController = new BlogController();

blogRouter.post('/',upload,blogController.createBlog.bind(blogController));
blogRouter.get('/:id',blogController.getBlogById.bind(blogController));
blogRouter.get('/label/:id',blogController.getBlogByLabelId.bind(blogController));
blogRouter.put('/:id',upload,blogController.updateBlog.bind(blogController));
blogRouter.delete('/:id', blogController.deleteBlog.bind(blogController));
blogRouter.get('/',blogController.getAllBlogs.bind(blogController));
blogRouter.post('/comment/:id',blogController.addComment.bind(blogController));
blogRouter.get('/comment/:id',blogController.getComments.bind(blogController));

export default blogRouter;