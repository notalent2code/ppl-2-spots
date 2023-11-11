import Joi from 'joi';

const CreateBookingSchema = Joi.object({
  date: Joi.string()
    .pattern(new RegExp(/^\d{4}-\d{2}-\d{2}$/))
    .required()
    .messages({
      'string.pattern.base': 'Date must be in YYYY-MM-DD format',
    }),
  startHour: Joi.number().required(),
  endHour: Joi.number().required(),
  totalPrice: Joi.number().required(),
});

export { CreateBookingSchema };
