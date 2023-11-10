import Joi from 'joi';

const UpdateTenantSchema = Joi.object({
  email: Joi.string().email(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  phoneNumber: Joi.string()
    .pattern(new RegExp('^[1-9][0-9]{0,14}$'))
    .messages({
      'string.pattern.base':
        'Phone number must contain only numbers and starts with country code',
    }),
});

export default UpdateTenantSchema;