import Blog, { IBlog } from "../models/Blog";
import User from "../models/User";

interface IBlogRepository {
  createBlog(newBlog: Partial<IBlog>): Promise<IBlog | null>;
  getBlogById(blogId: string): Promise<IBlog | null>;
  getBlogByLabelId(LabelId: string): Promise<IBlog[] | null>;
  updateBlog(blogId: string, updatedBlog: Partial<IBlog>): Promise<boolean>;
  deleteBlog(blogId: string): Promise<boolean>;
  getAllBlogs(limit: number, offset: number): Promise<IBlog[]>;
  updateUserBlog(userId: string, blogId: string): Promise<void>;
  getTotalBlogs(): Promise<number>;
  addComment(
    blogId: string,
    newComment: { userName: string; text: string; createdAt: Date }
  ): Promise<void>;
  getComments(blogId: string): Promise<any>;
  getFollowingBlogs(
    userId: string,
    limit: number,
    offset: number
  ): Promise<IBlog[] | null>;
}

export default class BlogRepository implements IBlogRepository {
  async createBlog(newBlog: Partial<IBlog>): Promise<IBlog | null> {
    try {
      return await Blog.create(newBlog);
    } catch (error) {
      return null;
    }
  }

  async updateUserBlog(userId: string, blogId: string): Promise<void> {
    try {
      await User.updateOne({ _id: userId }, { $push: { blogs: blogId } });
    } catch (error) {
      throw error;
    }
  }

  async getBlogById(blogId: string): Promise<IBlog | null> {
    try {
      return await Blog.findById(blogId).populate("userName").populate("label");
    } catch (error) {
      return null;
    }
  }

  async getBlogByLabelId(LabelId: string): Promise<IBlog[] | null> {
    try {
      return await Blog.find({ label: LabelId }).populate("userName");
    } catch (error) {
      return null;
    }
  }

  async updateBlog(
    blogId: string,
    updatedBlog: Partial<IBlog>
  ): Promise<boolean> {
    try {
      const result = await Blog.updateOne({ _id: blogId }, updatedBlog);
      return result.modifiedCount > 0;
    } catch (error) {
      return false;
    }
  }

  async deleteBlog(blogId: string): Promise<boolean> {
    try {
      const result = await Blog.deleteOne({ _id: blogId });
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  async getAllBlogs(limit: number, offset: number): Promise<IBlog[]> {
    try {
      return await Blog.find({})
        .populate("userName")
        .populate("label")
        .skip(offset)
        .limit(limit);
    } catch (error) {
      return [];
    }
  }

  async addComment(
    blogId: string,
    newComment: { userName: string; text: string; createdAt: Date }
  ): Promise<void> {
    try {
      const { userName, text, createdAt } = newComment;

      // const user = await User.findById(userName);

      const blog = await Blog.findByIdAndUpdate(blogId, {
        $push: { comments: { userName, text, createdAt } },
      });
      if (!blog) {
        throw new Error("Comment not saved");
      }
    } catch (error) {
      throw error;
    }
  }

  async getComments(blogId: string): Promise<any> {
    try {
      const blog = await Blog.findById(blogId).populate(
        "comments.userName",
        "name"
      );
      console.log(blog);

      return blog?.comments;
    } catch (error) {
      throw error;
    }
  }

  async getFollowingBlogs(
    userId: string,
    limit: number,
    offset: number
  ): Promise<IBlog[] | null> {
    try {
      const user = await User.findById(userId).exec();

      const followingUsers = user?.following;
      const followingBlogs = await Blog.find({
        userName: { $in: followingUsers },
      })
        .populate("userName")
        .populate("label")
        .skip(offset)
        .limit(limit)
        .exec();

      return followingBlogs;
    } catch (error) {
      throw error;
    }
  }

  async getTotalBlogs(): Promise<number> {
    try {
      const blogs = await Blog.find().exec();
      return blogs.length;
    } catch (error) {
      throw error;
    }
  }
}
