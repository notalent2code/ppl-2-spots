import ClientError from '@/error/ClientError';
import { CreateBookingSchema } from './schema';

const BookingValidator = {
  validateBookingPayload: (payload) => {
    const result = CreateBookingSchema.validate(payload);

    if (result.error) {
      throw new ClientError(result.error.message);
    }

    return result.value;
  },
};

export default BookingValidator;