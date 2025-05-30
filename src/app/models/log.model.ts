// src/app/models/log.model.ts
export interface Log {
  id?: number; // Optional for new logs
  action: 'create' | 'update' | 'delete' | string;
  entity: string;
  timestamp: string;
  message: string;
  details: any;
}