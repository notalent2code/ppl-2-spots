import ClientError from '@/error/ClientError';
import UpdateOwnerSchema from './schema';

const OwnerValidator = {
  validateOwnerUpdatePayload: (payload) => {
    const result = UpdateOwnerSchema.validate(payload);

    if (result.error) {
      throw new ClientError(result.error.message);
    }

    return result.value;
  },
};

export default OwnerValidator;