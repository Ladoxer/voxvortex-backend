import razorpay from "../config/razorpayConfig";
import SubscriptionRepository from "../repositories/subscriptionRepository";
import env from "dotenv";
import crypto from 'crypto';
import UserRepository from "../repositories/userRepository";
import PlanRepository from "../repositories/PlanRepository";
import { IPlan } from "../models/Plan";
import { ISubscription } from "../models/Subscription";
env.config();

interface ISubscriptionService{
  createSubscription(userId: string, planId: string): Promise<any>;
  verifyPayment(razorpay_payment_id: string, razorpay_subscription_id: string, razorpay_signature: string, userId:string): Promise<any>;
  getUserPlan(userId: string): Promise<IPlan | null | undefined>;
  cancelSubscription(subscriptionId:string): Promise<{success:boolean, message:string}>;
  getUserSubscription(subscriptionId:string): Promise<ISubscription | null>;
}

export class SubscriptionService implements ISubscriptionService{
  private subscriptionRepository: SubscriptionRepository;
  private userRepository: UserRepository;
  private planRepository: PlanRepository;

  constructor() {
    this.subscriptionRepository = new SubscriptionRepository();
    this.userRepository = new UserRepository();
    this.planRepository = new PlanRepository();
  }

  async createSubscription(userId: string, planId: string): Promise<any> {
    try {
      const subscription: any = await razorpay.subscriptions.create({
        plan_id: planId,
        total_count: 12,
        quantity: 1,
        customer_notify: 1,
        // start_at: Math.floor((Date.now() + 24 * 60 * 60 * 1000) / 1000),
      });

      if(subscription.id){
        await this.subscriptionRepository.createSubscription(userId,planId,subscription.id);

        const planAmount = await this.planRepository.getPlanAmount(planId);
        return {subscription_id:subscription.id, amount: planAmount};
      }
      return null;
    } catch (error) {
      throw error;
    }  
  }

  async verifyPayment(razorpay_payment_id: string, razorpay_subscription_id: string, razorpay_signature: string, userId:string): Promise<any> {
    try {      
      const text = `${razorpay_payment_id}|${razorpay_subscription_id}`;
      const generatedSignature = crypto.createHmac('sha256',process.env.RAZORKEY || '').update(text).digest('hex');

      if(generatedSignature === razorpay_signature) {
        
        await this.userRepository.updatePremium(userId,true);
        await this.subscriptionRepository.updateSubscription(razorpay_subscription_id,true);
        return {success: true, message: 'Payment verification successful'}
      } else {
        return {success: false, message: 'Invalid payment signature'}
      }
    } catch (error) {
      throw error;
    }
  }

  async cancelSubscription(subscription_Id:string): Promise<{success:boolean, message:string}>{
    try {
      const cancelSub:any = await razorpay.subscriptions.cancel(subscription_Id);
      // console.log('dfghjk')

      // console.log(cancelSub.jjjhh);

      if(cancelSub.status === 'cancelled'){
        console.log('if')
        const sub: ISubscription | null = await this.subscriptionRepository.cancelSubscription(subscription_Id);
        if(sub){
          await this.userRepository.updatePremium(sub.userId,false);
          await this.subscriptionRepository.updateSubscription(subscription_Id,false);
        }

        return {success: true, message: 'Subscription cancelled successfully..'};
      }else{
        console.log("else")
        return {success: false, message:'Something went wrong!..'};
      }

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserPlan(userId: string): Promise<IPlan | null | undefined>{
    try {
      const planId = await this.subscriptionRepository.getPlanId(userId);
      if(planId){
        const plan = await this.planRepository.getPlanById(planId);
        return plan;
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserSubscription(userId:string): Promise<ISubscription | null>{
    try {
      const sub: ISubscription | null = await this.subscriptionRepository.getUserSubscription(userId);
      return sub;
    } catch (error) {
      throw error;
    }
  }
}