import { Router } from "express";
import { SubscriptionController } from "../controllers/subscriptionController";

const subscriptionRouter = Router();
const subscriptionController = new SubscriptionController();


subscriptionRouter.post('/:id', subscriptionController.createSubscription.bind(subscriptionController));
subscriptionRouter.post('/verifyPayment/:id',subscriptionController.verifyPayment.bind(subscriptionController));
subscriptionRouter.get('/plan/:id', subscriptionController.getUserPlan.bind(subscriptionController));
subscriptionRouter.post('/cancel/id',subscriptionController.cancelSubscription.bind(subscriptionController));
subscriptionRouter.get('/:id', subscriptionController.getUserSubscription.bind(subscriptionController));


export default subscriptionRouter;