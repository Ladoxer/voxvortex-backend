import Plan, { IPlan } from "../models/Plan";

interface IPlanRepository {
  createPlan(planDetails: any, planId: string): Promise<any>;
  deletePlan(planId: string): Promise<any>;
  getAllPlans(): Promise<any[]>;
  getPlanAmount(planId: string): Promise<number | undefined>;
  getPlanById(planId: string): Promise<IPlan | null>;
}

export default class PlanRepository implements IPlanRepository {
  async createPlan(planDetails: any, planId: string): Promise<any> {
    try {
      const savePlan = await Plan.create({
        name: planDetails.itemName,
        description: planDetails.description,
        period: planDetails.period,
        amount: planDetails.itemsAmount,
        planId: planId
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllPlans(): Promise<any[]> {
    try {
      const plans = await Plan.find();
      return plans;
    } catch (error) {
      throw error;
    }
  }

  async deletePlan(planId: string): Promise<any> {
    try {
      const data = await Plan.deleteOne({planId:planId});

      return data;
    } catch (error) {
      throw error;
    }  
  }

  async getPlanAmount(planId: string): Promise<number | undefined> {
    try {
      const data = await Plan.findOne({planId});

      return data?.amount;
    } catch (error) {
      throw error;
    }
  }

  async getPlanById(planId: string): Promise<IPlan | null>{
    try {
      const plan = await Plan.findOne({planId});
      return plan;
    } catch (error) {
      throw error;
    }
  }
}