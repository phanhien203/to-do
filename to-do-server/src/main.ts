import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { errors as celebrateErrors } from 'celebrate';

import { createTodoRouter } from './features/todos/create/createTodo.controller';
import { getTodoRouter }    from './features/todos/getById/getTodo.controller';
import { listTodosRouter }  from './features/todos/list/listTodos.controller';
import { updateTodoRouter } from './features/todos/update/updateTodo.controller';
import { deleteTodoRouter } from './features/todos/delete/deleteTodo.controller';
import { errorHandler }     from './shared/middleware/errorHandler';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '10kb' }));
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => res.sendStatus(200));

  app.use('/api',
    createTodoRouter,
    getTodoRouter,
    listTodosRouter,
    updateTodoRouter,
    deleteTodoRouter
  );

  app.use(celebrateErrors());

  app.use((_req, res) =>
    res.status(404).json({ isSuccess: false, data: null, errors: ['Not Found'] })
  );

  app.use(errorHandler);
  return app;
}
