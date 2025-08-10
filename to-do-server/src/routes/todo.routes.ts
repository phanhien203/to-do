import { Router } from 'express';
import { createTodo } from '../modules/controllers/todo.controller';

const router = Router();

router.post('/', createTodo);

export default router;
