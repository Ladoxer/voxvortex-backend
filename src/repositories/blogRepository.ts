import Blog,{IBlog} from "../models/Blog";

interface IBlogRepository{
  createBlog(newBlog: Partial<IBlog>): Promise<IBlog | null>;
}

export default class BlogRepository implements IBlogRepository{
  async createBlog(newBlog: Partial<IBlog>): Promise<IBlog | null> {
    return await Blog.create(newBlog);
  }
}