import { Document, Schema, model } from "mongoose";

export interface IChat extends Document {
  user1: Schema.Types.ObjectId;
  user2: Schema.Types.ObjectId;
  message:Array<Schema.Types.ObjectId>;
}

const chatSchema = new Schema<IChat>({
  user1:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message:[{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
},{timestamps:true});

export default model<IChat>('Chat',chatSchema);