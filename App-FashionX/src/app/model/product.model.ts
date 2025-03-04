// models/product.model.ts
import { BaseModel } from './baseModel.model';

export interface Product extends BaseModel {
  code: string;
  description: string;
  urlImage: string;
  name: string;
  status: boolean;
}
