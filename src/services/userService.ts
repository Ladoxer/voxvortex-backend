import { IUser } from "../models/User";
import UserRepository from "../repositories/userRepository";

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string): Promise<IUser | null> {
    try {
      return await this.userRepository.getUserById(userId);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, updatedUserData: Partial<IUser>): Promise<IUser | null> {
    try {
      return await this.userRepository.updateUser(userId,updatedUserData);
    } catch (error) {
      throw error;
    }
  }

  async blockUser(userId: string): Promise<void> {
    try {
      await this.userRepository.blockUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async unblockUser(userId: string): Promise<void> {
    try {
      await this.userRepository.unblockUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async toggleFollow(userId: string, targetId: string): Promise<boolean> {
    try {
      return await this.userRepository.toggleFollow(userId,targetId);
    } catch (error) {
      throw error;
    }
  }

  async toggleSave(userId: string, blogId: string): Promise<boolean>{
    try {
      return await this.userRepository.toggleSave(userId,blogId);
    } catch (error) {
      throw error;
    }
  }

  async toggleLike(userId: string, blogId: string): Promise<boolean> {
    try {
      return await this.userRepository.toggleLike(userId,blogId);
    } catch (error) {
      throw error;
    }
  }

  async getFollowing(userId: string){
    try {
      return await this.userRepository.getFollowings(userId);
    } catch (error) {
      throw error;
    }
  }

  async getFollowers(userId: string){
    try {
      return await this.userRepository.getFollwers(userId);
    } catch (error) {
      throw error;
    }
  }

  async getSavedBlogs(userId: string){
    try {
      return await this.userRepository.getSavedBlogs(userId);
    } catch (error) {
      throw error;
    }
  }

  async getMyBlogs(userId: string){
    try {
      return await this.userRepository.getMyBlogs(userId);
    } catch (error) {
      throw error;
    }
  }

  async getLikedBlogs(userId: string){
    try {
      return await this.userRepository.getLikedBlogs(userId);
    } catch (error) {
      throw error;
    }
  }

  async getTotalUsers(): Promise<number> {
    try {
      const users = await this.userRepository.getAllUsers();

      return users.length;
    } catch (error) {
      throw error;
    }
  }

  async getPremiumAndNormalUsers(): Promise<{premiumUsers: number, normalUsers: number}>{
    const result = await this.userRepository.getPremiumAndNormalUsers();

    return result;
  }
}