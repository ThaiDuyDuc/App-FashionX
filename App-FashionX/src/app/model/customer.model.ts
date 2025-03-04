// models/customer.model.ts
import { BaseModel } from './baseModel.model';

export interface Customer extends BaseModel {
  fullName: string;
  dateOfBirth: Date;
  gender: string;
  urlImage: string;
  phoneNumber: string;
  password: string;
  status: boolean;
}
