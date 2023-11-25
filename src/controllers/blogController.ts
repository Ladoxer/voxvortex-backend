import { Request, Response, NextFunction } from "express";
import BlogService from "../services/blogService";

interface IBlogContoller {
  createBlog(req: Request, res: Response, next: NextFunction): Promise<any>;
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
        return res.status(200).json({
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
}
