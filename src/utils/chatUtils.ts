import { IMessage } from "../models/Message";
import ChatService from "../services/chatService";

const chatService = new ChatService();

export const newMessage = async(message: IMessage): Promise<void> => {
  try {
    await chatService.createMessage(message);
  } catch (error) {
    throw error;
  }
}