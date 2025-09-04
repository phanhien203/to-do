import { Router, Request, Response } from 'express';
import { listTodosValidator } from './listTodos.validator';
import { TodoRepository } from '../todo.repository';
import { asyncHandler } from '../../../shared/middleware/asyncHandler';

export const listTodosRouter = Router().get(
  '/todos',
  listTodosValidator,
  asyncHandler(async (req: Request, res: Response) => {
    const todos = await new TodoRepository().findAll();
    res.status(200).json({ isSuccess: true, data: todos, errors: [] });
  })
);
