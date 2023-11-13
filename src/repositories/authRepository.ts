import User, {IUser} from "../models/User";

interface IAuthRepository {
  createUser(userDetails: Partial<IUser>): Promise<IUser | null>;

  findUserByEmail(email: string): Promise<IUser | null>;

  findById(userid: string): Promise<IUser | null>;

  updateVerificationStatus(id: string, value: boolean): Promise<void>;

  updateTokenByEmail(email: string, token: string): Promise<void>;

  findByTokenSlice(token: string): Promise<IUser | null>;

  updatePasswordById(id: string, password: string): Promise<void>;

  // updateOtp(userid: string, otp: string): Promise<void>;
}

export default class AuthRepository implements IAuthRepository {
  async createUser(userDetails: Partial<IUser>): Promise<IUser | null>{
    return await User.create(userDetails);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({email}).exec();
  }

  async findById(userid: string): Promise<IUser | null> {
    return await User.findOne({_id: userid});
  }

  async updateVerificationStatus(id: string, value: boolean): Promise<void> {
    await User.updateOne({_id:id},{is_verified:value, otp:''});
  }

  async updateTokenByEmail(email: string, token: string): Promise<void> {
    await User.updateOne({email:email},{$set:{token:token}});
  }

  async findByTokenSlice(token: string): Promise<IUser | null> {
    return await User.findOne({token:token});
  }

  async updatePasswordById(id: string, password: string): Promise<void> {
    await User.updateOne({_id:id},{$set:{ password: password }});
  }

  static async updateOtp(userid: string, otp: string): Promise<void> {
    await User.updateOne({_id:userid},{otp});
  }
}