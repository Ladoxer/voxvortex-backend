import { NextFunction, Request, Response } from "express";
import DashboardService from "../services/dashboardService";

export default class DashboardController {
  private dashboardService: DashboardService;
  constructor() {
    this.dashboardService = new DashboardService();
  }

  async getDashboardValues(req: Request, res: Response, next: NextFunction) {
    try {
      const dashboardData = await this.dashboardService.getDashboardValues();
      res.status(200).json(dashboardData);
    } catch (error) {
      next(error);
    }
  }
}