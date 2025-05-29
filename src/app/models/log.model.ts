export interface Log {
  id?: number;
  action: 'create' | 'update' | 'delete';
  entity: string;
  timestamp: string;
  message: string; // ✅ Adicione esta linha
  details: any;
}
