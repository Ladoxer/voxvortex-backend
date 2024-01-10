import { NextFunction, Request, Response } from "express";
import PlanService from "../services/planService";

interface IPlanController {
  createPlan(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllPlans(req: Request, res: Response, next: NextFunction): Promise<void>;
  deletePlan(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class PlanController implements IPlanController{
  private planService: PlanService;

  constructor(){
    this.planService = new PlanService();
  }

  async createPlan(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const planDetails = req.body;

      const response = await this.planService.createPlan(planDetails);
      if(response){
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllPlans(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await this.planService.getAllPlans();
      if(data){
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  async deletePlan(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const planId = req.params.id;
      const data = await this.planService.deletePlan(planId);
      if(!data.responce){
        res.status(400).json(data);
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}