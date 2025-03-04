// models/product-detail.model.ts
import { BaseModel } from './baseModel.model';
import { Product } from './product.model';
import { Size } from './size.model';
import { Color } from 'highcharts';
export interface ProductDetail extends BaseModel {
  productId: number;
  brandId: number;
  colorId: number;
  materialId: number;
  sizeId: number;
  soleId: number;
  styleId: number;
  tradeMarkId: number;
  price: number;
  quantity: number;
  status: boolean;
  // Relations
  product?: Product;
  color?: Color;
  size?: Size;
}
