import { Router } from "express";
import ChatController from "../controllers/chatController";

const chatRouter = Router();
const chatController = new ChatController();

chatRouter.get('/:loggedUserId/:userId',chatController.chat.bind(chatController));
chatRouter.get('/history/:id', chatController.getChatHistory.bind(chatController));

export default chatRouter;