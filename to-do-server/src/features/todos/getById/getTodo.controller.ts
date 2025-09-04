import { Router, Request, Response } from 'express';
import { getTodoValidator } from './getTodo.validator';
import { TodoRepository } from '../todo.repository';
import { NotFoundError } from '../../../shared/errors/notFoundError';
import { asyncHandler } from '../../../shared/middleware/asyncHandler';

export const getTodoRouter = Router().get(
  '/todos/:id',
  getTodoValidator,
  asyncHandler(async (req: Request, res: Response) => {
    const todo = await new TodoRepository().findById(req.params.id);
    if (!todo) throw new NotFoundError(`Todo với id=${req.params.id} không tồn tại`);
    res.status(200).json({ isSuccess: true, data: todo, errors: [] });
  })
);
