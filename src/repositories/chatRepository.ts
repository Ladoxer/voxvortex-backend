import Chat,{ IChat } from "../models/Chat";
import Message, { IMessage } from "../models/Message";

interface IChatRepository{
  findChatByUsers(user1: string, user2: string): Promise<IChat | null>;
  createChat(user1: string, user2: string): Promise<IChat>;
  createMessage(message: IMessage): Promise<boolean>;
  getChatHistory(chat_id: string): Promise<IChat | null>;
}

export default class ChatRepository implements IChatRepository {
  async findChatByUsers(user1: string, user2: string): Promise<IChat | null> {
    try {
      const chatData = await Chat.findOne({
        $or: [
          {$and: [{user1}, {user2}]},
          {$and: [{user1: user2}, {user2: user1}]}
        ]
      });

      return chatData;
    } catch (error) {
      throw error;
      return null;
    }
  }

  async createChat(user1: string, user2: string): Promise<IChat> {
    try {
      return await Chat.create({user1,user2});
    } catch (error) {
      throw error;
    }
  }

  async createMessage(message: IMessage): Promise<boolean> {
    try {
      const newMessage = await Message.create(message);
      const pushToChat = await Chat.updateOne({_id:newMessage.chat_id},{$push:{message:newMessage._id}});
      if(newMessage && pushToChat){
        return true;
      }
      return false;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getChatHistory(chat_id: string): Promise<IChat | null> {
    try {
      const chatHistory = await Chat.findOne({_id: chat_id}).populate("message");

      return chatHistory;
    } catch (error) {
      return null;
    }
  }
}