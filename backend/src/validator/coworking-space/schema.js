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
      const facilityIds = value.split(',').map((facility) => facility.trim());
      if (facilityIds.every((id) => /^\d+$/.test(id))) {
        return facilityIds;
      }
      return helpers.error('any.custom', { message: 'Invalid facility IDs' });
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
    const facilityIds = value.split(',').map((facility) => facility.trim());
    if (facilityIds.every((id) => /^\d+$/.test(id))) {
      return facilityIds;
    }
    return helpers.error('any.custom', { message: 'Invalid facility IDs' });
  }),
});

export { CreateCoworkingSpaceSchema, UpdateCoworkingSpaceSchema };
