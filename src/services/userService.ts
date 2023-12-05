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

  async getFollowing(userId: string){
    try {
      return await this.userRepository.getFollowings(userId);
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
}