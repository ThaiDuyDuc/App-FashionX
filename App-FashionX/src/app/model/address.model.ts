// address.model.ts
export interface Address {
  id: number;
  Created_by: string;
  Updated_by: string;
  Created_at: Date;
  Updated_at: Date;
  Deleted: boolean;
  Address: string;
  District_name: string;
  Province_name: string;
  Province_id: number;
  Ware_name: string;
  Ware_code: string;
  Customer_id: number;
}
