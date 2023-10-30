import express from 'express';
import { verifyTenant } from '../middleware';
import { paymentBooking } from '../controller/payment';

const router = express.Router();

// POST /payment/booking
router.post('/booking', verifyTenant, paymentBooking);

// // POST /payment/withdrawal
// router.post("/withdrawal", verifyOwner, paymentWithdrawal);

export default router;
