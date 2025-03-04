// models/payment.model.ts
import { BaseModel } from './baseModel.model';

export interface Payment extends BaseModel {
  totalMoney: number;
  transactionCode: string;
  shopOrderId: number;
  paymentMethodId: number;
}
