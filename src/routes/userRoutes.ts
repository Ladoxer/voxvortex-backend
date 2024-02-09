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
userRouter.put('/follow/follow',userAuth, userController.toggleFollow.bind(userController));
userRouter.get('/followings/:id',userController.getFollowings.bind(userController));
userRouter.get('/followers/:id', userController.getFollowers.bind(userController));
userRouter.put('/save/save',userAuth, userController.toggleSave.bind(userController));
userRouter.get('/save/:id',userController.getSavedBlogs.bind(userController));
userRouter.put('/like/like', userAuth,userController.toggleLike.bind(userController));
userRouter.get('like/:id',userController.getLikedBlogs.bind(userController));
userRouter.get('/myBlogs/:id', userAuth,userController.getMyBlogs.bind(userController));
userRouter.get('/dashboard/totalUsers', userController.getTotalUsers.bind(userController));
userRouter.get('/dashboard/premiumAndNormalUsers', userController.getPremiumAndNormalUsers.bind(userController));

export default userRouter;