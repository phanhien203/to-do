export interface CreateAuditLogInput {
  action: 'create' | 'update' | 'delete';
  entity: string;
  entityId: string;
  timestamp?: Date;
  metadata?: any;
}
