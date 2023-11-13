import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router();
const userController = new UserController();

userRouter.get('/users', userController.getAllUsers.bind(userController));
userRouter.put('/users/block/:userId',userController.blockUser.bind(userController));
userRouter.put('/users/unblock/:userId', userController.unblockUser.bind(userController));

export default userRouter;