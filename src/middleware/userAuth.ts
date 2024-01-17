import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../utils/httpStatusCodes";
import { jwtVerify } from "../utils/token";
import { JwtPayload } from "jsonwebtoken";
import UserService from "../services/userService";

const { FORBIDDEN, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = STATUS_CODES;

const userService = new UserService();

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if(token) {
      const decoded = jwtVerify(token.slice(7), process.env.JWT_SECRET as string) as JwtPayload;

      const userData = await userService.getUserById(decoded._id);

      if(userData !== null){
        if(userData.is_blocked){
          res.status(FORBIDDEN).json({message:'You are blocked'});
        }else{
          next();
        }
      }else{
        res.status(UNAUTHORIZED).json({message:'Not authorized, invalid token'})
      }
    }else{
      res.status(UNAUTHORIZED).json({message:'Token not available'})
    }
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({message: 'Not authorized'});
  }
}