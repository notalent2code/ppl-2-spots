import ClientError from '@/error/ClientError'
import UpdateTenantSchema from './schema';

const TenantValidator = {
  validateTenantUpdatePayload: (payload) => {
    const result = UpdateTenantSchema.validate(payload);
    if (result.error) {
      throw new ClientError(result.error.message)
    }

    return result.value;
  },
};

export default TenantValidator;
