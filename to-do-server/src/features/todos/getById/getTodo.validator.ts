import { celebrate, Joi, Segments } from 'celebrate';

export const getTodoValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required()
  })
});
