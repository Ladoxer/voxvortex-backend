import Label,{ ILabel } from "../models/Label";

interface ILabelRepository {
  createLabel(newLabel: ILabel): Promise<ILabel | null>;
  getAllLabels(): Promise<ILabel[]>;
  updateLabel(labelId: string, updatedLabel: Partial<ILabel>): Promise<ILabel | null>;
  deleteLabel(labelId: string): Promise<boolean>;
}

export default class LabelRepository implements ILabelRepository {
  async createLabel(newLabel: ILabel): Promise<ILabel | null> {
    try {
      return await Label.create(newLabel);
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

}