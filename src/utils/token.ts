import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import dotenv from 'dotenv';
dotenv.config();

export function generateAuthToken(user: IUser): string {
  const token = jwt.sign({
    _id: user._id
  },process.env.JWT_SECRET as string);

  return token;
}

export function jwtVerify(token: string, secret: string) {
  return jwt.verify(token,secret);
}