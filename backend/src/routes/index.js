import express from 'express';
import { verifyAuth } from '../middleware';

import adminRouter from './admin';
import tenantRouter from './tenant';
import ownerRouter from './owner';
import authRouter from './auth';
import bookingRouter from './booking';
import coworkingSpaceRouter from './coworkingSpace';
import paymentRouter from './payment';

const indexRouter = express.Router();

indexRouter.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome to Spots API Test 2' });
});

indexRouter.get('/test-auth', verifyAuth, (req, res, next) => {
  res.status(200).json({ message: 'Authentication testing success' });
});

export {
  indexRouter,
  authRouter,
  adminRouter,
  tenantRouter,
  ownerRouter,
  bookingRouter,
  coworkingSpaceRouter,
  paymentRouter,
};
