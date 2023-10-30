import express from 'express';
import {
  getCoworkingSpaces,
  getCoworkingSpaceById,
  addCoworkingSpace,
  updateCoworkingSpace,
} from '../controller/coworkingSpace';
import { verifyAuth, verifyOwner } from '../middleware';
import { coworkingUpload } from '../util/uploadImage';

const router = express.Router();

// GET /coworking-space
router.get('/', getCoworkingSpaces);

// GET /coworking-space/:spaceId
router.get('/:spaceId', getCoworkingSpaceById);

// POST /coworking-space
router.post(
  '/',
  verifyAuth,
  verifyOwner,
  coworkingUpload.array('spaceURLs', 10),
  addCoworkingSpace
);

// PUT /coworking-space/:spaceId
router.put(
  '/:spaceId',
  verifyAuth,
  verifyOwner,
  coworkingUpload.array('spaceURLs', 10),
  updateCoworkingSpace
);

export default router;
