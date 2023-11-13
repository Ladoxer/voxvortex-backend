import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  mobile: number;
  password: string;
  is_verified: boolean;
  is_admin: boolean;
  is_blocked: boolean;
  otp: string;
  token: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
  is_verified: { type: Boolean, default: false },
  is_admin: { type: Boolean, default: false },
  is_blocked: { type: Boolean, default: false },
  otp: { type: String, default: "" },
  token: { type: String, default: "" },
});

export default model<IUser>('User', userSchema);
