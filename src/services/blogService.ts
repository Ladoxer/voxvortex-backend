import { IBlog } from "../models/Blog";
import BlogRepository from "../repositories/blogRepository";

interface IBlogService {
  createBlog(newBlog: IBlog): Promise<IBlog | null>;
  getBlogById(blogId: string): Promise<IBlog | null>;
  updateBlog(blogId: string, updatedBlog: Partial<IBlog>): Promise<boolean>;
  deleteBlog(blogId: string): Promise<boolean>;
  getAllBlogs(): Promise<IBlog[]>;
  updateUserBlog(userId: string, blogId: string): Promise<void>;
}

export default class BlogService implements IBlogService {
  private blogRepository: BlogRepository;

  constructor(){
    this.blogRepository = new BlogRepository();
  }


  async createBlog(newBlog: Partial<IBlog>): Promise<IBlog | null> {
    try {
      return await this.blogRepository.createBlog(newBlog);
    } catch (error) {
      throw error;
    }
  }

  async updateUserBlog(userId: string, blogId: string): Promise<void> {
    try {
      await this.blogRepository.updateUserBlog(userId,blogId);
    } catch (error) {
      throw error;
    }
  }


  async getBlogById(blogId: string): Promise<IBlog | null> {
    return await this.blogRepository.getBlogById(blogId);
  }

  async updateBlog(blogId: string, updatedBlog: Partial<IBlog>): Promise<boolean> {
    return await this.blogRepository.updateBlog(blogId,updatedBlog);
  }

  async deleteBlog(blogId: string): Promise<boolean> {
    return await this.blogRepository.deleteBlog(blogId);
  }

  async getAllBlogs(): Promise<IBlog[]> {
    return await this.blogRepository.getAllBlogs();
  }

}