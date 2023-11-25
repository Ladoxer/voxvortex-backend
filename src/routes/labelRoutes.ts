import { Router } from "express";
import LabelController from "../controllers/labelController";

const labelRouter = Router();
const labelController = new LabelController();

labelRouter.get('/', labelController.getAllLabels.bind(labelController));
labelRouter.post('/', labelController.createLabel.bind(labelController));
labelRouter.put('/:id',labelController.updateLabel.bind(labelController));
labelRouter.delete('/:id',labelController.deleteLabel.bind(labelController));

export default labelRouter;