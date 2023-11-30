import { PopulatedDoc } from "mongoose";
import User, {IUser} from "../models/User";

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

  async getFollowings(userId: string){
    try {
      const user = await User.findById(userId).populate("following").exec();
      
      return user?.following as PopulatedDoc<IUser>[];
    } catch (error) {
      throw error;
    }
  }

}