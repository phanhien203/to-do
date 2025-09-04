import { celebrate, Joi, Segments } from 'celebrate';

export const createTodoValidator = celebrate({
  [Segments.BODY]: Joi.object({
    title:       Joi.string().min(1).max(100).required(),
    description: Joi.string().allow(''),
    priority:    Joi.string().valid('low','medium','high'),
    dueDate:     Joi.date().iso()
  })
});
