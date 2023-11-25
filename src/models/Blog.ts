import { Document, Schema, model } from 'mongoose';

export interface IBlog extends Document {
  userName: Schema.Types.ObjectId;
  title: string;
  content: string;
  image: string;
  is_premium: boolean;
  label: Schema.Types.ObjectId;
  like: number;
  comments: [{
    userName: Schema.Types.ObjectId,
    text: string
  }],
  createdAt: Date,
  updatedAt: Date
}

const blogSchema = new Schema<IBlog>({
  userName: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true,
  },
  is_premium: {
    type: Boolean,
    default: false
  },
  label:{
    type: Schema.Types.ObjectId,
    ref:'Label',
    required: true
  },
  like:{
    type: Number,
    default: 0
  },
  comments: [{
    userName:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text:{
      type: String,
      required: true
    }
  }],
},{timestamps:true});

export default model<IBlog>('Blog',blogSchema);