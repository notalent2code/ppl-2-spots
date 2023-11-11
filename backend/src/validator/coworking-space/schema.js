import Joi from 'joi';

const CreateCoworkingSpaceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  capacity: Joi.number().required(),
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  facilities: Joi.array().items(Joi.number()).required(),
});

const UpdateCoworkingSpaceSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  capacity: Joi.number(),
  address: Joi.string(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  facilities: Joi.array().items(Joi.number()),
});

export { CreateCoworkingSpaceSchema, UpdateCoworkingSpaceSchema };
