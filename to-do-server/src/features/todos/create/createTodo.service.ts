import mongoose from 'mongoose';
import { TodoRepository } from '../todo.repository';
import { CreateTodoInput } from './createTodo.types';
import { AuditLogRepository } from '../../auditLogs/auditLog.repository';
import { ApiError } from '../../../shared/errors/apiError';

export class CreateTodoService {
  constructor(
    private repo = new TodoRepository(),
    private auditRepo = new AuditLogRepository()
  ) {}

  async execute(input: CreateTodoInput) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Tạo ToDo
      const todo = await this.repo.create(input, session);

      // 2. Ghi audit log trong cùng transaction
      await this.auditRepo.create(
        {
          action: 'create',
          entity: 'Todo',
          entityId: todo._id.toString(),
          metadata: { title: input.title, priority: input.priority },
        },
        session
      );

      // 3. Commit
      await session.commitTransaction();
      return todo;
    } catch (err) {
      await session.abortTransaction();
      throw new ApiError(500, 'Tạo ToDo thất bại', [
        err instanceof Error ? err.message : 'Unknown error',
      ]);
    } finally {
      session.endSession();
    }
  }
}
