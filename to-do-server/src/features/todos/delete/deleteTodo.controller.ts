import { Router, Request, Response } from 'express';
import { deleteTodoValidator } from './deleteTodo.validator';
import { TodoRepository } from '../todo.repository';
import { NotFoundError } from '../../../shared/errors/notFoundError';
import { asyncHandler } from '../../../shared/middleware/asyncHandler';

export const deleteTodoRouter = Router().delete(
  '/todos/:id',
  deleteTodoValidator,
  asyncHandler(async (req: Request, res: Response) => {
    const deleted = await new TodoRepository().delete(req.params.id);
    if (!deleted) throw new NotFoundError(`Todo với id=${req.params.id} không tồn tại`);
    res.status(200).json({ isSuccess: true, data: deleted, errors: [] });
  })
);
