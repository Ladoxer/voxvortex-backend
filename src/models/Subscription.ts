import { Document, Schema, model } from "mongoose";

export interface ISubscription extends Document {
  userId: string;
  planId: string;
  subscriptionId: string;
  status: boolean;
}

const subscriptionSchema = new Schema<ISubscription>({
  userId:{
    type: String,
    required: true,
  },
  planId:{
    type: String,
    required: true
  },
  subscriptionId:{
    type: String,
    required: true
  },
  status:{
    type: Boolean,
    default: false
  }
});

export default model<ISubscription>('Subscription', subscriptionSchema);