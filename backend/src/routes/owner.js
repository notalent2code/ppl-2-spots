import express from 'express';
import {
  getOwnerInfo,
  updateOwnerInfo,
  getCoworkingFacilities,
} from '../controller/owner';
import { ktpUpload } from '../util/uploadImage';

const router = express.Router();

// GET /owners/info
router.get('/info', getOwnerInfo);

// PUT /owners/info
router.put('/info', ktpUpload.single('ktpURL'), updateOwnerInfo);

// GET /owners/facilities
router.get('/facilities', getCoworkingFacilities);

export default router;
