// employee.model.ts
export interface Employee {
  id: number;
  Created_by: string;
  Updated_by: string;
  Created_at: Date;
  Updated_at: Date;
  Deleted: boolean;
  Full_name: string;
  Address: string;
  Email: string;
  Phone_number: string;
  Password: string;
  Role_id: number;
}
