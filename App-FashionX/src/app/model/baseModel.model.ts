// models/base.model.ts
export interface BaseModel {
  id: number;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}
