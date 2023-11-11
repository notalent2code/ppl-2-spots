import Joi from 'joi';

const UpdateOwnerSchema = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  phoneNumber: Joi.string()
    .pattern(new RegExp('^[1-9][0-9]{0,14}$'))
    .messages({
      'string.pattern.base':
        'Phone number must contain only numbers and starts with country code',
    }),
  nik: Joi.string().pattern(new RegExp('^[0-9]{16}$')).messages({
    'string.pattern.base': 'NIK must contain only numbers and 16 characters',
  }),
  bankName: Joi.string(),
  cardNumber: Joi.string().pattern(new RegExp('[0-9]$')).messages({
    'string.pattern.base': 'Card number must contain only numbers',
  }),
});

export default UpdateOwnerSchema;