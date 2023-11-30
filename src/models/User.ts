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
  following: Array<Schema.Types.ObjectId>;
  followers: Array<Schema.Types.ObjectId>;
  blogs: Array<Schema.Types.ObjectId>;
  saved: Array<Schema.Types.ObjectId>;
  token: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
    is_verified: { type: Boolean, default: false },
    is_admin: { type: Boolean, default: false },
    is_blocked: { type: Boolean, default: false },
    otp: { type: String, default: "" },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    saved: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    token: { type: String, default: "" },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
