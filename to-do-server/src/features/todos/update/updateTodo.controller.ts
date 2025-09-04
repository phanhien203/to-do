import { Router, Request, Response } from 'express';
import { updateTodoValidator } from './updateTodo.validator';
import { UpdateTodoService } from './updateTodo.service';
import { asyncHandler } from '../../../shared/middleware/asyncHandler';

export const updateTodoRouter = Router().put(
  '/todos/:id',
  updateTodoValidator,
  asyncHandler(async (req: Request, res: Response) => {
    const updated = await new UpdateTodoService().execute(req.params.id, req.body);
    res.status(200).json({ isSuccess: true, data: updated, errors: [] });
  })
);
