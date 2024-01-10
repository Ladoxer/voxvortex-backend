import { NextFunction, Request, Response } from "express";
import { SubscriptionService } from "../services/subscriptionService";

interface ISubscriptionController{
  createSubscription(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyPayment(req: Request, res: Response, next: NextFunction): Promise<void>;
  cancelSubscription(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class SubscriptionController implements ISubscriptionController{
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  async createSubscription(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const {planId} = req.body;

      const data = await this.subscriptionService.createSubscription(userId,planId);
      if(data){

        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  async verifyPayment(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature} = req.body;

      const userId = req.params.id;

      const responce = await this.subscriptionService.verifyPayment(razorpay_payment_id, razorpay_subscription_id, razorpay_signature,userId);

      if(responce.success){
        res.status(200).json(responce);
      } else {
        res.status(400).json(responce);
      }
    } catch (error) {
      next(error);
    }
  }

  async getUserPlan(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const userId = req.params.id;

      const plan = await this.subscriptionService.getUserPlan(userId);

      if(plan){
        res.status(200).json(plan);
      }
    } catch (error) {
      next(error);
    }
  }

  async cancelSubscription(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const subscriptionId = req.body.subscription_id;
      console.log('start', subscriptionId);
      const responce = await this.subscriptionService.cancelSubscription(subscriptionId);
      // console.log(responce);

      if(responce.success){
        res.status(200).json(responce);
      }else{
        res.status(400).json(responce);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getUserSubscription(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const userId = req.params.id;
      const sub = await this.subscriptionService.getUserSubscription(userId);

      res.status(200).json(sub);
    } catch (error) {
      next(error);
    }
  }
}