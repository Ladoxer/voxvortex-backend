import { IBlog } from "../models/Blog";
import BlogRepository from "../repositories/blogRepository";

interface IBlogService {
  createBlog(newBlog: IBlog): Promise<IBlog | null>;
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


}