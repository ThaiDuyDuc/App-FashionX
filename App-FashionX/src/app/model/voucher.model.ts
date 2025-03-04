// models/voucher.model.ts
import { BaseModel } from './baseModel.model';

export interface Voucher extends BaseModel {
  code: string;
  voucherConstraint: string;
  startDate: Date;
  endDate: Date;
  urlImage: string;
  name: string;
  quantity: number;
  status: boolean;
  type: string;
  value: number;
}
