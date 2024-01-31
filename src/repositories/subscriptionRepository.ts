import Subscription, { ISubscription } from "../models/Subscription";

interface ISubscriptionRepository {
  createSubscription(
    userId: string,
    planId: string,
    subscriptionId: string
  ): Promise<any>;
  cancelSubscription(subscriptionId: string): Promise<any>;
  getPlanId(userId: string): Promise<string | undefined>;
  getUserSubscription(subscriptionId: string): Promise<ISubscription | null>;
}

export default class SubscriptionRepository implements ISubscriptionRepository {
  async createSubscription(
    userId: string,
    planId: string,
    subscriptionId: string
  ): Promise<any> {
    try {
      // const userData: IUser | null = await User.findOne({_id:userId});

      // if(!userData?.customerId){
      //   if(userData?.name){
      //     const customerId = await razorpay.customers.create({
      //       name: userData?.name,
      //       email: userData?.email,
      //       contact: userData?.mobile
      //     })

      //     const subscription: any = await razorpay.subscriptions.create({
      //       plan_id: planId,
      //       total_count: 12,
      //       start_at: Math.floor(Date.now() / 1000),
      //     });

      //     if(subscription.id){
      //       const saveSub = await Subscription.create({
      //         userId: userId,
      //         planId: planId,
      //         subscriptionId: subscription.id
      //       });
      //     }

      //     return subscription;
      //   }
      // }

      // const subscription: any = await razorpay.subscriptions.create({
      //   plan_id: planId,
      //   total_count: 12,
      //   quantity: 1,
      //   customer_notify: 1,
      //   start_at: Math.ceil(Date.now() / 1000),
      // });

      const saveSub = await Subscription.create({
        userId: userId,
        planId: planId,
        subscriptionId: subscriptionId,
      });

      return saveSub;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<ISubscription | null> {
    try {
      const cancelSub = await Subscription.findOneAndUpdate({subscriptionId:subscriptionId},{$set:{status: false}});
      return cancelSub;
    } catch (error) {
      throw error;
    }
  }

  async getPlanId(userId: string): Promise<string | undefined> {
    try {
      const sub = await Subscription.findOne({userId});
      return sub?.planId;
    } catch (error) {
      throw error;
    }
  }

  async getUserSubscription(userId: string): Promise<any>{
    try {
      const sub = await Subscription.findOne({userId,status:true});
      console.log(sub);
      
      return sub;
    } catch (error) {
      throw error;
    }
  }

  async updateSubscription(subscription_Id: string,value: boolean): Promise<void>{
    try {
      await Subscription.findOneAndUpdate({subscriptionId:subscription_Id},{$set:{status:value}});
    } catch (error) {
      throw error;
    }
  }
}
