import { Router } from "express";
import UserController from "../controllers/userController";
import { adminAuth } from "../middleware/adminAuth";
import { userAuth } from "../middleware/userAuth";

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', adminAuth,userController.getAllUsers.bind(userController));
userRouter.put('/block/:userId',adminAuth,userController.blockUser.bind(userController));
userRouter.put('/unblock/:userId',adminAuth, userController.unblockUser.bind(userController));
userRouter.get('/:id',userAuth, userController.getUserById.bind(userController));
userRouter.put('/:id',userAuth, userController.updateUser.bind(userController));
userRouter.put('/follow',userAuth, userController.toggleFollow.bind(userController));
userRouter.get('/followings/:id',userAuth,userController.getFollowings.bind(userController));
userRouter.get('/followers/:id',userAuth, userController.getFollowers.bind(userController));
userRouter.put('/save',userAuth, userController.toggleSave.bind(userController));
userRouter.get('/save/:id',userAuth,userController.getSavedBlogs.bind(userController));
userRouter.put('/like', userAuth,userController.toggleLike.bind(userController));
userRouter.get('like/:id',userAuth,userController.getLikedBlogs.bind(userController));
userRouter.get('/myBlogs/:id', userAuth,userController.getMyBlogs.bind(userController));

export default userRouter;