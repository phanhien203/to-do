// src/features/todos/delete/deleteTodo.validator.ts
import { celebrate, Joi, Segments } from 'celebrate';

export const deleteTodoValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});
