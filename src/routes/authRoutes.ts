import { Router } from "express";
import AuthController from "../controllers/authController";

const router = Router();
const authController = new AuthController();

router.post('/register', authController.postRegister.bind(authController));
router.post('/verification', authController.postVerification.bind(authController));
router.post('/login', authController.postLogin.bind(authController));
router.post('/reverification', authController.reVerification.bind(authController));
router.post('/forgotpassword', authController.forgotPassword.bind(authController));
router.post('/forgot/:token', authController.forgot.bind(authController));

router.post('/active', authController.activeUser.bind(authController));
router.post('/admin', authController.adminLogin.bind(authController));

export default router;