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
}