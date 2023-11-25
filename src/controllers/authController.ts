import { NextFunction, Request, Response } from "express";
import AuthRepository from "../repositories/authRepository";
import bcrypt from 'bcrypt';
import { generateAuthToken, jwtVerify } from "../utils/token";
import { sendMail, sendreset } from "../utils/mail";
import { JwtPayload } from "jsonwebtoken";
import randomstring from "randomstring";
import { log } from "console";

export default class AuthController {
  private authRepository: AuthRepository
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async postRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, mobile, password } = req.body;
      const existingUser = await this.authRepository.findUserByEmail(email);

      if(existingUser){
        return res.status(400).json({
          message: "This email is already registered"
        })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.authRepository.createUser({
        name,
        email,
        mobile,
        password: hashedPassword
      });

      if(user){
        sendMail({name: user.name, email: user.email, userid: user._id});
        return res.status(200).json(user);
      }else{
        return res.status(400).json({
          message:"Can't registered, Something went wrong"
        });
      }

    } catch (error) {
      // console.log(error.message);
      next(error);
    }
  }

  async postVerification(req: Request,res: Response, next: NextFunction) {
    try {
      const otp = (req.body.verification).toString();
      const id = req.query.id as string;
      
      const userData = await this.authRepository.findById(id);
      console.log(userData);
      
      
      if(!userData) {
        return res.status(400).json({
          message: "User not found"
        });
      }

      console.log(otp);
      

      if(userData.otp === otp) {
        
        await this.authRepository.updateVerificationStatus(id, true);
        return res.status(200).json({
          message: 'Success'
        });
      }
      return res.status(401).json({
        message: 'Invalid Otp'
      });
    } catch (error) {
      throw error;
      next(error);
    }
  }

  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await this.authRepository.findUserByEmail(email);

      if(!userData) {
        return res.status(401).json({
          message: 'User not found'
        });
      }

      if(!userData.is_verified) {
        return res.status(401).json({
          message: 'User not verified'
        });
      }

      if(userData.is_blocked) {
        return res.status(401).json({
          message:'User is blocked'
        });
      }

      const passwordMatch = await bcrypt.compare(password, userData.password);

      if(!passwordMatch) {
        return res.status(401).json({
          message: 'Password is incorrect'
        });
      }

      const token = generateAuthToken(userData);
    
      return res.status(200).json({token:token,userData:userData._id});
    } catch (error) {
      next(error);
    }
  }

  async activeUser(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.jwt;

      if(!token){
        return res.status(401).json({
          message: 'Unauthenticated'
        });
      }

      const claims = jwtVerify(token, process.env.JWT_SECRET as string) as JwtPayload;

      if(!claims) {
        return res.status(401).json({
          message: 'Unauthenticated'
        });
      }

      const user = await this.authRepository.findById(claims._id as string);

      if (!user) {
        return res.status(404).json();
        // soemthing..
      }

      const {password, ...data} = user.toJSON();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async reVerification(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      const userData = await this.authRepository.findUserByEmail(email);
  
      if (!userData) {
        return res.status(404).json();
      }
  
      sendMail({name: userData.name, email: userData.email, userid: userData._id});
  
      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.verification;
      const token = randomstring.generate();

      await this.authRepository.updateTokenByEmail(email, token);

      const userData = await this.authRepository.findUserByEmail(email);

      if(!userData){
        return res.status(404).json();
      }

      sendreset({name: userData.name, email: userData.email, token: token});

      return res.status(200).json({
        message: "Success"
      });
    } catch (error) {
      next(error);
    }
  }

  async forgot(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.params.token;
      const slice = token.slice(6);
      const password = req.body.verification;

      const userData = await this.authRepository.findByTokenSlice(slice);

      if(!userData) {
        return res.status(404).json();
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.authRepository.updatePasswordById(userData._id, hashedPassword);

      return res.status(200).json({
        message: 'Success'
      });
    } catch (error) {
      next(error);
    }
  }

  async adminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body;

      const adminData = await this.authRepository.findAdminByEmail(email);
      if(!adminData){
        return res.status(401).json({
          message:'UnAutharised'
        })
      }
      

      console.log("adminData",adminData);
      

      const passwordMatch = await bcrypt.compare(password, adminData.password);
      

      if(!passwordMatch){
        return res.status(401).json({
          message:'Password is incorrect'
        });
      }

      const token = generateAuthToken(adminData);
      return res.status(200).json(token);

    } catch (error) {
      next(error);
    }
  }
}