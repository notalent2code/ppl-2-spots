import express from 'express';
import {
  getTenants,
  getOwners,
  verifyOwner,
  verifyCoworkingSpace,
} from '../controller/admin';

const router = express.Router();

// GET /admin/tenants
router.get('/tenants', getTenants);

// GET /admin/owners
router.get('/owners', getOwners);

// PUT /admin/owners/:ownerId/verify
router.put('/owners/:ownerId/verify', verifyOwner);

// PUT /admin/coworking-space/:spaceId/verify
router.put('/coworking-space/:spaceId/verify', verifyCoworkingSpace);

export default router;
