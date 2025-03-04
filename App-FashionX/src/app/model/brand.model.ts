import { BaseModel } from './baseModel.model';

export interface Brand extends BaseModel {
  id: number;
  name: string;
  status: boolean;
}
