import ClientError from '@/error/ClientError';
import {
  CreateCoworkingSpaceSchema,
  UpdateCoworkingSpaceSchema,
} from './schema';

const CoworkingSpaceValidator = {
  validateCreateCoworkingSpacePayload: (payload) => {
    const result = CreateCoworkingSpaceSchema.validate(payload);

    if (result.error) {
      throw new ClientError(result.error.message);
    }

    return result.value;
  },

  validateUpdateCoworkingSpacePayload: (payload) => {
    const result = UpdateCoworkingSpaceSchema.validate(payload);

    if (result.error) {
      throw new ClientError(result.error.message);
    }

    return result.value;
  },
};

export default CoworkingSpaceValidator;
