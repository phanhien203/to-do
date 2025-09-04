import { Router, Request, Response } from 'express';
import { createTodoValidator } from './createTodo.validator';
import { CreateTodoService } from './createTodo.service';
import { asyncHandler } from '../../../shared/middleware/asyncHandler';

export const createTodoRouter = Router().post(
  '/todos',
  createTodoValidator,
  asyncHandler(async (req: Request, res: Response) => {
    const todo = await new CreateTodoService().execute(req.body);
    res.status(201).json({ isSuccess: true, data: todo, errors: [] });
  })
);
