import { IBlog } from "../models/Blog";
import BlogRepository from "../repositories/blogRepository";

interface IBlogService {
  createBlog(newBlog: IBlog): Promise<IBlog | null>;
  getBlogById(blogId: string): Promise<IBlog | null>;
  getBlogByLabelId(LabelId: string): Promise<IBlog[] | null>;
  updateBlog(blogId: string, updatedBlog: Partial<IBlog>): Promise<boolean>;
  deleteBlog(blogId: string): Promise<boolean>;
  getAllBlogs(limit: number, offset: number): Promise<IBlog[]>;
  updateUserBlog(userId: string, blogId: string): Promise<void>;
  addComment(blogId: string, newComment: {userName: string, text: string, createdAt: Date}): Promise<void>;
  getComments(blogId: string): Promise<any>;
  getFollowingBlogs(userId: string, limit: number, offset: number): Promise<IBlog[] | null>;
  getTotalBlogs(): Promise<number>;
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

  async getBlogByLabelId(LabelId: string): Promise<IBlog[] | null> {
    return await this.blogRepository.getBlogByLabelId(LabelId);
  }

  async updateBlog(blogId: string, updatedBlog: Partial<IBlog>): Promise<boolean> {
    return await this.blogRepository.updateBlog(blogId,updatedBlog);
  }

  async deleteBlog(blogId: string): Promise<boolean> {
    return await this.blogRepository.deleteBlog(blogId);
  }

  async getAllBlogs(limit: number, offset: number): Promise<IBlog[]> {
    return await this.blogRepository.getAllBlogs(limit, offset);
  }

  async getFollowingBlogs(userId: string,limit: number, offset: number): Promise<IBlog[] | null> {
    return await this.blogRepository.getFollowingBlogs(userId,limit,offset);
  }

  async addComment(blogId: string, newComment: { userName: string; text: string; createdAt: Date; }): Promise<void> {
    return await this.blogRepository.addComment(blogId, newComment);
  }

  async getComments(blogId: string): Promise<any> {
    return await this.blogRepository.getComments(blogId);
  }

  async getTotalBlogs(): Promise<number> {
    return await this.blogRepository.getTotalBlogs();  
  }

}