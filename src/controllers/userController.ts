import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import { IUser } from "../models/User";

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

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const updatedUserData: Partial<IUser> = req.body;
      const updatedData = await this.userService.updateUser(userId,updatedUserData);

      if(updatedData){
        res.status(200).json("updated successfully.");
      }else{
        res.status(404).json("user data not found.");
      }
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

  async toggleLike(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId, blogId} = req.body;
      const isLiked = await this.userService.toggleLike(userId,blogId);

      if(isLiked){
        return res.status(200).json({
          message: 'Liked'
        })
      } else {
        return res.status(200).json({
          message: 'Unliked'
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

  async getFollowers(req: Request, res: Response, next: NextFunction){
    try {
      const userId = req.params.id;
      const followers = await this.userService.getFollowers(userId);

      res.status(200).json(followers);
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

  async getMyBlogs(req: Request, res: Response, next: NextFunction){
    try {
      const userId = req.params.id;
      const myBlogs = await this.userService.getMyBlogs(userId);

      res.status(200).json(myBlogs);
    } catch (error) {
      next(error);
    }
  }

  async getLikedBlogs(req: Request, res: Response, next: NextFunction){
    try {
      const userId = req.params.id;
      const likedBlogs = await this.userService.getLikedBlogs(userId);

      res.status(200).json(likedBlogs);
    } catch (error) {
      next(error);
    }
  }
}