import razorpay from "../config/razorpayConfig";
import PlanRepository from "../repositories/PlanRepository";

interface IPlanService {
  createPlan(planDetails: any): Promise<any>;
  getAllPlans(): Promise<any[]>;
  deletePlan(planId: string): Promise<any>;
}

export default class PlanService implements IPlanService {
  private planRepository: PlanRepository;

  constructor() {
    this.planRepository = new PlanRepository();
  }

  async createPlan(planDetails: any): Promise<any> {
    try {
      const plan: any = await razorpay.plans.create({
        interval: 1,
        period: planDetails.period,
        item: {
          name: planDetails.itemName,
          description: planDetails.description,
          amount: +planDetails.itemsAmount * 100,
          currency: "INR",
        }
      });

      if(plan.id){
        await this.planRepository.createPlan(planDetails,plan.id);
        return plan;
      }
      return null;
    } catch (error) {
      throw error;
    }  
  }

  async getAllPlans(): Promise<any[]> {
    try {
      return await this.planRepository.getAllPlans();
    } catch (error) {
      throw error;
    }  
  }

  async deletePlan(planId: string): Promise<any> {
    try {
      const deletePlan = await this.planRepository.deletePlan(planId);
      if(deletePlan.deletedCount >= 1){
        return {responce: 'Plan deleted!'};
      }
      return {error: 'error occurred when deleting plan'}
    } catch (error) {
      throw error;
    }  
  }
}