import { Request, Response, NextFunction } from "express";
import BlogService from "../services/blogService";
import { IBlog } from "../models/Blog";

interface IBlogContoller {
  createBlog(req: Request, res: Response, next: NextFunction): Promise<any>;
  getBlogById(req: Request, res: Response, next: NextFunction): Promise<any>;
  updateBlog(req: Request, res: Response, next: NextFunction): Promise<any>;
  deleteBlog(req: Request, res: Response, next: NextFunction): Promise<any>;
  getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export default class BlogController implements IBlogContoller {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  async createBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { userName, title, content, label } = req.body;
      const imageUrl = req.file?.filename;

      const data = await this.blogService.createBlog({ userName, title, content, image: imageUrl, label });
      if(data){
        await this.blogService.updateUserBlog(userName,data._id);
        return res.status(201).json({
          message:'Blog added successfully'
        })
      }
      return res.status(404).json({
        message:"Failed to save"
      });
    } catch (error) {
      next(error);
    }
  }

  async getBlogById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const blogId = req.params.id;
      const blog = await this.blogService.getBlogById(blogId);
      if(blog){
        return res.status(200).json(blog);
      }
      return res.status(404).json({ message: 'Blog not found' });
    } catch (error) {
      next(error);
    }
  }

  async updateBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const blogId = req.params.id;
      const updateBlog: Partial<IBlog> = req.body;
      updateBlog.image = req.file?.filename;

      const result = await this.blogService.updateBlog(blogId, updateBlog);
      if(result) {
        res.status(200).json({
          message: 'Blog updated successfully'
        });
      } else {
        res.status(404).json({
          message: 'Blog not found'
        });
      }
    } catch (error) {
      next(error)
    }
  }

  async deleteBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const blogId = req.params.id;
      const result = await this.blogService.deleteBlog(blogId);
      if(result) {
        res.status(200).json({
          message: 'Blog deleted successfully'
        });
      } else {
        res.status(404).json({
          message: 'Blog not found'
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const blogs = await this.blogService.getAllBlogs();
      res.status(200).json(blogs);
    } catch (error) {
      next(error);
    }
  }

}
