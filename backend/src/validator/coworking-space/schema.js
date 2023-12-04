import Joi from 'joi';

const CreateCoworkingSpaceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  capacity: Joi.number().required(),
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  facilities: Joi.string()
    .required()
    .custom((value, helpers) => {
      try {
        const parsedValue = JSON.parse(value);
        if (Array.isArray(parsedValue)) {
          return parsedValue;
        }
        throw new Error('Invalid array format');
      } catch (error) {
        return helpers.error('any.custom', { message: 'Invalid array format' });
      }
    }),
});

const UpdateCoworkingSpaceSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  capacity: Joi.number(),
  address: Joi.string(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  facilities: Joi.string().custom((value, helpers) => {
    try {
      const parsedValue = JSON.parse(value);
      if (Array.isArray(parsedValue)) {
        return parsedValue;
      }
      throw new Error('Invalid array format');
    } catch (error) {
      return helpers.error('any.custom', { message: 'Invalid array format' });
    }
  }),
});

export { CreateCoworkingSpaceSchema, UpdateCoworkingSpaceSchema };
