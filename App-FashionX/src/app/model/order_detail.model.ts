// models/order-detail.model.ts
import { ProductDetail } from './productDetail.model';
import { BaseModel } from './baseModel.model';
import { Product } from './product.model';

export interface OrderDetail extends BaseModel {
  orderId: number;
  productDetailId: number;
  price: number;
  quantity: number;
  status: boolean;
  totalMoney: number;
  // Relations
  productDetail?: ProductDetail;
  product?: Product;
}
