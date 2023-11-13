import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";

export default class UserController {
  private userService: UserService;

  constructor(){
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async blockUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      await this.userService.blockUser(userId);
      res.status(200).json({
        message:"User blocked"
      });
    } catch (error) {
      next(error);
    }
  }

  async unblockUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      await this.userService.unblockUser(userId);
      return res.status(200).json({
        message: 'User unblocked'
      });
    } catch (error) {
      next(error);
    }
  }
}