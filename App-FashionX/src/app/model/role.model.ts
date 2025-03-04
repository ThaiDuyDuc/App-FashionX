// role.model.ts
export interface Role {
  id: number;
  Created_by: string;
  Updated_by: string;
  Created_at: Date;
  Updated_at: Date;
  Deleted: boolean;
  Name: string;
}
