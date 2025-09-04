import { AuditLogModel } from './auditLog.model';
import { CreateAuditLogInput } from './createAuditLog.types';
import { ClientSession } from 'mongoose';

export class AuditLogRepository {
  async create(data: CreateAuditLogInput, session?: ClientSession) {
    const log = new AuditLogModel({
      ...data,
      timestamp: data.timestamp ?? new Date()
    });
    return log.save({ session });
  }
}
