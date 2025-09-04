import mongoose, { Document, Schema } from 'mongoose';

export interface AuditLogDocument extends Document {
  action: 'create' | 'update' | 'delete';
  entity: string;
  // entityId: string;
  timestamp: Date;
  metadata?: any;
}

const AuditLogSchema = new Schema<AuditLogDocument>(
  {
    action:    { type: String, required: true },
    entity:    { type: String, required: true },
    // entityId:  { type: Schema.Types.ObjectId, required: true },
    timestamp: { type: Date, default: () => new Date() },
    metadata:  { type: Schema.Types.Mixed }
  },
  { collection: 'auditLogs' }
);

export const AuditLogModel = mongoose.model<AuditLogDocument>(
  'AuditLog',
  AuditLogSchema
);
