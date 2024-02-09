import { ILabel } from "../models/Label";
import LabelRepository from "../repositories/labelRepository";

interface ILabelService {
  createLabel(newLabel: ILabel): Promise<ILabel | null>;
  getLabelById(labelId: string): Promise<ILabel | null>;
  getAllLabels(): Promise<ILabel[]>;
  updateLabel(labelId: string, updatedLabel: Partial<ILabel>): Promise<ILabel | null>;
  deleteLabel(labelId: string): Promise<boolean>;
  getTotalLAbel(): Promise<number>;
  getTopLabels(): Promise<{ label: string; count: number; }[]>;
}

export default class LabelService implements ILabelService {
  private labelRepository: LabelRepository;

  constructor() {
    this.labelRepository = new LabelRepository();
  }

  async createLabel(newLabel: ILabel): Promise<ILabel | null> {
    return await this.labelRepository.createLabel(newLabel);
  }

  async getLabelById(labelId: string): Promise<ILabel | null> {
    return await this.labelRepository.getLabelById(labelId);
  }

  async getAllLabels(): Promise<ILabel[]> {
    return await this.labelRepository.getAllLabels();
  }

  async updateLabel(labelId: string, updatedLabel: Partial<ILabel>): Promise<ILabel | null> {
    return await this.labelRepository.updateLabel(labelId, updatedLabel);
  }

  async deleteLabel(labelId: string): Promise<boolean> {
    return await this.labelRepository.deleteLabel(labelId);
  }

  async getTotalLAbel(): Promise<number> {
    return await this.labelRepository.getTotalLabel();  
  }

  async getTopLabels(): Promise<{ label: string; count: number; }[]>{
    return await this.labelRepository.getTopLabels();
  }
}