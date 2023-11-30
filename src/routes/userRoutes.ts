import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.getAllUsers.bind(userController));
userRouter.put('/block/:userId',userController.blockUser.bind(userController));
userRouter.put('/unblock/:userId', userController.unblockUser.bind(userController));
userRouter.get('/:id', userController.getUserById.bind(userController));
userRouter.put('/follow', userController.toggleFollow.bind(userController));
userRouter.get('/followings/:id',userController.getFollowings.bind(userController));

export default userRouter;