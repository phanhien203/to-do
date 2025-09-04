import { celebrate, Joi, Segments } from 'celebrate';

export const listTodosValidator = celebrate({
  [Segments.QUERY]: Joi.object({
    page:     Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().min(1).max(100).default(20)
  })
});
