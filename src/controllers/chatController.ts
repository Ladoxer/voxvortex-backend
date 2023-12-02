import { NextFunction, Request, Response } from "express";
import ChatService from "../services/chatService";
import { IMessage } from "../models/Message";

interface IChatController{
  chat(req: Request, res: Response, next: NextFunction): Promise<void>;
  getChatHistory(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default class ChatController implements IChatController {
  private chatService: ChatService;

  constructor(){
    this.chatService = new ChatService();
  }

  async chat(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {loggedUserId, userId} = req.params;
      const user1 = loggedUserId;
      const user2 = userId;

      if(user1 && user2) {
        const chatData = await this.chatService.findChatByUsers(user1,user2);

        if(!chatData) {
          const savedRoom = await this.chatService.createChat(user1,user2);

          res.status(201).json(savedRoom._id);
        } else {
          res.status(200).json(chatData._id);
        }
      } else {
        res.status(404).json({
          message:'Invalid'
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getChatHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const chat_id = req.params.id;
      
      const chatHistory = await this.chatService.getChatHistory(chat_id);
      
      if(!chatHistory) {
        res.status(404).json({
          message: "Chat history not found"
        });
      } else {
        res.status(200).json(chatHistory.message);
      }
    } catch (error) {
      next(error);
    }
  }
}