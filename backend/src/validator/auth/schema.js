import Joi from 'joi';

const RegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('[A-Z]'))
    .pattern(new RegExp('[0-9]'))
    .pattern(new RegExp('[!@#$%^&*()_+{}\\[\\]:;<>,.?/\\\\~`\'"|-]'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    }),
  confirmPassword: Joi.ref('password'),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(new RegExp('^[1-9][0-9]{0,14}$'))
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must contain only numbers and starts with country code',
    }),
  userType: Joi.string().valid('TENANT', 'OWNER').required(),
});

const LoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { RegisterSchema, LoginSchema };
