import { PopulatedDoc } from "mongoose";
import User, {IUser} from "../models/User";
import Blog, { IBlog } from "../models/Blog";

export default class UserRepository {
  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await User.find({is_admin:false}).exec();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string): Promise<IUser | null> {
    try {
      return await User.findById(userId).exec();
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, updatedUserData: Partial<IUser>): Promise<IUser | null> {
    try {
      const userData = await User.findByIdAndUpdate(userId, updatedUserData, {new: true}).exec();

      return userData;
    } catch (error) {
      throw error;
    }
  }

  async blockUser(userId: string): Promise<void> {
    try {
      await User.updateOne({_id: userId},{$set:{is_blocked:true}}).exec();
    } catch (error) {
      throw error;
    }
  }

  async unblockUser(userId: string): Promise<void> {
    try {
      await User.updateOne({_id: userId},{$set:{is_blocked:false}}).exec();
    } catch (error) {
      throw error;
    }
  }

  async toggleFollow(userId: string, targetId: string): Promise<boolean> {
    try {
      const user = await User.findById(userId).exec();
      const targetUser = await User.findById(targetId).exec();

      if(!user || !targetUser) {
        throw new Error("User or targert user not found");
      }

      const isFollowing = user.following.includes(targetUser._id);

      if(isFollowing) {    
        await User.updateOne(
          {_id: userId},
          {$pull:{following:targetId}}
        ).exec();
        await User.updateOne(
          {_id:targetId},
          {$pull:{followers: userId}}
        ).exec();
      } else {
        await User.updateOne(
          {_id: userId},
          {$addToSet: {following: targetId}}
        ).exec();
        await User.updateOne(
          {_id:targetId},
          {$addToSet:{followers:userId}}
        ).exec();
      }

      return !isFollowing;

    } catch (error) {
      throw error;
    }
  }

  async toggleSave(userId: string, blogId: string): Promise<boolean> {
    try {
      const user = await User.findById(userId).exec();
      const blog = await Blog.findById(blogId).exec();
      const blogExists = user?.saved.includes(blog?._id);

      if (!user || !blog) {
        throw new Error("User or blog not found");
      }

      if(blogExists) {
        await User.updateOne(
          {_id: userId},
          {$pull: {saved:blogId}}
        ).exec();
      } else {
        await User.updateOne(
          {_id: userId},
          {$addToSet: {saved: blogId}}
        ).exec();
      }

      return !blogExists;
    } catch (error) {
      throw error;
    }
  }

  async toggleLike(userId: string, blogId: string): Promise<boolean> {
    try {
      const user = await User.findById(userId).exec();
      const blog = await Blog.findById(blogId).exec();
      const blogExists = user?.liked.includes(blog?._id);

      if(!user || !blog) {
        throw new Error("User or blog not found");
      }

      if (blogExists) {
        await User.updateOne(
          {_id: userId},
          {$pull: {liked: blogId}}
        ).exec();
        await Blog.updateOne(
          {_id: blogId},
          {$inc:{like: -1}}
        ).exec();
      } else {
        await User.updateOne(
          {_id: userId},
          {$addToSet: {liked: blogId}}
        ).exec();
        await Blog.updateOne(
          {_id: blogId},
          {$inc:{like: 1}}
        ).exec();
      }

      return !blogExists;
    } catch (error) {
      throw error;
    }
  }

  async getFollowings(userId: string){
    try {
      const user = await User.findById(userId).populate("following", "name").exec();
      
      return user?.following as PopulatedDoc<IUser>[];
    } catch (error) {
      throw error;
    }
  }

  async getFollwers(userId: string){
    try {
      const user = await User.findById(userId).populate("followers","name").exec();

      return user?.followers as PopulatedDoc<IUser>[];
    } catch (error) {
      throw error;
    }
  }

  async getSavedBlogs(userId: string){
    try {
      const user = await User.findById(userId).populate({
        path: 'saved',
        populate: {
          path: 'userName label',
          select: 'name label'
        }
      }).exec();

      return user?.saved as PopulatedDoc<IBlog>[];
    } catch (error) {
      throw error;
    }
  }

  async getMyBlogs(userId: string){
    try {
      const user = await User.findById(userId).populate({
        path: 'blogs',
        populate: {
          path: 'userName label',
          select: 'name label',
        },
      }).exec();

      return user?.blogs as PopulatedDoc<IBlog>[];
    } catch (error) {
      throw error;
    }
  }

  async getLikedBlogs(userId: string){
    try {
      const user = await User.findById(userId);

      return user?.liked;
    } catch (error) {
      throw error;
    }
  }

  async updatePremium(userId:string,value: boolean){
    try {
      await User.findOneAndUpdate({_id:userId},{$set:{is_premium: value}});
    } catch (error) {
      throw error;
    }
  }

}