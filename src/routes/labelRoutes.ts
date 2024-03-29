import { Router } from "express";
import LabelController from "../controllers/labelController";

const labelRouter = Router();
const labelController = new LabelController();

labelRouter.get('/', labelController.getAllLabels.bind(labelController));
labelRouter.get('/:id', labelController.getLabelById.bind(labelController));
labelRouter.post('/', labelController.createLabel.bind(labelController));
labelRouter.put('/:id',labelController.updateLabel.bind(labelController));
labelRouter.delete('/:id',labelController.deleteLabel.bind(labelController));
labelRouter.get('/dashboard/totalLabels', labelController.getTotalLabel.bind(labelController));
labelRouter.get('/dashboard/topLabels', labelController.getTopLabels.bind(labelController));

export default labelRouter;