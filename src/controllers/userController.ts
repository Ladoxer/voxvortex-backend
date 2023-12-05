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

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.params.id;
      const user = await this.userService.getUserById(userId);
      res.status(200).json(user);
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

  async toggleFollow(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId, targetId } = req.body;
      const isFollowing = await this.userService.toggleFollow(userId,targetId);
      if(isFollowing){
        return res.status(200).json({
          message: 'followed successfully.'
        })
      }else{
        return res.status(200).json({
          message: 'unfollowed successfully.'
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async toggleSave(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId, blogId} = req.body;
      const isSaved = await this.userService.toggleSave(userId,blogId);

      if(isSaved){
        return res.status(200).json({
          message: 'Blog saved successfully'
        })
      } else {
        return res.status(200).json({
          message: 'Blog removed from saved list'
        })
      }
    } catch (error) {
      next(error);
    }
  }

  async getFollowings(req: Request, res: Response, next: NextFunction){
    try {
      const userId = req.params.id;
      const followingUser = await this.userService.getFollowing(userId);

      res.status(200).json(followingUser);

    } catch (error) {
      next(error);
    }
  }

  async getSavedBlogs(req: Request, res: Response, next: NextFunction){
    try {
      const userId = req.params.id;
      const savedBlogs = await this.userService.getSavedBlogs(userId);

      res.status(200).json(savedBlogs);
      
    } catch (error) {
      next(error);
    }
  }
}