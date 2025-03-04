import { Product } from './product.model';

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  subtotal: number;
}
