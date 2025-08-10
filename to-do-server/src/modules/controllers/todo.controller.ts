import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../utils';
import { CreateTodosRequestBody } from '../dto/todo.dto';
import { TodoService } from '../services/todo.service';

export const createTodo = async (req: Request<{}, {}, CreateTodosRequestBody>, res: Response) => {
  try {
    const todoService = new TodoService;
    const todo = await todoService.createTodo(req.body);
    return successResponse(res, { todo }, 'Todo created successfully', 201);

  } catch (error) {

    if (error.name === 'ValidationError') {
      return errorResponse(res, error.message, 'VALIDATION_ERROR', 400);
    }

    return errorResponse(res, 'Failed to create todo', 'CREATE_ERROR');
  }
};
