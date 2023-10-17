import express from 'express';
import { getTenantProfile, updateTenantProfile } from '../controller/tenant';
import { avatarUpload } from '../util/uploadImage';

const router = express.Router();

// GET /tenants/profile
router.get('/profile', getTenantProfile);

// PUT /tenants/profile
router.put('/profile', avatarUpload.single('avatarURL'), updateTenantProfile);

export default router;
