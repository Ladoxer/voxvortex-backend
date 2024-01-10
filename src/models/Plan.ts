import { Document, Schema, model } from "mongoose";

export interface IPlan extends Document {
  name: string;
  amount: number;
  // interval: string;
  period: string;
  description: string;
  planId: string;
}

const planSchema = new Schema<IPlan>({
  name:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  },
  // interval: {
  //   type: String,
  //   required: true
  // },
  period:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  planId: {
    type: String,
    required: true
  }
});

export default model<IPlan>('Plan', planSchema);