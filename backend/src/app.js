import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'pino-http';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

import {
  verifyAuth,
  verifyAdmin,
  verifyOwner,
  verifyTenant,
} from './middleware';

import {
  indexRouter,
  authRouter,
  adminRouter,
  tenantRouter,
  ownerRouter,
  bookingRouter,
  coworkingSpaceRouter,
  paymentRouter,
} from './routes';

const app = express();

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:8080', 'https://spotscoworking.live'],
    credentials: true,
  })
);
// app.use(logger({
//   transport: {
//     target: 'pino-pretty',
//   }  
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '../static')));
app.use(cookieParser());

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/tenants', verifyAuth, verifyTenant, tenantRouter);
app.use('/owners', verifyAuth, verifyOwner, ownerRouter);
app.use('/admin/', verifyAuth, verifyAdmin, adminRouter);
app.use('/coworking-spaces', coworkingSpaceRouter);
app.use('/bookings', verifyAuth, bookingRouter);
app.use('/payments', verifyAuth, paymentRouter);

// The 404 Route
app.get('*', function (_req, res) {
  res.status(404).json({ message: 'Page Not Found' });
});

export default app;