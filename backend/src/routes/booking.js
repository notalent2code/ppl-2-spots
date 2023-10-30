import express from 'express';
import {
  bookCoworkingSpace,
  callbackBookingDetail,
  getBookingHistory,
} from '../controller/booking';
import { verifyAuth, verifyTenant } from '../middleware';

const router = express.Router();

// POST /bookings/:spaceId/book
router.post('/:spaceId/book', verifyAuth, verifyTenant, bookCoworkingSpace);

// GET /bookings/?order_id
router.get('/', verifyTenant, callbackBookingDetail);

// GET /bookings/history
router.get('/history', verifyAuth, getBookingHistory);

export default router;
