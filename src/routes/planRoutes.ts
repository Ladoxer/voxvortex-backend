import { Router } from "express";
import { PlanController } from "../controllers/planController";

const planRouter = Router();
const planController = new PlanController();

planRouter.post('', planController.createPlan.bind(planController));
planRouter.get('',planController.getAllPlans.bind(planController));
planRouter.delete('/:id', planController.deletePlan.bind(planController));

export default planRouter;