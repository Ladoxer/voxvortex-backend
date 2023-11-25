import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.getAllUsers.bind(userController));
userRouter.put('/block/:userId',userController.blockUser.bind(userController));
userRouter.put('/unblock/:userId', userController.unblockUser.bind(userController));

export default userRouter;