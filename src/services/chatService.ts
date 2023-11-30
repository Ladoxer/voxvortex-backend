import { IChat } from "../models/Chat";
import { IMessage } from "../models/Message";
import ChatRepository from "../repositories/chatRepository";

interface IChatService{
  findChatByUsers(user1: string, user2: string): Promise<IChat | null>;
  createChat(user1: string, user2: string): Promise<IChat>;
  createMessage(message: IMessage): Promise<boolean>;
  getChatHistory(chat_id: string): Promise<IChat | null>;
}

export default class ChatService implements IChatService {
  private chatRepository: ChatRepository;

  constructor() {
    this.chatRepository = new ChatRepository();
  }

  async findChatByUsers(user1: string, user2: string): Promise<IChat | null> {
    try {
      return await this.chatRepository.findChatByUsers(user1,user2);
    } catch (error) {
      throw error;
    }
  }

  async createChat(user1: string, user2: string): Promise<IChat> {
    try {
      return await this.chatRepository.createChat(user1,user2);
    } catch (error) {
      throw error;
    }
  }

  async createMessage(message: IMessage): Promise<boolean> {
    try {
      return await this.chatRepository.createMessage(message);
    } catch (error) {
      throw error;
    }
  }

  async getChatHistory(chat_id: string): Promise<IChat | null> {
    try {
      return await this.chatRepository.getChatHistory(chat_id);
    } catch (error) {
      return null;
    }
  }
}