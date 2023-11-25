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

}