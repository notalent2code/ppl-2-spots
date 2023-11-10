import ClientError from '@/error/ClientError'
import { RegisterSchema, LoginSchema } from './schema';

const AuthValidator = {
  validateRegisterPayload: (payload) => {
    const result = RegisterSchema.validate(payload);
    if (result.error) {
      throw new ClientError(result.error.message)
    }

    return result.value;
  },
  validateLoginPayload: (payload) => {
    const result = LoginSchema.validate(payload);
    if (result.error) {
      throw new ClientError(result.error.message)
    }

    return result.value;
  },
};

export default AuthValidator;
