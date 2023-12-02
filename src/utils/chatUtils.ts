import { IMessage } from "../models/Message";
import ChatService from "../services/chatService";

// const chatService = new ChatService();

// export default async function newMessage(message: IMessage): Promise<void> {
//   try {
//     console.log("hello message");
    
//     console.log(message);
    
//     await chatService.createMessage(message);
//   } catch (error) {
//     throw error;
//   }
// }

export default class ChatUtils{
  private chatService: ChatService;

  constructor(){
    this.chatService = new ChatService();
  }


  async newMessage(message: IMessage): Promise<void>{
    try {
      await this.chatService.createMessage(message);
    } catch (error) {
      throw error;
    }
  }
}