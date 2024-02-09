import Label,{ ILabel } from "../models/Label";
import Blog from "../models/Blog";

interface ILabelRepository {
  createLabel(newLabel: ILabel): Promise<ILabel | null>;
  getLabelById(labelId: string): Promise<ILabel | null>;
  getAllLabels(): Promise<ILabel[]>;
  updateLabel(labelId: string, updatedLabel: Partial<ILabel>): Promise<ILabel | null>;
  deleteLabel(labelId: string): Promise<boolean>;
  getTotalLabel(): Promise<number>;
  getTopLabels(): Promise<{label: string; count: number}[]>;
}

export default class LabelRepository implements ILabelRepository {
  async createLabel(newLabel: ILabel): Promise<ILabel | null> {
    try {
      return await Label.create(newLabel);
    } catch (error) {
      return null;
    }
  }

  async getLabelById(labelId: string): Promise<ILabel | null> {
    try {
      return await Label.findById(labelId);
    } catch (error) {
      return null;
    }
  }

  async getAllLabels(): Promise<ILabel[]> {
    try {
      return await Label.find().exec();
    } catch (error) {
      return [];
    }
  }

  async updateLabel(labelId: string, updatedLabel: Partial<ILabel>): Promise<ILabel | null> {
    try {
      const label = await Label.findByIdAndUpdate(labelId, updatedLabel, { new: true }).exec();
      return label;
    } catch (error) {
      return null;
    }
  }

  async deleteLabel(labelId: string): Promise<boolean> {
    try {
      const result = await Label.findByIdAndDelete(labelId).exec();
      return !!result;
    } catch (error) {
      return false;
    }
  }

  async getTotalLabel(): Promise<number> {
    try {
      const nLabel = await Label.find().exec();
      return nLabel.length;
    } catch (error) {
      throw error;
    }  
  }

  async getTopLabels(): Promise<{ label: string; count: number; }[]> {
    try {
      const topLabels = await Blog.aggregate([
        {$group: {_id: "$label", count: {$sum: 1}}},
        {$sort: {count: -1}},
        {$limit: 5},
        {$lookup: {from: "labels", localField:"_id", foreignField: "_id", as: "label"}},
        {$unwind: "$label"},
        {$project: {_id: 0, label: "$label.label", count: 1}}
      ]).exec();

      return topLabels;
    } catch (error) {
      throw error;
    }
  }

}