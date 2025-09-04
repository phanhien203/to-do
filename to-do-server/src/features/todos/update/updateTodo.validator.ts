import { celebrate, Joi, Segments } from 'celebrate';

export const updateTodoValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required()
  }),
  [Segments.BODY]: Joi.object({
    title:       Joi.string().min(1).max(100),
    description: Joi.string().allow(''),
    isCompleted: Joi.boolean(),
    priority:    Joi.string().valid('low','medium','high'),
    dueDate:     Joi.date().iso()
  }).min(1)
});
