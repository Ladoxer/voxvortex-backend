import { Document, Schema, model } from "mongoose";

export interface ILabel extends Document{
  label: string,
  description: string
}

const labelSchema = new Schema<ILabel>({
  label:{
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

export default model<ILabel>('Label',labelSchema);