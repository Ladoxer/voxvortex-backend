import { Document, Schema, model } from "mongoose";

export interface IMessage extends Document{
  text: string;
  sender_id: Schema.Types.ObjectId;
  chat_id: Schema.Types.ObjectId;
  time: string;
  createdAt: Date,
  updatedAt: Date
}

const messageSchema = new Schema<IMessage>({
  text:{
    type: String,
    required: true
  },
  sender_id:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chat_id:{
    type: Schema.Types.ObjectId,
    ref: 'Chat'
  },
  time:{
    type: String,
    required: true
  }
},{timestamps:true});

export default model<IMessage>('Message',messageSchema);