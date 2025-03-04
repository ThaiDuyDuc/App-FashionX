// models/order.model.ts
import { BaseModel } from './baseModel.model';
import { OrderDetail } from './order_detail.model';

export interface Order extends BaseModel {
  customerId: number;
  employeeId: number;
  shopVoucherId: number;
  addressId: number;
  confirmationDate: Date;
  deliveryStartDate: Date;
  expectedDeliveryDate: Date;
  fullName: string;
  note: string;
  phoneNumber: string;
  receivedDate: Date;
  shoppingMoney: number;
  status: boolean;
  totalMoney: number;
  type: string;
  code: string;

  orderDetails: OrderDetail[]; // Thêm dòng này
}
