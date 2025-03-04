export interface OrderHistory {
  id: number;
  shop_order_id: number;
  date: Date;
  action_description: string;
  action_status: boolean;
}
