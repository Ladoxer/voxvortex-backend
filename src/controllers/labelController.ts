import { NextFunction, Request, Response } from "express";
import LabelService from "../services/labelService";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ILabel } from "../models/Label";

interface ILabelController {
  createLabel(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllLabels(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateLabel(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteLabel(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default class LabelController implements ILabelController {
  private labelService: LabelService;

  constructor(){
    this.labelService = new LabelService();
  }

  async createLabel(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
    try {
      const newLabel: ILabel = req.body;
      const createdLabel = await this.labelService.createLabel(newLabel);

      if(createdLabel) {
        res.status(201).json(createdLabel);
      }else{
        res.status(500).json({
          message: 'Failed to create label'
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllLabels(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
    try {
      const labels = await this.labelService.getAllLabels();
      res.status(200).json(labels);
    } catch (error) {
      next(error);
    }
  }

  async updateLabel(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
    try {
      const labelId = req.params.id;
      const updatedLabel: Partial<ILabel> = req.body;
      const label = await this.labelService.updateLabel(labelId, updatedLabel);

      if(label) {
        res.status(200).json(label);
      }else{
        res.status(404).json({
          message: 'Label not found'
        });
      }

    } catch (error) {
      next(error);
    }
  }

  async deleteLabel(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): Promise<void> {
    try {
      const labelId = req.params.id;
      const result = await this.labelService.deleteLabel(labelId);

      if(result){
        res.status(200).json({
          message: 'Label deleted successfully'
        });
      }else{
        res.status(404).json({
          message: 'Label not found'
        });
      }

    } catch (error) {
      next(error);
    }
  }

}